import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ( {title = '', body, id, date, imageUrls=[]}) => {
    const dispatch = useDispatch()
    const newTitle = useMemo(()=>{
        return title.length > 17 
            ? title.substring(0, 17) + '...'
            : title
    }, [title])


    const handleClickNote  = () =>{
        dispatch( setActiveNote({ title, body, date, id, imageUrls}))
    }
    return (
        <ListItem key={id} disablePadding >
            <ListItemButton onClick={ handleClickNote }>
                <ListItemIcon>
                    <TurnedInNot /> 
                </ListItemIcon>
                                
                <Grid container >
                    <ListItemText primary={ newTitle } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
