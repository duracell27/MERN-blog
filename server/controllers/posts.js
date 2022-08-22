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

// get all posts 

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if (!posts) {
            return res.json({ message: 'Постів немає' })
        }

        return res.json({ posts, popularPosts })
    } catch (error) {
        return res.json({ message: 'Щось пішло не так при отриманні всіх постів' })
    }
}

// get post by id

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })

        res.json(post)
    } catch (error) {
        return res.json({ message: 'Помилка при отриманні поста по ід' })
    }
}

// get my posts 

export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            })
        )

        res.json(list)
    } catch (error) {
        return res.json({ message: 'Помилка при отриманні своїх постів' })
    }
}

// remove post by id

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.json({ message: 'Такого посту не знайдено' })
        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id }
        })
        return res.json({ message: 'Пост видалений', id: req.params.id })
    } catch (error) {
        return res.json({ message: 'Помилка при видаленні поста' })
    }
}

// update post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()
        return res.json(post)

    } catch (error) {
        return res.json({ message: 'Помилка при оновленні поста' })
    }
}