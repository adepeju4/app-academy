import jwt from 'jsonwebtoken';


export const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    },
    process.env.SECRET,
    {
        expiresIn: '1d'
    }
    )
}