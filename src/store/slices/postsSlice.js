import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    list: []
  },
  reducers: {
    setPosts: (state, action) => {
      state.list = action.payload
    },
    addPost: (state, action) => {
      state.list.push(action.payload)
    },
    deletePost: (state, action) => {
      state.list = state.list.filter(post => post.id !== action.payload)
    },
    editPost: (state, action) => {
      state.list = state.list.map((post) => {
        return post.id === action.payload.id
          ? {
            ...post,
            title: action.payload.title,
            body: action.payload.body
          }
          : post
      })
    }
  }
})


export const { setPosts, addPost, deletePost, editPost } = postsSlice.actions;

export default postsSlice.reducer;