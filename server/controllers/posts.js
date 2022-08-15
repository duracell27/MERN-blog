import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";

//Create post

export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                userName: user.userName,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })

            await newPostWithImage.save()
            await User.findOneAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            })

            return res.json({ newPostWithImage })
        }

        const newPostWithoutImage = new Post({
            userName: user.userName,
            title,
            text,
            imgUrl: '',
            author: req.userId
        })
        await newPostWithoutImage.save()
        await User.findOneAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage }
        })

        return res.json({ newPostWithoutImage })
    } catch (error) {
        res.json({ message: 'Щось пішло не так при додаванні посту' })
    }
}