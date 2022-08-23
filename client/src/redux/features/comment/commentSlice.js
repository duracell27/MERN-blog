import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../../utils/axios";
const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment }) => {
    try {
        const { data } = await axios.post(`comments/${postId}`, { postId, comment })
        return data
    } catch (error) {
        console.log(error);
    }
})

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
    try {
        const { data } = await axios.get(`/posts/comments/${postId}`)
        return data
    } catch (error) {
        console.log(error);
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers:{
        // createComment reducer
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state, action) => {
            state.loading = false
        },

         // getComment reducer
         [getPostComments.pending]: (state) => {
            state.loading = true
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getPostComments.rejected]: (state, action) => {
            state.loading = false
        },
    }
})

export default commentSlice.reducer