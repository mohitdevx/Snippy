import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6 h-screen overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center max-w-2xl">
                {/* Error Code */}
                <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        404
                    </h1>
                    <div className="w-32 h-1 bg-linear-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
                </div>

                {/* Message */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-md mx-auto font-light">
                        The page you're looking for doesn't exist or has been moved. 
                        Let's get you back to your workspace.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-medium transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                    >
                        <i className="ri-arrow-left-line text-lg group-hover:-translate-x-1 transition-transform duration-300"></i>
                        Go Back
                    </button>
                    
                    <button
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-400 backdrop-blur-xl border border-blue-400/30 rounded-2xl text-white font-medium transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                    >
                        Return Home
                        <i className="ri-home-4-line text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 opacity-20">
                    <div className="w-48 h-48 bg-linear-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-20 left-10 opacity-10 animate-float">
                <i className="ri-file-search-line text-6xl text-blue-400"></i>
            </div>
            <div className="absolute bottom-20 right-10 opacity-10 animate-float delay-1000">
                <i className="ri-map-pin-line text-6xl text-purple-400"></i>
            </div>
        </div>
    );
};