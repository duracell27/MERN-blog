import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
    try {
        const { data } = await axios.post('/posts', params)
        return data
    } catch (error) {
        console.error(error)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        // createPost reducer
        [createPost.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },
    }
})

export default postSlice.reducer