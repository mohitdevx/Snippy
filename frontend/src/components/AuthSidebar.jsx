export const AuthSidebar = ({
    title = "Join Our Community",
    description = "Create your account and start your write your code snippets, share them with others, and explore a world of coding knowledge.",
    icon = "ri-user-add-line",
}) => {
    return (
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full translate-x-24 translate-y-24"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative z-10 text-center">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                    <i className={`${icon} text-5xl text-white`}></i>
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};