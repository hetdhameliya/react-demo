import { createSlice } from '@reduxjs/toolkit'
const emptyObj = { opne: false, date: null }

export const drawerSlice = createSlice({
    name: "drawer",
    initialState: {
        todoModal: emptyObj
    },
    reducers: {
        opneTodoModal: (stae, { payload }) => {
            stae.todoModal = { opne: true, data: payload }
        },
        closeTodoModal: (stae) => {
            stae.todoModal = emptyObj
        }
    }
})


export const { opneTodoModal, closeTodoModal } = drawerSlice.actions

export default drawerSlice.reducer