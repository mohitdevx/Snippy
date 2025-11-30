import { useState } from "react";
import { InputField } from "../components/Input";
import { Button } from "../components/Button";
import { Api } from "../api/axios.api";
import { AuthSidebar } from "../components/AuthSidebar";
import { validateForm, validateField } from "../utils/formVal";

export const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'firstname' || name === 'lastname') {
            setFormData(prev => ({
                ...prev,
                fullname: {
                    ...prev.fullname,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Real-time validation
        const fieldError = validateField(name, value, formData);
        setErrors(prev => ({
            ...prev,
            [name]: fieldError
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const fieldError = validateField(name, value, formData);
        setErrors(prev => ({
            ...prev,
            [name]: fieldError
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const response = await Api.post('/register', formData);

            if (response.data.success) {
                setSuccess(true);
                // Reset form
                setFormData({
                    fullname: {
                        firstname: '',
                        lastname: ''
                    },
                    username: '',
                    email: '',
                    password: ''
                });
            }
        } catch (error) {
            if (error.response?.data?.status === 409) {
                const errorMessage = error.response.data.message.toLowerCase();
                if (errorMessage.includes('username')) {
                    setErrors({
                        username: error.response.data.message
                    });
                } else if (errorMessage.includes('email')) {
                    setErrors({
                        email: error.response.data.message
                    });
                } else {
                    setErrors({
                        submit: error.response.data.message
                    });
                }
            } else if (error.response?.data?.message) {
                setErrors({
                    submit: error.response.data.message
                });
            } else {
                setErrors({
                    submit: 'An error occurred during registration. Please try again.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-gray-700">
                    <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <i className="ri-check-line text-3xl text-green-400"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                    <p className="text-gray-300 mb-6">
                        Your account has been created successfully. You can now log in to your account.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => setSuccess(false)}
                        className="w-full"
                    >
                        Create Another Account
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                <div className="md:flex">
                    {/* Left Side - Reusable Component */}
                    <AuthSidebar />

                    {/* Right Side - Signup Form */}
                    <div className="md:w-1/2 p-8 md:p-12">
                        <div className="text-center md:text-left mb-8">
                            <h1 className="text-3xl font-bold text-white">Create Account</h1>
                            <p className="text-gray-400 mt-2">Fill in your details to get started</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="First Name"
                                    name="firstname"
                                    value={formData.fullname.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your first name"
                                    error={errors.firstname}
                                    icon="ri-user-line text-gray-400"
                                    required
                                />
                                <InputField
                                    label="Last Name"
                                    name="lastname"
                                    value={formData.fullname.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your last name"
                                    error={errors.lastname}
                                    icon="ri-user-line text-gray-400"
                                    required
                                />
                            </div>

                            <InputField
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Choose a username"
                                error={errors.username}
                                icon="ri-at-line text-gray-400"
                                required
                            />

                            <InputField
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your email"
                                error={errors.email}
                                icon="ri-mail-line text-gray-400"
                                required
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Create a strong password"
                                error={errors.password}
                                icon="ri-lock-line text-gray-400"
                                required
                            />

                            {errors.submit && (
                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                    <div className="flex items-center text-red-400">
                                        <i className="ri-error-warning-line mr-2"></i>
                                        <span className="text-sm font-medium">{errors.submit}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                                    I agree to the{' '}
                                    <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                loading={loading}
                                variant="primary"
                                className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};