
import { ChevronLeft } from '@mui/icons-material'
import { Box, Divider, Drawer, IconButton, List, Toolbar} from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cambio } from '../../store/ui/uiSlice'
import { SideBarItem } from './SideBarItem'

export const SideBar = () => {
    const dispatch = useDispatch()    
    const { notes } = useSelector( state => state.journal)
    const {drawerWidth}  = useSelector( state => state.drawer)
    
    const handleDrawClose = () =>{
        dispatch( cambio(0))
    }

    
    
    return (
        <Box component='nav'
            sx={{ width:{ drawerWidth}, flexShrink:{ sm:0 }}}>
            
            <Drawer
                variant='persistent'
                open
                sx={{
                    display:{ xs:'block'},
                    '& .MuiDrawer-paper':{ boxSizing: 'border-box', width: `${drawerWidth}px`},
                    transition:'all 5s'
                }}
            >
                <Toolbar  >
                    <IconButton onClick={handleDrawClose} >
                        <ChevronLeft />
                    </IconButton>
                   
                    
                </Toolbar>
                <Divider />
                <List>
                    {
                        notes.map(note =>(
                            <SideBarItem key={note.id} {... note} />
                        ))
                    }
                </List>
            </Drawer>

        </Box>
    )
}
