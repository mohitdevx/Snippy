import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useEffect } from 'react';

export const Sidebar = ({ isOpen, onToggle }) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const navigate = useNavigate();

    const { user, loading } = useAuth();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'ri-layout-4-line' },
        { id: 'snippets', label: 'Code Snippets', icon: 'ri-terminal-line' },
        { id: 'notes', label: 'Quick Notes', icon: 'ri-pen-nib-line' },
        { id: 'folder', label: 'Folder', icon: 'ri-folder-3-line' },
        { id: 'favorites', label: 'Favorites', icon: 'ri-heart-3-line' },
        { id: 'documentation', label: 'Documentation', icon: 'ri-book-2-line' },
        { id: 'trash', label: 'Trash', icon: 'ri-delete-bin-6-line' }
    ];

    const profile = {
        name: "Mohit Kumar",
        username: "mohitdevx",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };

    const handleClick = (id) => {
        setActiveItem(id);
        navigate(`/${id === 'dashboard' ? '' : id}`);
    };

    useEffect(() => {
        console.log('User in Sidebar:', user);
    })

    if (loading) {
        return (
            <div className="h-screen w-24 bg-slate-900 flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:sticky top-0 left-0 z-50
                h-screen bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/95 
                border-r border-white/10 backdrop-blur-2xl
                transform transition-all duration-500 ease-out
                flex flex-col shadow-2xl
                ${isOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0 lg:w-24'}
            `}>

                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-32 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Header - Fixed height */}
                <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                    <div className={`flex items-center space-x-4 transition-all duration-500 ${!isOpen && 'lg:justify-center lg:space-x-0'}`}>
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-blue-400/30">
                                <i className="ri-shield-keyhole-fill text-white text-xl"></i>
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl opacity-20 blur-sm"></div>
                        </div>
                        <div className={`transition-all duration-500 overflow-hidden ${!isOpen ? 'lg:opacity-0 lg:w-0 lg:scale-95' : 'opacity-100 w-auto scale-100'}`}>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                                CodeVault
                            </h1>
                            <p className="text-xs text-gray-400/80 mt-1 font-light">Developer Workspace</p>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={onToggle}
                        className="lg:flex hidden items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-sm hover:scale-105"
                    >
                        <i className={`ri-sidebar-fold-line text-lg transition-transform duration-500 ${!isOpen && 'rotate-180'}`}></i>
                    </button>
                </div>

                {/* Navigation Menu - No scrollbar */}
                <div className="relative z-10 flex-1 overflow-hidden py-6">
                    <nav className="h-full">
                        <div className="h-full flex flex-col justify-center">
                            <div className="px-4 space-y-2">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleClick(item.id)}
                                        className={`
                                            w-full flex items-center rounded-2xl px-4 py-3 transition-all duration-500 group relative
                                            ${activeItem === item.id
                                                ? 'bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border border-blue-500/20 text-white shadow-2xl shadow-blue-500/10'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent'
                                            }
                                            ${!isOpen && 'lg:justify-center lg:px-3'}
                                        `}
                                    >
                                        {/* Active Indicator Line */}
                                        {activeItem === item.id && (
                                            <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r-full shadow-lg shadow-blue-400/50"></div>
                                        )}

                                        <div className={`flex items-center transition-all duration-500 ${!isOpen && 'lg:justify-center'}`}>
                                            <i className={`${item.icon} text-xl transition-all duration-300 ${activeItem === item.id
                                                ? 'text-cyan-400'
                                                : 'text-gray-400 group-hover:text-cyan-300'
                                                }`}></i>
                                            <span className={`ml-4 font-medium transition-all duration-500 ${!isOpen ? 'lg:opacity-0 lg:w-0 lg:ml-0' : 'opacity-100 w-auto'
                                                }`}>
                                                {item.label}
                                            </span>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${activeItem === item.id && 'opacity-10'
                                            }`}></div>

                                        {/* Tooltip for collapsed state */}
                                        {!isOpen && (
                                            <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800/95 backdrop-blur-xl text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl border border-white/10">
                                                {item.label}
                                                <div className="absolute left-0 top-1/2 -ml-1 w-2 h-2 bg-slate-800 transform -translate-y-1/2 rotate-45 border-l border-t border-white/10"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Profile Section - Fixed height */}
                <div className={`
                    relative z-10 border-t border-white/10 bg-gradient-to-t from-slate-800/50 to-transparent backdrop-blur-xl
                    transition-all duration-500 shrink-0
                `}>
                    <div className="p-4">
                        <div className={`
                            flex items-center p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                            transition-all duration-500 group hover:bg-white/10 hover:border-white/20
                            ${!isOpen && 'lg:justify-center lg:p-2'}
                        `}>
                            <div className="relative shrink-0">
                                <img
                                    src={profile.avatar}
                                    alt={profile.name}
                                    className="w-10 h-10 rounded-xl border-2 border-white/10 object-cover shadow-lg"
                                />
                                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-slate-800 shadow-lg"></div>
                            </div>
                            <div className={`ml-3 transition-all duration-500 overflow-hidden ${!isOpen ? 'lg:opacity-0 lg:w-0 lg:ml-0' : 'opacity-100 w-auto'
                                }`}>
                                <h3 className="text-sm font-semibold text-white truncate">{user?.fullname?.firstname} {user?.fullname?.lastname}</h3>
                                <p className="text-xs text-gray-400/80 mt-0.5 truncate font-light">@{user?.username}</p>
                            </div>

                            {/* Profile Tooltip for collapsed state */}
                            {!isOpen && (
                                <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800/95 backdrop-blur-xl text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl border border-white/10">
                                    <div className="text-center">
                                        <div className="font-semibold">{profile.name}</div>
                                        <div className="text-gray-300/80 text-xs font-light">@{profile.username}</div>
                                    </div>
                                    <div className="absolute left-0 top-1/2 -ml-1 w-2 h-2 bg-slate-800 transform -translate-y-1/2 rotate-45 border-l border-t border-white/10"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};