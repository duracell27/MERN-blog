import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body;
        if(!comment) return res.json({ message: 'Коментарій не може бути пустим' })

        const newComment = new Comment({comment})
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {$push: {comments: newComment._id}})
        } catch (error) {
            return res.json({ message: 'Щось пішло не так при створенні коментаря при додаванні до юзера' })
        }
        return res.json(newComment)
    } catch (error) {
        return res.json({ message: 'Щось пішло не так при створенні коментаря' })
    }
}