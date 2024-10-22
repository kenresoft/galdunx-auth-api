import validator from 'validator';

export const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
};

export const isValidPassword = (password: string): boolean => {
    // The password validation rule is: Minimum 8 characters, at least one letter and one number
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 0,
        minSymbols: 0,
    });
};
