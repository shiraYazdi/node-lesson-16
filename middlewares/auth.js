import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    let token = req.headers["token"];
    if (!token)
        return res.status(401).json({ type: "not authorized", message: "user not authorized" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_STRING);
        next();
    } 
    catch (err) {
        return res.status(401).json({ type: "not authorized", message: "user not authorized" })
    }
}