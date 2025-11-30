// components/MarkdownEditor.jsx
export const MarkdownEditor = ({ content, onChange }) => {
    return (
        <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/2">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <i className="ri-code-s-slash-line text-blue-400 text-sm"></i>
                    </div>
                    <div>
                        <span className="text-white font-semibold">Markdown Editor</span>
                        <div className="text-xs text-gray-400 mt-1">
                            Supports code blocks, syntax highlighting, and rich formatting
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-cyan-400 font-mono">{content.length} chars</span>
                    </div>
                </div>
            </div>
            
            {/* Textarea */}
            <textarea 
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 w-full bg-transparent text-gray-100 p-6 focus:outline-none resize-none placeholder-gray-500 text-sm leading-relaxed font-bold font-mono"
                placeholder="# Welcome to Markdown Editor"
                spellCheck="false"
            />
        </div>
    );
};