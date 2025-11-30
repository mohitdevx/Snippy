// components/PopupMessage.jsx
import { useEffect, useState } from "react";

export const PopUp = ({
    message = "",
    type = "success",
    trigger = 0,          // 🔥 every change = new show
    duration = 4000
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only run when trigger increments AND there is a message
        if (!message) return;

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [trigger, message, duration]);

    if (!visible) return null;

    const typeConfig = {
        success: {
            bg: "bg-green-900/90",
            border: "border-green-500/50",
            icon: "ri-checkbox-circle-fill text-green-400",
            progress: "bg-green-400"
        },
        error: {
            bg: "bg-red-900/90",
            border: "border-red-500/50",
            icon: "ri-error-warning-fill text-red-400",
            progress: "bg-red-400"
        },
        warning: {
            bg: "bg-yellow-900/90",
            border: "border-yellow-500/50",
            icon: "ri-alert-fill text-yellow-400",
            progress: "bg-yellow-400"
        },
        info: {
            bg: "bg-blue-900/90",
            border: "border-blue-500/50",
            icon: "ri-information-fill text-blue-400",
            progress: "bg-blue-400"
        }
    };

    const config = typeConfig[type] || typeConfig.success;

    return (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
            <div
                className={`
                    relative min-w-80 max-w-md p-4 rounded-xl backdrop-blur-sm border
                    shadow-2xl transform transition-all duration-300
                    ${config.bg} ${config.border}
                    animate-slide-in-right
                `}
            >
                {/* Close Button */}
                <button
                    onClick={() => setVisible(false)}
                    className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                    <i className="ri-close-line text-lg"></i>
                </button>

                {/* Content */}
                <div className="flex items-start space-x-3 pr-6">
                    <i className={`${config.icon} text-xl mt-0.5`}></i>
                    <div className="flex-1">
                        <p className="text-white font-medium text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 rounded-b-xl overflow-hidden">
                    <div
                        className={`h-full ${config.progress} animate-progress-shrink`}
                        style={{ animationDuration: `${duration}ms` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
