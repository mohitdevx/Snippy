import React from 'react'

export const SkeltonLoad = () => {
    return (
        <div className="p-8">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-800/40 rounded-2xl border border-gray-700/50 p-8 animate-pulse">
                            <div className="flex justify-center mb-8">
                                <div className="w-24 h-24 bg-gray-700/50 rounded-3xl"></div>
                            </div>
                            <div className="h-6 bg-gray-700/50 rounded-lg w-3/4 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-700/50 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-700/50 rounded w-2/3 mx-auto mb-6"></div>
                            <div className="h-8 bg-gray-700/50 rounded-full w-32 mx-auto mb-6"></div>
                            <div className="flex gap-3 pt-6 border-t border-gray-700/50">
                                <div className="flex-1 h-12 bg-gray-700/50 rounded-xl"></div>
                                <div className="w-12 h-12 bg-gray-700/50 rounded-xl"></div>
                                <div className="w-12 h-12 bg-gray-700/50 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
