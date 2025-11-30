import { User } from "../models/user.model.js";
import { Snippet } from "../models/snippet.model.js";
import { AppError } from "../utils/appError.js";
import { Folder } from "../models/folder.model.js";

// ==========================
// 🔐 AUTH SERVICES
// ==========================

// REGISTER
export const registerFunction = async ({ fullname, username, email, password }) => {
    if (!fullname?.firstname) throw new AppError("First name required", 400);
    if (!username) throw new AppError("Username required", 400);
    if (!email) throw new AppError("Email required", 400);
    if (!password) throw new AppError("Password required", 400);

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) throw new AppError("User already exists", 409);

    const user = await User.create({
        fullname,
        username,
        email,
        password,
    });

    const token = user.generateJWT();

    return {
        user: {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};


// LOGIN
export const loginFunction = async ({ identifier, password }) => {
    if (!identifier) throw new AppError("Email or username required", 400);
    if (!password) throw new AppError("Password required", 400);

    const user = await User.findOne({
        $or: [
            { email: identifier.toLowerCase() },
            { username: identifier.toLowerCase() },
        ],
    });

    if (!user) throw new AppError("Invalid credentials", 401);

    const match = await user.comparePassword(password);
    if (!match) throw new AppError("Invalid credentials", 401);

    const token = user.generateJWT();

    return {
        user: {
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};




// ==========================
// 📝 SNIPPET SERVICES
// ==========================

// CREATE SNIPPET
export const createSnippetFunction = async ({ userId, title, description, code, category, folderName }) => {
    if (!userId) throw new AppError("Unauthorized", 401);
    if (!title) throw new AppError("Title is required", 400);
    if (!code) throw new AppError("Code is required", 400);

    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const snippet = await Snippet.create({
        title,
        description,
        code,
        user: userId,
        category
    });

    const folder = folderName ? folderName : "root";

    let myFolder = await Folder.findOne({ name: folder, user: userId });
    if (!myFolder) {
        myFolder = await Folder.create({ name: folder, user: userId });
    }

    myFolder.snippets.push(snippet._id);
    await myFolder.save();

    return {
        _id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        user: snippet.user,
        isFavorite: snippet.isFavorite,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};


// GET ALL SNIPPETS OF USER
export const getAllSnippetsFunction = async ({ userId, folderName }) => {
    if (!userId) throw new AppError("Unauthorized", 401);

    const folder = folderName ? folderName : "root";
    const myFolder = await Folder.findOne({
        name: folder, user: userId
    }).populate("snippets");

    if (!myFolder) {
        throw new AppError("Folder not found", 404);
    }

    const snippets = myFolder.snippets;

    if (snippets.length === 0) {
        throw new AppError("No snippets found in this folder", 404);
    }

    return snippets.map((s) => ({
        _id: s._id,
        title: s.title,
        description: s.description,
        code: s.code,
        user: s.user,
        isFavorite: s.isFavorite,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
    }));
};


// GET SINGLE SNIPPET
export const getSingleSnippetFunction = async ({ userId, snippetId }) => {
    if (!userId) throw new AppError("Unauthorized", 401);
    if (!snippetId) throw new AppError("Snippet ID required", 400);

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) throw new AppError("Snippet not found", 404);

    if (snippet.user.toString() !== userId.toString()) {
        throw new AppError("You do not have permission to access this snippet", 403);
    }

    return {
        _id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        user: snippet.user,
        isFavorite: snippet.isFavorite,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};


// LIST All Folders
export const listAllFoldersFunction = async ({ userId }) => {
    if (!userId) throw new AppError("Unauthorized", 401);

    const folders = await Folder.find({ user: userId })

    // unlist root folder if it exists
    const rootIndex = folders.findIndex((f) => f.name === "root");
    if (rootIndex !== -1) {
        folders.splice(rootIndex, 1);
    }

    if (folders.length === 0) {
        throw new AppError("No folders found", 404);
    }

    return folders;
};


// UPDATE SNIPPET
export const updateSnippetFunction = async ({ userId, snippetId, title, description, code }) => {
    if (!userId) throw new AppError("Unauthorized", 401);
    if (!snippetId) throw new AppError("Snippet ID required", 400);

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) throw new AppError("Snippet not found", 404);

    if (snippet.user.toString() !== userId.toString()) {
        throw new AppError("You do not have permission to update this snippet", 403);
    }

    if (!title && !description && !code) {
        throw new AppError("Nothing to update", 400);
    }

    if (title) snippet.title = title;
    if (description) snippet.description = description;
    if (code) snippet.code = code;

    await snippet.save();

    return {
        _id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        user: snippet.user,
        isFavorite: snippet.isFavorite,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};


// MARK SNIPPET AS FAVORITE
export const markSnippetAsFavoriteFunction = async ({ userId, snippetId }) => {
    if (!userId) throw new AppError("Unauthorized", 401);
    if (!snippetId) throw new AppError("Snippet ID required", 400);

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) throw new AppError("Snippet not found", 404);

    if (snippet.user.toString() !== userId.toString()) {
        throw new AppError("You do not have permission to favorite this snippet", 403);
    }

    snippet.isFavorite = !snippet.isFavorite;
    await snippet.save();

    return {
        _id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        user: snippet.user,
        isFavorite: snippet.isFavorite,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};

// GET ALL FAVORITE SNIPPETS
export const getAllFavoriteSnippetsFunction = async ({ userId }) => {
    if (!userId) throw new AppError("Unauthorized", 401);

    const snippets = await Snippet.find({ user: userId, isFavorite: true }).sort({ createdAt: -1 });

    return snippets.map((s) => ({
        _id: s._id,
        title: s.title,
        description: s.description,
        code: s.code,
        user: s.user,
        isFavorite: s.isFavorite,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
    }));
};

// GET SINGLE FAVORITE SNIPPET
export const getSingleFavoriteSnippetFunction = async ({ userId, snippetId }) => {
    if (!userId) throw new AppError("Unauthorized", 401);
    if (!snippetId) throw new AppError("Snippet ID required", 400);

    const snippet = await Snippet.findOne({ _id: snippetId, user: userId, isFavorite: true });
    if (!snippet) throw new AppError("Favorite snippet not found", 404);

    return {
        _id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        user: snippet.user,
        isFavorite: snippet.isFavorite,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};