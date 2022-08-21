import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../store/auth'
import { cambio } from '../../store/ui/uiSlice'

export const NavBar = ( ) => {
    const {drawerWidth} = useSelector( state => state.drawer)
    const dispatch = useDispatch()
    const onLogout = () =>{
        dispatch( startLogout( ))
        // <Typography variant='h6' noWrap component='div' > {displayName} </Typography>
    }
    const handleDrawerOpen =() =>{
        dispatch( cambio(300))
    }   
       
    return (
        <AppBar
            position='fixed'
            sx={{
                width:{ sm: `calc(100% - ${ drawerWidth }px)`},
                marginLeft:`${drawerWidth}px`
            }}>
            <Toolbar>
                <IconButton 
                    color='inherit'
                    
                    sx={{mr:2, ...( drawerWidth !== 0 &&{ display:'none'}) }}
                    onClick={handleDrawerOpen}>
                    <MenuOutlined></MenuOutlined>
                </IconButton>
                <Grid container direction='row' justifyContent={'space-between'} alignItems='center'>
                    <Typography>Journal App</Typography>
                    <Link to={'/auth/login'}>
                        <IconButton 
                            color='error'
                            onClick={ onLogout }
                        >
                            <LogoutOutlined> </LogoutOutlined>
                        </IconButton>
                    </Link>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
