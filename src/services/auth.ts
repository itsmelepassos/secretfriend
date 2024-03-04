import { getCurrentDate } from "../utils/getCurrentDate"

export const validatePassword = (password: string): boolean => {
    const currentPassword = getCurrentDate().split('/').join('');
    return password === currentPassword;
}

export const createToken = () => {
    const currentPassword = getCurrentDate().split('/').join('');
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
}

export const validateToken = (token: string) => {
    const currentToken = createToken();
    return token === currentToken;
}