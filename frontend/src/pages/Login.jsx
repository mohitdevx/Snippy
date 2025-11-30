import { useState } from "react";
import { InputField } from "../components/Input";
import { Button } from "../components/Button";
import { Api } from "../api/axios.api";
import { AuthSidebar } from "../components/AuthSidebar";

export const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (errors.submit) {
            setErrors(prev => ({
                ...prev,
                submit: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.identifier.trim()) {
            newErrors.identifier = 'Username or email is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await Api.post('/login', formData);

            if (response.data.success) {
                // Handle successful login (redirect, store token, etc.)
                console.log('Login successful:', response.data);
                // You can add redirect logic here
                // Example: navigate('/dashboard');
            }
        } catch (error) {
            if (error.response?.data?.status === 401) {
                setErrors({
                    submit: 'Invalid username/email or password'
                });
            } else if (error.response?.data?.message) {
                setErrors({
                    submit: error.response.data.message
                });
            } else {
                setErrors({
                    submit: 'An error occurred during login. Please try again.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                <div className="md:flex">
                    {/* Left Side - Reusable Component */}
                    <AuthSidebar
                        title="Welcome Back"
                        description="Sign in to your account to continue your journey and access your personalized dashboard."
                        icon="ri-login-box-line"
                        userCount="10,000+"
                    />

                    {/* Right Side - Login Form */}
                    <div className="md:w-1/2 p-8 md:p-12">
                        <div className="text-center md:text-left mb-8">
                            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                            <p className="text-gray-400 mt-2">Sign in to your account to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField
                                label="Username or Email"
                                name="identifier"
                                value={formData.identifier}
                                onChange={handleChange}
                                placeholder="Enter your username or email"
                                error={errors.identifier}
                                icon="ri-user-line text-gray-400"
                                required
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                error={errors.password}
                                icon="ri-lock-line text-gray-400"
                                required
                            />

                            {/* Forgot Password Link */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {errors.submit && (
                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                    <div className="flex items-center text-red-400">
                                        <i className="ri-error-warning-line mr-2"></i>
                                        <span className="text-sm font-medium">{errors.submit}</span>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                loading={loading}
                                variant="primary"
                                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <a
                                    href="/signup"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                                >
                                    Create account
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};