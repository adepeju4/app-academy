import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validateRegister, validateLogin } from "../utils/validators.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

dotenv.config();

const AuthController = {
  signup: async (req, res, next) => {
    const { error } = validateRegister(req.body);

    if (error) return next(error.message);

    const { firstName, lastName, email, password } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      return next({ err: "User exists, please login." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (hash) {
      const newUser = new User({ firstName, lastName, email, password: hash });
      const savedUser = await newUser.save();

      if (savedUser) {
        const token = generateToken(savedUser);

        const userData = {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
        };
        res.cookie("token", token, { httpOnly: true, sameSite: true });
        return res.status(200).json({
          status: "success",
          data: {
            token,
            id: savedUser._id,
            ...userData,
          },
        });
      }
    }
  },

  login: async (req, res, next) => {
    
    const { error } = validateLogin(req.body);
  
    if (error) return next(error.message);

    const { email, password } = req.body;

    

    const user = await User.findOne({ where: { email } });
  
    
    if (user) {
      const token = generateToken(user);
    
      if (bcrypt.compareSync(password, user.password)) {
        res.cookie("token", token, { httpOnly: true, sameSite: true });
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        return res.status(200).json({
          status: "success",
          data: {
            _id: user._id,
            ...userData,
            token,
          },
        });
      }
    }

    return next({ err: "Incorrect email or password" });
  },

  logout: (req, res) => {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).json({ status: "Logged out" });
  },
};

export default AuthController;
