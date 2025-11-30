// components/InputField.jsx
export const InputField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
    icon,
    required = false
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className={icon}></i>
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
              bg-gray-800 border-gray-600 text-white placeholder-gray-400
              ${icon ? 'pl-10' : 'pl-4'}
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}
              hover:border-gray-500
            `}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-400 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    {error}
                </p>
            )}
        </div>
    );
};