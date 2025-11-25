import { ApiResponse } from "./apiResponse.js";
import { handleMongooseErrors } from "./mongooseError.js";

// ---------------- DEVELOPMENT ----------------
const devErrors = (err, req, res, next) => {
    console.log(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return ApiResponse.error(
        res,
        statusCode,
        message,
        { stack: err.stack, err }
    );
};

// ---------------- PRODUCTION ----------------
const prodErros = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong! Please try again later.";

    // operational errors (custom app errors)
    if (err.isOperational) {
        return ApiResponse.error(res, statusCode, message);
    }

    // unexpected errors
    return ApiResponse.error(
        res,
        500,
        "Something went wrong! Please try again later."
    );
};

// ---------------- GLOBAL HANDLER ----------------
export const globalErrorHandler = (err, req, res, next) => {
    const environment = process.env.NODE_ENV;

    err = handleMongooseErrors(err);

    if (environment === "PRODUCTION") {
        return prodErros(err, req, res, next);
    }

    return devErrors(err, req, res, next);
};
