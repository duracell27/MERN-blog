import axios from '../utils/axios'
import React, { useCallback, useEffect, useState } from 'react'
import PostItem from '../components/PostItem'

export default function PostsPage() {
    const [posts, setPosts] = useState([])

    const fetchMyPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/user/me`)
        setPosts(data)
    },[])

    useEffect(() => {
        fetchMyPost()
    }, [fetchMyPost])

    if (!posts) {
        return (<div className="text-sm text-center text-white py-10">Тут ще немає поста</div>)
    }
    return (
        <div className='w-1/2 mx-auto py-10 flex-col gap-10'>
            {posts?.map((post, idx) => (
                <PostItem key={idx} post={post} />
            ))}
        </div>
    )
}
