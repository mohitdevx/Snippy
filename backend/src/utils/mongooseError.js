export const handleMongooseErrors = (err) => {

    // Invalid Mongo ID → CastError
    if (err.name === "CastError") {
        return {
            statusCode: 400,
            message: `Invalid value for '${err.path}': ${err.value}`,
            isOperational: true
        };
    }

    // Duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return {
            statusCode: 409,
            message: `${field} already exists.`,
            isOperational: true
        };
    }

    // ValidationError
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(val => val.message);
        return {
            statusCode: 400,
            message: messages.join(", "),
            isOperational: true
        };
    }

    return err; // return original error if none match
};
