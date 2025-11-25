import { User } from "../models/user.model.js";
import { Snippet } from "../models/snippet.model.js";
import { AppError } from "../utils/appError.js";

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
export const createSnippetFunction = async ({ userId, title, description, code }) => {
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
    });

    return {
        _id: snippet._id,
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        user: snippet.user,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};


// GET ALL SNIPPETS OF USER
export const getAllSnippetsFunction = async ({ userId }) => {
    if (!userId) throw new AppError("Unauthorized", 401);

    const snippets = await Snippet.find({ user: userId }).sort({ createdAt: -1 });

    return snippets.map((s) => ({
        _id: s._id,
        title: s.title,
        description: s.description,
        code: s.code,
        user: s.user,
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
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
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
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
    };
};
