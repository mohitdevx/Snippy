// components/Button.jsx
export const Button = ({
    children,
    type = "button",
    onClick,
    disabled = false,
    loading = false,
    variant = "primary",
    className = ""
}) => {
    const baseClasses = "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white border-transparent shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105",
        secondary: "bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 text-white",
        outline: "border border-gray-600 hover:bg-gray-700 focus:ring-blue-500 text-gray-300"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
          ${baseClasses}
          ${variants[variant]}
          ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Processing...
                </div>
            ) : (
                children
            )}
        </button>
    );
};