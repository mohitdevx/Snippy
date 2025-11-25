// utils/apiResponse.js
export class ApiResponse {
    static success(res, status = 200, message = "Success", data = null) {
        return res.status(status).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
            path: res.req.originalUrl
        });
    }

    static created(res, message = "Created", data = null) {
        return res.status(201).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
            path: res.req.originalUrl
        });
    }

    static error(res, status = 500, message = "Internal Server Error", errors = null) {
        console.log(`This is response ${res}`);
        return res.status(status).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
            path: res.req.originalUrl
        });
    }

    static fail(res, status = 400, message = "Bad Request", errors = null) {
        return res.status(status).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
            path: res.req.originalUrl
        });
    }
}
