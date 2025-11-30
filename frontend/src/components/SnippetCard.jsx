import { useState } from 'react';
import { compileMarkdown } from '../utils/markdownCompiler';
import { detectLanguage } from '../utils/DectectLang';
import { Api } from '../api/axios.api';
import { useNavigate } from 'react-router-dom';

export const SnippetCard = ({ snippet }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isFavorited, setIsFavorited] = useState(snippet.isFavorite || false);
    const navigate = useNavigate();

    const copyToClipboard = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const toggleFavorite = async (e) => {
        e.stopPropagation();
        try {
            await Api.patch(`/snippet/favorite/${snippet._id}`);
            setIsFavorited(!isFavorited);
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const language = detectLanguage(snippet.code);

    const showSnippetDetails = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await Api.get(`/snippet/${id}`);
            if (response.data.success) {
                const snippetDetails = response.data.data.snippet;
                navigate(`/snippets/${snippetDetails._id}`, {
                    state: { snippet: snippetDetails }
                });
            }
        } catch (err) {
            console.error('Error fetching snippet details:', err);
        }
    };

    const truncateCode = (code) => {
        const maxLength = 300;
        if (code.length <= maxLength) return code;
        return code.substring(0, maxLength) + '...';
    };

    return (
        <div className="group relative bg-linear-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer h-full flex flex-col">

            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>

            {/* Header */}
            <div className="relative z-10 flex items-start justify-between mb-5">
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white truncate mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                        {snippet.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center space-x-2 bg-linear-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            <i className="ri-terminal-line text-blue-400 text-xs"></i>
                            <span className="text-blue-400 font-medium text-xs">{language}</span>
                        </span>
                        <span className="flex items-center space-x-2 text-gray-400">
                            <i className="ri-calendar-line text-purple-400"></i>
                            <span className="text-xs">{formatDate(snippet.createdAt)}</span>
                        </span>
                    </div>
                </div>

                {/* Copy Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(snippet.code);
                    }}
                    className="ml-3 py-1 px-2 rounded-lg bg-white/5 text-gray-400 hover:text-green-400 hover:bg-green-500/20 border border-white/10 hover:border-green-400/30 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                    title="Copy code"
                >
                    <i className={`text-lg ${isCopied ? 'ri-check-line text-green-400' : 'ri-file-copy-line'}`}></i>
                </button>
            </div>

            {/* Description */}
            {snippet.description && (
                <p className="relative z-10 text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed h-10">
                    {snippet.description}
                </p>
            )}
            <div className="relative mb-4">
                {/* Terminal Header */}
                <div className="flex items-center justify-between bg-gray-900/80 rounded-t-2xl px-4 py-3 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                        {/* macOS Traffic Lights */}
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono ml-2">{language.toLowerCase()}</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                        {snippet.code.length} chars
                    </div>
                </div>

                {/* Terminal Body - FIXED HEIGHT (h-32) added here */}
                <div className="bg-gray-900 rounded-b-2xl p-4 border border-t-0 border-white/10 h-32 overflow-hidden relative">
                    <pre className="text-sm text-gray-200 font-mono leading-relaxed">
                        <code
                            className="block"
                            dangerouslySetInnerHTML={{
                                __html: compileMarkdown(truncateCode(snippet.code))
                            }}
                        />
                    </pre>

                    {/* Gradient Overlay strictly positioned at bottom of the fixed container */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent rounded-b-2xl pointer-events-none"></div>
                </div>
            </div>

            {/* Spacer to push footer down if content is short */}
            <div className="flex-1"></div>

            {/* Footer with Favorite Button */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 w-full mt-auto">
                <div className="flex items-center gap-3">
                    {/* Favorite Button */}
                    <button
                        onClick={toggleFavorite}
                        className="py-1 px-2 rounded-lg bg-white/5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/30 transition-all duration-300 backdrop-blur-sm hover:scale-110 shrink-0"
                        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                        <i className={`text-lg ${isFavorited ? 'ri-heart-3-fill text-rose-400' : 'ri-heart-3-line'}`}></i>
                    </button>
                </div>

                <button
                    onClick={(e) => showSnippetDetails(e, snippet._id)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group/view whitespace-nowrap"
                >
                    <span className="text-sm font-medium">Open</span>
                    <i className="ri-arrow-right-line text-lg group-hover/view:translate-x-1 transition-transform duration-300"></i>
                </button>
            </div>

            {/* Hover Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-400/30 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
        </div>
    );
};