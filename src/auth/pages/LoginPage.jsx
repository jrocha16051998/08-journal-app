import React, { useMemo } from 'react'
import { Google} from '@mui/icons-material'
import { Alert, TextField as TextField } from '@mui/material'
import { Grid, Typography, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'

const formData = {
    email: '',
    password: ''
}
export const LoginPage = () => {
    const { status, errorMessage } = useSelector( state => state.auth)
    const dispatch = useDispatch()
    const { email, password, handleInputChange} = useForm( formData )

    const isAuthenticating = useMemo( () => status === 'checking', [status])
    const onSubmit = (e)=>{
        e.preventDefault()
        //dispatch( checkingAuthentication( email, password))
        
        dispatch( startLoginWithEmailPassword({ email, password } ))

    }

    const onGoogleSignIn = ()=>{
        console.log('onGoogleSignIn')
        dispatch( startGoogleSignIn())
    }
    return (
        <AuthLayout title='Inicio de sesión'>
            <form onSubmit={ onSubmit } className=' animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label='Email' 
                            type='email' 
                            placeholder='correo@google.com' 
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ handleInputChange }
                        ></TextField>
                        
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        
                        <TextField 
                            label='Password' 
                            type='password' 
                            placeholder='MyPass1234' 
                            fullWidth 
                            autoComplete='false'
                            name='password'
                            value={ password }
                            onChange={ handleInputChange }
                        ></TextField>
                    </Grid>
                    

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid item xs={12} md={12} display={!!errorMessage ? '' : 'none'} >
                            <Alert severity='error' >{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Button 
                                disabled= { isAuthenticating }
                                variant='contained' 
                                type='submit' 
                                fullWidth>Login</Button>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Button 
                                disabled= { isAuthenticating }
                                onClick={ onGoogleSignIn } 
                                variant='contained' 
                                fullWidth>
                                <Google />
                                <Typography sx={{ ml:1 }}> Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Link component={ RouterLink } to='/auth/register'>
                            Crear una cuenta
                        </Link>
                        
                            
                    </Grid>
                </Grid>

            </form>

        </AuthLayout>
                
    )
}
