import { UserModel, userValidator, userValidatorForLogin } from "../models/user.js";

export const addUser = async (req, res) => {
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });
    let { userName, password, tz, email, books } = req.body;
    
    try {
        let sameUser = await UserModel.findOne({ $or: [{ userName: userName }, { tz: tz }] })
        
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
        let newUser = new UserModel({ userName, password, email, tz, books });
        await newUser.save();
        return res.json(newUser)
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
        if (!user)
            res.status(404).json({ type: "no such user", message: "please sign up" })
        user.password = "*****";
        return res.json(user);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}
