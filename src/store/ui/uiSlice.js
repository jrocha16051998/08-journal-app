import { createSlice } from '@reduxjs/toolkit'


export const drawerSlice = createSlice({
    name: 'drawer',
    initialState:{
        drawerWidth : 300
    },
    reducers: {
        cambio: (state, {payload}) => {
            state.drawerWidth = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { cambio } = drawerSlice.actions