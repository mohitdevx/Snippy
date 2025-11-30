import { useState } from "react";
import { InputField } from "./Input";
import { Button } from "./Button";

export const SnippetInfoModal = ({ isOpen, onClose, onSubmit, category = "Uncategorized" }) => {
    const [formData, setFormData] = useState({
        folderName: "",
        title: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            category
        });
        onClose();
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
                className="
                    bg-gray-800/95 backdrop-blur-xl 
                    rounded-2xl border border-gray-700/50 shadow-2xl 
                    w-full lg:w-[80%] xl:w-[75%] max-w-7xl 
                    flex flex-col 
                    transition-all duration-300
                "
            >
                {/* Header */}
                <div className="flex-none flex items-center justify-between p-8 border-b border-gray-700/50 bg-gray-800/50 rounded-t-2xl">
                    <div className="flex items-center space-x-5">
                        <div className="w-14 h-14 bg-linear-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                            <i className="ri-file-text-line text-blue-400 text-2xl"></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Save Snippet</h2>
                            <p className="text-gray-400 text-sm mt-1">Organize your code library</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-gray-700/30 hover:bg-red-500/10 hover:text-red-400 text-gray-400 transition-all duration-200 flex items-center justify-center border border-transparent hover:border-red-500/20"
                    >
                        <i className="ri-close-line text-xl"></i>
                    </button>
                </div>

                {/* Form - Side by Side Layout to avoid scrolling */}
                <div className="flex-1 p-8">
                    <form id="snippet-form" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                            
                            {/* LEFT COLUMN: Inputs (Span 5) */}
                            <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
                                {/* Title */}
                                <div>
                                    <InputField
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Snippet Title"
                                        icon="ri-quill-pen-line text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Folder Name */}
                                <div>
                                    <InputField
                                        label="Folder Name"
                                        name="folderName"
                                        value={formData.folderName}
                                        onChange={handleChange}
                                        placeholder="e.g., Components"
                                        icon="ri-folder-line text-gray-400"
                                    />
                                </div>

                                {/* Category Read-only */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                        Category
                                    </label>
                                    <div className="flex items-center text-white px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700/50">
                                        <i className="ri-folder-2-line mr-3 text-blue-500"></i>
                                        <span className="font-medium tracking-wide">{category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Description (Span 7) */}
                            <div className="lg:col-span-7 flex flex-col h-full">
                                <label className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                    Description
                                </label>
                                <div className="relative flex-1">
                                    <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                                        <i className="ri-align-left"></i>
                                    </div>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Write a detailed description of what this code does..."
                                        className="w-full h-full min-h-[280px] pl-12 pr-4 py-4 bg-gray-900/30 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none leading-relaxed"
                                    />
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex-none flex items-center justify-end space-x-4 p-8 border-t border-gray-700/50 bg-gray-800/50 rounded-b-2xl">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="outline"
                        className="px-8 py-2.5"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!formData.title.trim()}
                        variant="primary"
                        className="px-10 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-none shadow-lg shadow-blue-500/20"
                    >
                        Save Snippet
                    </Button>
                </div>
            </div>
        </div>
    );
};