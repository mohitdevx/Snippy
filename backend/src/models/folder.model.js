import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        snippets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Snippet",
            },
        ],
    },
    { timestamps: true }
);

export const Folder = mongoose.model("Folder", folderSchema);