import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {
    //check if all fields has been filled
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) return res.json({ success: false, message: "Missing fields" });

    try {

        //check if email address doesnt exist already
        const existingEmail = await userModel.findOne({ email });

        if (existingEmail) { return res.json({ success: false, message: "Email already in use" }); }

        const existingUser = await userModel.findOne({ userName });

        if (existingUser) { return res.json({ success: false, message: "Username already in use" }); }

        //password hashing with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new user and saving to mongodb
        const user = new userModel({ userName, email, password: hashedPassword });
        await user.save();

        //creating a token with jwt
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            //i'll change it in the env file to production to make this statment true and the website secured (https)
            secure: process.env.NODE_ENV === 'production',
            //when deploying, this makes sure the front and back will work together even with different urls (when they're not both on localhost)
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //7 days in milisec (days, hours, min, sec, milisec)
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: "User created successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ success: false, message: "Email and password are required" });

    try {
        //check if email exist in one of the user's db fields
        const user = await userModel.findOne({ email });

        if (!user) return res.json({ success: false, message: "Invalid email" });

        //check if password provided is matched with this user's password field
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.json({ success: false, message: "Invalid password" });

        const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '7d' });

        console.log(token);
        res.json({ token });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });

        // return res.json({ success: true, message: "Logged in successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged out" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const protectedd = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.json({ message: 'Missing token' })

    //export the token itself (without the Bearer)
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: `Welcome ${decoded.userName}!` });
    } catch (error) {
        res.json(error);
    }
}