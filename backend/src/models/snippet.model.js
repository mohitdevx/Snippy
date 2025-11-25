import { Schema, model } from "mongoose";
import mongoose from "mongoose";

// Define the Snippet schema
const snippetSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    code: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
});

export const Snippet = model('Snippet', snippetSchema);
