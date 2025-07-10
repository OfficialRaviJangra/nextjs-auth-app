import jwt from 'jsonwebtoken';

export const createToken = (id: string): { accessToken: string; refreshToken: string } => {
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
        if (error instanceof jwt.JsonWebTokenError) {
            // Handle JWT error
            console.error("Invalid token:", error.message);
        }
        return null;
    }
}; 