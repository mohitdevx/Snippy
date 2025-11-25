import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Cookie } from "../config/cookies.config.js";
import { asyncError } from "../utils/asyncError.js";

export const userAuth = asyncError(async (req, res, next) => {
    let token = Cookie.get(req, "token");

    // Fallback: Authorization header
    if (!token && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts[0] === "Bearer" && parts[1]) {
            token = parts[1];
        }
    }

    if (!token) {
        return ApiResponse.error(res, 401, "Authentication required");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return ApiResponse.error(res, 401, "Invalid or expired token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        return ApiResponse.error(res, 401, "User no longer exists");
    }

    req.user = {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname
    };

    next();
});
