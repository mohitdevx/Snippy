// components/CreateSnippet.jsx
import { useState } from 'react';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { SnippetInfoModal } from '../components/SnippetInfoModel';
import { Api } from '../api/axios.api';
import { PopUp } from '../components/PopupMessage';

export const CreateSnippet = ({ category = 'snippet' }) => {
    const [activeTab, setActiveTab] = useState('write');
    const [markdownContent, setMarkdownContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [popupState, setPopupState] = useState({
        message: '',
        type: 'success',
        trigger: 0
    });

    const showPopup = (message, type = 'success') => {
        setPopupState((prev) => ({
            message,
            type,
            trigger: prev.trigger + 1
        }));
    };

    const handleSnippetData = async (snippet) => {
        console.log(snippet)
        setIsSaving(true);
        try {
            if (markdownContent.trim().length === 0) {
                showPopup('Snippet content cannot be empty.', 'error');
                return;
            }

            const { data } = await Api.post("/create", {
                ...snippet,
                code: markdownContent,
            });

            showPopup(data.message || 'Snippet saved successfully!', 'success');

            setMarkdownContent('');
            setShowModal(false);
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                'An error occurred while saving the snippet.';

            showPopup(msg, 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleClear = () => {
        if (markdownContent.trim().length > 0) {
            if (window.confirm('Are you sure you want to clear all content?')) {
                setMarkdownContent('');
                showPopup('Content cleared', 'info');
            }
        }
    };

    return (
        <>
            {/* Popup */}
            <PopUp
                message={popupState.message}
                type={popupState.type}
                trigger={popupState.trigger}
                duration={4000}
            />

            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-blue-400/30">
                                    <i className="ri-terminal-line text-white text-2xl"></i>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl opacity-20 blur-sm"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-2">
                                    Create {category.charAt(0).toUpperCase() + category.slice(1)}
                                </h1>
                                <p className="text-gray-400/80 text-lg font-light">
                                    Write and organize your code snippets
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

                        {/* Tab Navigation - Fixed at top */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab('write')}
                                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border ${activeTab === 'write'
                                        ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border-blue-500/30 shadow-lg shadow-blue-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <i className="ri-edit-line text-lg"></i>
                                    <span className="font-semibold">Write</span>
                                </button>

                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border ${activeTab === 'preview'
                                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-500/30 shadow-lg shadow-purple-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <i className="ri-eye-line text-lg"></i>
                                    <span className="font-semibold">Preview</span>
                                </button>
                            </div>

                            {/* Action Buttons - Fixed at top right */}
                            <div className="flex items-center space-x-3">
                                <button
                                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
                                    onClick={handleClear}
                                    disabled={!markdownContent.trim()}
                                >
                                    <i className="ri-close-line"></i>
                                    <span>Clear</span>
                                </button>

                                <button
                                    className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-400 hover:to-cyan-300 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    onClick={() => setShowModal(true)}
                                    disabled={!markdownContent.trim() || isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <i className="ri-loader-4-line animate-spin"></i>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="ri-save-line"></i>
                                            <span>Save</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="h-[600px]">
                            {activeTab === 'write' ? (
                                <MarkdownEditor
                                    content={markdownContent}
                                    onChange={setMarkdownContent}
                                />
                            ) : (
                                <MarkdownPreview content={markdownContent} preview={true} />
                            )}
                        </div>

                        {/* Status Bar - Fixed at bottom */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/2">
                            <div className="flex items-center space-x-4 text-sm text-gray-400/80">
                                {markdownContent.length > 0 ? (
                                    <>
                                        <span className="flex items-center space-x-2">
                                            <i className="ri-file-text-line text-cyan-400"></i>
                                            <span>{markdownContent.length} characters</span>
                                        </span>
                                        <span className="flex items-center space-x-2">
                                            <i className="ri-time-line text-purple-400"></i>
                                            <span>{markdownContent.split(/\s+/).length} words</span>
                                        </span>
                                        <span className="flex items-center space-x-2">
                                            <i className="ri-code-line text-blue-400"></i>
                                            <span>{markdownContent.split('\n').length} lines</span>
                                        </span>
                                    </>
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <i className="ri-information-line text-gray-400"></i>
                                        <span>Start writing your code snippet...</span>
                                    </span>
                                )}
                            </div>

                            <div className="text-xs text-gray-500 font-mono">
                                {activeTab === 'write' ? 'EDITOR' : 'PREVIEW'} MODE
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <SnippetInfoModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSnippetData}
                    category={category}
                />
            )}
        </>
    );
};