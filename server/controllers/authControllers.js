import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
   try {
     const { username, password } = req.body;
 
     const isUsed = await User.findOne({ username });
 
     if (isUsed) {
       return res.json({
         message: "Цей username вже зайнятий",
       });
     }
 
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(password, salt);
 
     const newUser = new User({
       username,
       password: hash,
     });
 
     await newUser.save();
 
     res.json({
       newUser,
       message: "Регістрація пройшла успішно",
     });
   } catch (error) {
     res.json({ message: "Помилка при створенні користувача" });
   }
 };

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "Такого user-а не існує",
      });
    }
    //Порівнюємо закешировані паролі 
    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Некоректний пароль",
      });
    }
    // створюємо та шифруємо токін
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Ви успішно увійшли до системи",
    });
  } catch (error) {
    res.json({ message: "Помилка при авторизації" });
  }
};

// Get Me
export const getMe = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.json({
      message: "Такого user-а не існує",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({
   token,
   user,
   message: "Ви успішно увійшли до системи",
  })
  try {
  } catch (error) {
   res.json({ message: "Не маєте доступу" });
  }
};