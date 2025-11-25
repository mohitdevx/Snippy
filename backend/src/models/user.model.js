import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            firstname: { type: String, required: true, trim: true },
            lastname: { type: String, trim: true },
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    { timestamps: true }
);

// 🔐 Hash password (Mongoose v9 async hook — NO next())
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// 🔐 Compare password with hashed password
userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

// 🔐 Generate JWT Token
userSchema.methods.generateJWT = function () {
    const payload = {
        id: this._id,
        username: this.username,
        email: this.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const User = mongoose.model("User", userSchema);
