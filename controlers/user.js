import { UserModel, userValidator, userValidatorForLogin } from "../models/user.js";
import { generateToken } from "../config/generateToken.js";
import { hash, compare } from "bcrypt";

export const addUser = async (req, res) => {
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });
    let { userName, password, tz, email, books } = req.body;
    try {
        let sameUser = await UserModel.findOne({ $or: [{ userName: userName }, { tz: tz }] })
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
        let hashedPassword = await hash(password, 15);
        let newUser = new UserModel({ userName, password:hashedPassword, email, tz, books });
        await newUser.save();
        let token = generateToken(newUser);
        return res.json({ token })
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const login = async (req, res) => {
    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });
        try {
        let user = await UserModel.findOne({ password:req.body.password, userName:req.body.userName })
        if (!user|| !await compare(req.body.password, user.password))
            res.status(404).json({ type: "no such user", message: "please sign up" })
        let token = generateToken(user);
        return res.json({ token })
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find({}, "-password");
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
