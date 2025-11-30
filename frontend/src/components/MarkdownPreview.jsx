// components/MarkdownPreview.jsx
import { compileMarkdown } from "../utils/markdownCompiler";
import "../theme/Markdown.css"
import "../theme/HighlightTheme.css"
import { useLocation } from "react-router-dom";

export const MarkdownPreview = ({ content, preview = false }) => {
    const location = useLocation();
    const { snippet } = location.state || {};

    if (snippet) {
        content = snippet.code;
    }

    return (
        <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/2">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <i className="ri-eye-line text-purple-400 text-sm"></i>
                    </div>
                    <div>
                        <span className="text-white font-semibold">Live Preview</span>
                        <div className="text-xs text-gray-400 mt-1">
                            Real-time rendering of your markdown content
                        </div>
                    </div>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-purple-400 text-sm font-mono">READ-ONLY</span>
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-6 text-gray-100 overflow-y-auto">
                {content ? (
                    <div className="prose prose-invert max-w-none">
                        <div className="markdown-theme" dangerouslySetInnerHTML={{ __html: compileMarkdown(content) }}></div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center max-w-md">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <i className="ri-file-text-line text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-400 mb-2">Nothing to preview yet</h3>
                            <p className="text-sm text-gray-500">Switch to the Write tab and start creating your snippet to see the preview here.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};