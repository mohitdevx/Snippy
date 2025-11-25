import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { loginValidation, registerValidation } from "../middlewares/express.val.js";
import { requestValidator } from "../middlewares/validationResult.js";
import { createSnippet, getAllSnippets, getSingleSnippet, getUserProfile, loginUser, registerUser, updateSnippet } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";

export const userRouter = Router();

userRouter.get("/hello", (req, res) => {
  return ApiResponse.success(res, 200, "Hello World", { message: "Hello World" });
});

userRouter.post("/register", registerValidation, requestValidator, registerUser);
userRouter.post("/login", loginValidation, requestValidator, loginUser);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.post("/create", userAuth, createSnippet);
userRouter.get("/get-all", userAuth, getAllSnippets);
userRouter.get("/snippet/:id", userAuth, getSingleSnippet);
userRouter.patch("/snippet/update/:id", userAuth, updateSnippet);


