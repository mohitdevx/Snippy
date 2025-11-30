import { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { Api } from '../api/axios.api';
import { PopUp } from '../components/PopupMessage';
import { InputField } from '../components/Input';
import { Button } from '../components/Button';

export const ProfileSettings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [popupState, setPopupState] = useState({
        message: '',
        type: 'success',
        trigger: 0
    });

    const showPopup = (message, type = 'success') => {
        setPopupState((prev) => ({
            message,
            type,
            trigger: prev.trigger + 1
        }));
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await Api.get('/profile');
            if (response.data.success) {
                const userData = response.data.data.user;
                setProfile(userData);
                setFormData({
                    firstname: userData.fullname.firstname,
                    lastname: userData.fullname.lastname,
                    username: userData.username,
                    email: userData.email
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            showPopup('Failed to load profile', 'error');
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePasswordChange = (e) => {
        setPasswordForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await Api.put('/profile', {
                fullname: {
                    firstname: formData.firstname,
                    lastname: formData.lastname
                },
                username: formData.username
            });

            if (response.data.success) {
                showPopup('Profile updated successfully', 'success');
                setIsEditing(false);
                fetchProfile(); // Refresh profile data
            }
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to update profile';
            showPopup(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showPopup('New passwords do not match', 'error');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            showPopup('Password must be at least 6 characters', 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await Api.put('/change-password', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });

            if (response.data.success) {
                showPopup('Password updated successfully', 'success');
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to update password';
            showPopup(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await Api.post('/forgot-password', {
                email: profile.email
            });

            if (response.data.success) {
                showPopup('Password reset link sent to your email', 'success');
            }
        } catch (error) {
            const msg = error?.response?.data?.message || 'Failed to send reset link';
            showPopup(msg, 'error');
        }
    };

    if (!profile) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/20">
                        <i className="ri-user-line text-white text-2xl"></i>
                    </div>
                    <p className="text-gray-400 text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    const fullName = `${profile.fullname.firstname} ${profile.fullname.lastname}`;

    return (
        <>
            <PopUp
                message={popupState.message}
                type={popupState.type}
                trigger={popupState.trigger}
                duration={4000}
            />

            <div className="min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-blue-400/30">
                                    <i className="ri-user-settings-line text-white text-2xl"></i>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl opacity-20 blur-sm"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent mb-2">
                                    Profile Settings
                                </h1>
                                <p className="text-gray-400/80 text-lg font-light">
                                    Manage your account information and security
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Profile Overview */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sticky top-6">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/20">
                                        <i className="ri-user-3-line text-white text-2xl"></i>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-1">{fullName}</h3>
                                    <p className="text-gray-400 text-sm mb-4">@{profile.username}</p>

                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center justify-between py-2 border-b border-white/10">
                                            <span className="text-gray-400 text-sm">Member since</span>
                                            <span className="text-white text-sm font-medium">
                                                {new Date(profile.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-white/10">
                                            <span className="text-gray-400 text-sm">Status</span>
                                            <span className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <span className="text-green-400 text-sm font-medium">Active</span>
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-gray-400 text-sm">User ID</span>
                                            <span className="text-gray-400 text-xs font-mono truncate ml-2">
                                                {profile._id.slice(-8)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Settings Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Profile Information Card */}
                            <div className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                            <i className="ri-user-line text-blue-400"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                                            <p className="text-gray-400 text-sm">Update your personal details</p>
                                        </div>
                                    </div>
                                    {!isEditing ? (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            variant="outline"
                                            className="px-4 py-2 border-white/10 hover:border-blue-500/30"
                                        >
                                            <i className="ri-edit-line mr-2"></i>
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        firstname: profile.fullname.firstname,
                                                        lastname: profile.fullname.lastname,
                                                        username: profile.username,
                                                        email: profile.email
                                                    });
                                                }}
                                                variant="outline"
                                                className="px-4 py-2 border-white/10 hover:border-gray-500"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleProfileUpdate}
                                                loading={loading}
                                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300"
                                            >
                                                Save Changes
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <InputField
                                                label="First Name"
                                                name="firstname"
                                                value={formData.firstname}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                icon="ri-user-line text-blue-400"
                                            />
                                            <InputField
                                                label="Last Name"
                                                name="lastname"
                                                value={formData.lastname}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                icon="ri-user-line text-blue-400"
                                            />
                                            <InputField
                                                label="Username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                icon="ri-at-line text-cyan-400"
                                            />
                                            <InputField
                                                label="Email Address"
                                                name="email"
                                                value={formData.email}
                                                disabled={true}
                                                icon="ri-mail-line text-purple-400"
                                                helper="Email cannot be changed"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Password Update Card */}
                            <div className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                                            <i className="ri-lock-line text-purple-400"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Security Settings</h3>
                                            <p className="text-gray-400 text-sm">Manage your password and security</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <form onSubmit={handlePasswordUpdate}>
                                        <div className="space-y-4">
                                            <InputField
                                                type="password"
                                                label="Current Password"
                                                name="currentPassword"
                                                value={passwordForm.currentPassword}
                                                onChange={handlePasswordChange}
                                                icon="ri-lock-line text-gray-400"
                                                placeholder="Enter your current password"
                                            />
                                            <InputField
                                                type="password"
                                                label="New Password"
                                                name="newPassword"
                                                value={passwordForm.newPassword}
                                                onChange={handlePasswordChange}
                                                icon="ri-key-2-line text-green-400"
                                                placeholder="Enter new password"
                                            />
                                            <InputField
                                                type="password"
                                                label="Confirm New Password"
                                                name="confirmPassword"
                                                value={passwordForm.confirmPassword}
                                                onChange={handlePasswordChange}
                                                icon="ri-key-2-line text-green-400"
                                                placeholder="Confirm your new password"
                                            />

                                            <div className="flex items-center justify-between pt-4">
                                                <button
                                                    type="button"
                                                    onClick={handleForgotPassword}
                                                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium"
                                                >
                                                    <i className="ri-lock-unlock-line mr-2"></i>
                                                    Forgot Password?
                                                </button>

                                                <Button
                                                    type="submit"
                                                    loading={loading}
                                                    disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                                                    className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-400 hover:to-pink-300"
                                                >
                                                    Update Password
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Account Actions Card */}
                            <div className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center border border-rose-500/30">
                                            <i className="ri-error-warning-line text-rose-400"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Account Actions</h3>
                                            <p className="text-gray-400 text-sm">Dangerous actions - proceed with caution</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 transition-all duration-300 group">
                                            <div className="flex items-center space-x-3">
                                                <i className="ri-delete-bin-line text-rose-400"></i>
                                                <div className="text-left">
                                                    <div className="text-white font-medium">Delete Account</div>
                                                    <div className="text-rose-400 text-xs">Permanently remove your account and all data</div>
                                                </div>
                                            </div>
                                            <i className="ri-arrow-right-line text-rose-400 group-hover:translate-x-1 transition-transform duration-300"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};