import jwt from 'jsonwebtoken';

export const createToken = (id: string): any => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "1h"
    });
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: "7d"
    });
    return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        return null;
    }
}; 