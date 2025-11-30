// utils/validation.js
export const validateForm = (formData) => {
    const newErrors = {};

    // First Name validation
    if (!formData.fullname.firstname.trim()) {
        newErrors.firstname = 'First name is required';
    } else if (formData.fullname.firstname.length < 2) {
        newErrors.firstname = 'First name must be at least 2 characters';
    } else if (formData.fullname.firstname.length > 50) {
        newErrors.firstname = 'First name must be less than 50 characters';
    }

    // Last Name validation
    if (!formData.fullname.lastname.trim()) {
        newErrors.lastname = 'Last name is required';
    } else if (formData.fullname.lastname.length < 2) {
        newErrors.lastname = 'Last name must be at least 2 characters';
    } else if (formData.fullname.lastname.length > 50) {
        newErrors.lastname = 'Last name must be less than 50 characters';
    }

    // Username validation
    if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 20) {
        newErrors.username = 'Username must be less than 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    return newErrors;
};

export const validateField = (name, value, formData = {}) => {
    switch (name) {
        case 'firstname':
            if (!value.trim()) return 'First name is required';
            if (value.length < 2) return 'First name must be at least 2 characters';
            if (value.length > 50) return 'First name must be less than 50 characters';
            return '';

        case 'lastname':
            if (!value.trim()) return 'Last name is required';
            if (value.length < 2) return 'Last name must be at least 2 characters';
            if (value.length > 50) return 'Last name must be less than 50 characters';
            return '';

        case 'username':
            if (!value.trim()) return 'Username is required';
            if (value.length < 3) return 'Username must be at least 3 characters';
            if (value.length > 20) return 'Username must be less than 20 characters';
            if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
            return '';

        case 'email':
            if (!value.trim()) return 'Email is required';
            if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
            return '';

        case 'password':
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
                return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
            }
            return '';

        default:
            return '';
    }
};