// components/ConfirmationModal.jsx
export const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger" 
}) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: 'ri-error-warning-line',
                    iconColor: 'text-rose-400',
                    buttonGradient: 'from-rose-500 to-pink-500',
                    buttonHover: 'from-rose-400 to-pink-400'
                };
            case 'warning':
                return {
                    icon: 'ri-alert-line',
                    iconColor: 'text-yellow-400',
                    buttonGradient: 'from-yellow-500 to-orange-500',
                    buttonHover: 'from-yellow-400 to-orange-400'
                };
            default:
                return {
                    icon: 'ri-information-line',
                    iconColor: 'text-blue-400',
                    buttonGradient: 'from-blue-500 to-cyan-400',
                    buttonHover: 'from-blue-400 to-cyan-300'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
                
                {/* Modal Container */}
                <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                    
                    {/* Header */}
                    <div className="flex items-center space-x-4 p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/2">
                        <div className={`w-12 h-12 rounded-xl bg-${type === 'danger' ? 'rose' : 'blue'}-500/20 flex items-center justify-center border border-${type === 'danger' ? 'rose' : 'blue'}-500/30`}>
                            <i className={`${styles.icon} ${styles.iconColor} text-xl`}></i>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <p className="text-gray-400 text-sm mt-1 font-light">{message}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <i className={`${styles.icon} ${styles.iconColor} text-2xl`}></i>
                            </div>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                                This action cannot be undone. Please confirm your decision.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/10 bg-gradient-to-r from-white/5 to-white/2">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium backdrop-blur-sm"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`px-6 py-2.5 rounded-xl bg-gradient-to-r ${styles.buttonGradient} text-white hover:${styles.buttonHover} transition-all duration-300 font-semibold shadow-lg ${
                                type === 'danger' ? 'shadow-rose-500/25' : 'shadow-blue-500/25'
                            } hover:scale-105`}
                        >
                            {confirmText}
                        </button>
                    </div>

                    {/* Top Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};