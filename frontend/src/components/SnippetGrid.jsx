// components/SnippetsGrid.jsx
import { useState, useEffect } from 'react';
import { SnippetCard } from './SnippetCard';
import { Api } from '../api/axios.api';
import { SkeltonLoad } from './SkeltonLoad';

export const SnippetsGrid = ({ gridTitle = "Snippet", snippets = null, loading = true }) => {

    if (loading) {
        return (
            <SkeltonLoad />
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">Your {gridTitle}</h1>
                    <p className="text-gray-400 text-lg">
                        {snippets.length} {snippets.length === 1 ? gridTitle : `${gridTitle}s`} in your collection
                    </p>
                </div>

                {/* Grid */}
                {snippets.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {snippets.map((snippet) => (
                            <SnippetCard key={snippet._id} snippet={snippet} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <div className="w-24 h-24 bg-gray-700/30 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-600/30">
                            <i className="ri-code-s-slash-line text-5xl text-gray-500"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No snippets yet</h3>
                        <p className="text-gray-400">Create your first snippet to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
};