import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NavBar, SideBar } from '../components'
import { useSelector } from 'react-redux'

//const drawerWidth = 330

export const JournalLayout = ({ children }) => {
    const {drawerWidth} = useSelector( state => state.drawer)

    
    return (
        <Box sx={{ display: 'flex', marginLeft:`${drawerWidth}px`}} className=' animate__animated animate__fadeIn animate__faster'>
            <NavBar />
            <SideBar />
            <Box component= 'main' sx={{flexGrow:1, p:3 }}>
                <Toolbar />
                {children}
            </Box> 
        
        </Box>
    )
}
