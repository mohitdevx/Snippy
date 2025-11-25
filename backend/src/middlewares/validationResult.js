import { ApiResponse } from "../utils/apiResponse.js";
import { validationResult } from "express-validator";

export const requestValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ApiResponse.error(res, 400, "Validation Error", {
            errors: errors.array(),
        });
    }
    next();
}