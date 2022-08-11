import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

//Register
export const register = async (req, res) => {
    try {
        const { userName, password } = req.body

        const isUsed = await User.findOne({ userName })
        if (isUsed) {
            return res.json({ message: 'Таке імя вже зайнято' })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            userName,
            password: hash
        })

        await newUser.save()

        return res.json({
            newUser,
            message: 'Реєстрація пройшла успішно',
        })
    } catch (error) {
        return res.json({
            error,
            message: "Помилка при реєстрації"
        })
    }
}

//Login
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName })
        if (!user) {
            return res.json({ message: 'Такого користувача не існує' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({ message: 'Не правильний пароль' })
        }
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '30d' })

        return res.json({ token, user, message: 'Ви ввійшли в систему' })
    } catch (error) {
        return res.json({
            error,
            message: "Помилка при авторизаціїї"
        })
    }
}
//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.json({ message: 'Такого користувача не існує' })
        }
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '30d' })
        return res.json({ user, token })
    } catch (error) {
        return res.json({ message: 'Немає доступу' })
    }
}