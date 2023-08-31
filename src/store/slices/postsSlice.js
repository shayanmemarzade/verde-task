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
      state.list = state.list.filter(todo => todo.id !== action.payload)
    },
    editPost: (state, action) => {
      state.list = state.list.map((todo) => {
        return todo.id === action.payload.id
          ? {
            ...todo,
            title: action.payload.title,
            body: action.payload.body
          }
          : todo
      })
    }
  }
})


export const { setPosts, addPost, deletePost, editPost } = postsSlice.actions;

export default postsSlice.reducer;