import { useState } from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-linear-to-br from-gray-900 to-gray-800">
            {/* Sidebar */}
            <Sidebar 
                isOpen={sidebarOpen} 
                onToggle={() => setSidebarOpen(!sidebarOpen)} 
            />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-3 rounded-xl bg-gray-700/50 text-gray-300 hover:text-white border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
                    >
                        <i className="ri-menu-line text-xl"></i>
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <i className="ri-shield-keyhole-fill text-white text-lg"></i>
                        </div>
                        <h1 className="text-xl font-bold text-white">CodeVault</h1>
                    </div>
                    <div className="w-10"></div> {/* Spacer for balance */}
                </header>
                
                {/* Render children here */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};