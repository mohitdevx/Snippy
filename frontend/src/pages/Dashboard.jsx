import React from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const user = {
        name: "Mohit Kumar",
        username: "mohitdevx"
    };

    const navigate = useNavigate();
    const firstName = user.name.split(" ")[0];

    const features = [
        {
            id: 1,
            title: "Create Snippet",
            description: "Craft and organize code snippets with intelligent syntax highlighting",
            icon: "ri-terminal-line",
            gradient: "from-blue-500 to-cyan-400",
            accent: "blue",
            action: () => navigate("/create")
        },
        {
            id: 2,
            title: "Quick Notes",
            description: "Capture ideas and insights with seamless rich text editing",
            icon: "ri-pen-nib-line",
            gradient: "from-purple-500 to-pink-400",
            accent: "purple",
            action: () => navigate("/notes")
        }
    ];

    return (
        <div className="w-full">
            {/* Elegant Header */}
            <div className="text-center mb-16">
                {/* User Status Badge */}
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 mb-8 shadow-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300 font-medium tracking-wide">Active Session</span>
                    </div>
                    <div className="w-px h-4 bg-white/20"></div>
                    <span className="text-sm text-gray-400 font-light">{user.username}</span>
                </div>
                
                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
                        Welcome back,
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            {firstName}
                        </h2>
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-lg">
                            👋
                        </div>
                    </div>
                </div>
                
                {/* Subtitle */}
                <p className="text-lg text-gray-400 max-w-md mx-auto mt-6 leading-relaxed font-light tracking-wide">
                    Select your creative workspace to begin
                </p>
            </div>

            {/* Premium Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="group relative cursor-pointer"
                        onClick={feature.action}
                    >
                        {/* Card Container */}
                        <div className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/20 overflow-hidden">
                            
                            {/* Animated Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Subtle Border Glow */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                            
                            {/* Content Layout */}
                            <div className="relative z-10">
                                {/* Icon Section */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="relative">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <i className={`${feature.icon} text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}></i>
                                        </div>
                                    </div>
                                    
                                    {/* Action Indicator */}
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                                        <i className={`ri-arrow-right-up-line text-sm bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}></i>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="space-y-3">
                                    <h3 className={`text-2xl font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform duration-300`}>
                                        {feature.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm leading-relaxed font-light tracking-wide">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Progress/Status Bar */}
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-1000 group-hover:w-full`}
                                            style={{ width: '60%' }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Ready</span>
                                </div>
                            </div>

                            {/* Hover Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};