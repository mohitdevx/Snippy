import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { loginValidation, registerValidation } from "../middlewares/express.val.js";
import { requestValidator } from "../middlewares/validationResult.js";
import { createSnippet, getAllFavoriteSnippets, getAllSnippets, getSingleFavoriteSnippet, getSingleSnippet, getUserProfile, listAllFolders, loginUser, markSnippetAsFavorite, registerUser, updateSnippet } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

export const userRouter = Router();

userRouter.get("/hello", (req, res) => {
  return ApiResponse.success(res, 200, "Hello World", { message: "Hello World" });
});

userRouter.post("/register", registerValidation, requestValidator, registerUser);
userRouter.post("/login", loginValidation, requestValidator, loginUser);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.post("/create", userAuth, createSnippet);
userRouter.get("/snippet/all-snippets", userAuth, getAllSnippets);
userRouter.get("/snippet/:id", userAuth, getSingleSnippet);
userRouter.patch("/snippet/update/:id", userAuth, updateSnippet);
userRouter.patch("/snippet/favorite/:id", userAuth, markSnippetAsFavorite);
userRouter.get("/snippet/favorite/all-favorite", userAuth, getAllFavoriteSnippets);
userRouter.get("/snippet/favorite/:id", userAuth, getSingleFavoriteSnippet)
userRouter.get("/folders", userAuth, listAllFolders);