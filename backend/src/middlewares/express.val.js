import { body } from "express-validator";

export const registerValidation = [
    // firstname
    body('fullname.firstname')
        .trim()
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),

    // lastname (optional)
    body('fullname.lastname')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),

    // username
    body('username')
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters long")
        .isAlphanumeric().withMessage("Username must be alphanumeric"),

    // email
    body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    // password
    body('password')
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const loginValidation = [
    body('identifier')
        .trim()
        .notEmpty().withMessage("Email or Username is required")
        .custom(value => {
            const isEmail = /^\S+@\S+\.\S+$/.test(value);
            const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);

            if (!isEmail && !isUsername) {
                throw new Error("Enter a valid username or email");
            }
            return true;
        }),

    body('password')
        .trim()
        .notEmpty().withMessage("Password is required"),
];
