import { asyncError } from "../utils/asyncError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cookie } from "../config/cookies.config.js";
import { registerFunction, loginFunction, createSnippetFunction, getAllSnippetsFunction, getSingleSnippetFunction, updateSnippetFunction, markSnippetAsFavoriteFunction, getAllFavoriteSnippetsFunction, getSingleFavoriteSnippetFunction, listAllFoldersFunction } from "../services/user.service.js";

// =============================
// 🔐 AUTH CONTROLLERS
// =============================

// REGISTER USER
export const registerUser = asyncError(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    const data = await registerFunction({
        fullname,
        username,
        email,
        password,
    });

    Cookie.set(res, "token", data.token);

    return ApiResponse.created(
        res,
        { user: data.user },
        "Registration successful"
    );
});


// LOGIN USER
export const loginUser = asyncError(async (req, res) => {
    const { identifier, password } = req.body;

    const data = await loginFunction({
        identifier,
        password
    });

    Cookie.set(res, "token", data.token);

    return ApiResponse.success(
        res,
        200,
        "Login successful",
        { user: data.user }
    );
});


// GET USER PROFILE
export const getUserProfile = asyncError(async (req, res) => {
    const user = req.user;

    return ApiResponse.success(
        res,
        200,
        "User profile fetched successfully",
        { user }
    );
});


// =============================
// 📝 SNIPPET CONTROLLERS
// =============================

// CREATE SNIPPET
export const createSnippet = asyncError(async (req, res) => {
    const userId = req.user._id;
    const { title, description, code, category, folderName } = req.body;

    const snippet = await createSnippetFunction({
        userId,
        title,
        description,
        code,
        category,
        folderName
    });

    return ApiResponse.success(
        res,
        200,
        "Snippet created successfully",
        { snippet }
    );
});


// GET ALL SNIPPETS OF USER
export const getAllSnippets = asyncError(async (req, res) => {
    const userId = req.user._id;
    const { folderName } = req.query;

    const snippets = await getAllSnippetsFunction({ userId, folderName });

    return ApiResponse.success(
        res,
        200,
        "Fetched all snippets successfully",
        { snippets }
    );
});


// GET SINGLE SNIPPET
export const getSingleSnippet = asyncError(async (req, res) => {
    const userId = req.user._id;
    const snippetId = req.params.id;

    const snippet = await getSingleSnippetFunction({
        userId,
        snippetId
    });

    return ApiResponse.success(
        res,
        200,
        "Snippet fetched successfully",
        { snippet }
    );
});


// LIST ALL FOLDERS
export const listAllFolders = asyncError(async (req, res) => {
    const userId = req.user._id;

    const folders = await listAllFoldersFunction({ userId });

    return ApiResponse.success(
        res,
        200,
        "Fetched all folders successfully",
        { folders }
    );
});

// UPDATE SNIPPET
export const updateSnippet = asyncError(async (req, res) => {
    const userId = req.user._id;
    const snippetId = req.params.id;
    const { title, description, code } = req.body;

    const snippet = await updateSnippetFunction({
        userId,
        snippetId,
        title,
        description,
        code
    });

    return ApiResponse.success(
        res,
        200,
        "Snippet updated successfully",
        { snippet }
    );
});


// MARK SNIPPET AS FAVORITE
export const markSnippetAsFavorite = asyncError(async (req, res) => {
    const userId = req.user._id;
    const snippetId = req.params.id;

    const snippet = await markSnippetAsFavoriteFunction({
        userId,
        snippetId
    });

    return ApiResponse.success(
        res,
        200,
        "Snippet marked as favorite successfully",
        { snippet }
    );
});


// GET ALL FAVORITE SNIPPETS
export const getAllFavoriteSnippets = asyncError(async (req, res) => {
    const userId = req.user._id;

    const snippets = await getAllFavoriteSnippetsFunction({ userId, isFavorite: true });

    return ApiResponse.success(
        res,
        200,
        "Fetched all favorite snippets successfully",
        { snippets }
    );
});

// GET SINGLE FAVORITE SNIPPET
export const getSingleFavoriteSnippet = asyncError(async (req, res) => {
    const userId = req.user._id;
    const snippetId = req.params.id;

    const snippet = await getSingleFavoriteSnippetFunction({
        userId,
        snippetId,
        isFavorite: true
    });

    return ApiResponse.success(
        res,
        200,
        "Favorite snippet fetched successfully",
        { snippet }
    );
});