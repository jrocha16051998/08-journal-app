
import { Alert, TextField as TextField } from '@mui/material'
import { Grid, Typography, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
    email: '',
    password: '',
    displayName: ''
}

export const RegisterPage = () => {
    const dispatch = useDispatch()
    const [formSubmited, setFormSubmited] = useState(false)

    const regEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i 
    const regPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/

    const formValidations ={
        email: [(value) => regEmail.test( value ) , 'El correo electronico tiene un formato incorrecto'],
        password:[( value )=> regPassword.test( value), 'El password debe tener al entre 6 y 15 caracteres, entre ellos: un número, una mayúscula y una minúscula'],
        displayName: [( value ) => value.length > 1, 'El nombre debe tener más de 2 caracteres']
    }
    
    const {
        displayName, email, password, handleInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations) 
    
    const onSubmit = (e) =>{
        e.preventDefault()
        setFormSubmited(true)
        if( !isFormValid ) return

        dispatch(startCreatingUserWithEmailPassword(formState))
        
    }

    const { status, errorMessage} = useSelector(state => state.auth)
    const isCheckingAuthentication = useMemo( ()=> status === 'checking', [status])
    
    return (
        <AuthLayout title='Registro'>
            <form onSubmit={ onSubmit } className=' animate__animated animate__fadeIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label='Nombre completo' 
                            type='text' 
                            placeholder='Tu nombre y apellido' 
                            fullWidth
                            value={ displayName }
                            name= 'displayName'
                            onChange={ handleInputChange }
                            error={ !!displayNameValid && formSubmited }
                            helperText={ displayNameValid }
                            required
                        ></TextField>
                        
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        <TextField 
                            label='Email' 
                            type='email' 
                            placeholder='correo@google.com' 
                            fullWidth
                            value={ email }
                            name= 'email'
                            onChange={ handleInputChange }
                            error={ !!emailValid && formSubmited }
                            helperText={ emailValid }
                            required
                        ></TextField>
                        
                    </Grid>
                    <Grid item xs={12} sx={{mt:2}}>
                        
                        <TextField 
                            label='Password' 
                            type='password' 
                            placeholder='MyPass1234' 
                            fullWidth 
                            autoComplete='false'
                            value={ password }
                            name= 'password'
                            onChange={ handleInputChange }
                            error={ !!passwordValid && formSubmited  }
                            helperText={ passwordValid }
                            required
                        ></TextField>
                    </Grid>
                    

                    <Grid container spacing={2} sx={{mb:2, mt:1}}>
                        <Grid item xs={12} md={6} display={ !!errorMessage ? '' : 'none '}>
                            <Alert severity='error'> {errorMessage} </Alert>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Button
                                disabled={ isCheckingAuthentication }
                                type= 'submit' 
                                variant='contained' 
                                fullWidth
                            >Crear cuenta</Button>
                        </Grid>
                      
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr:1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={ RouterLink } to='/auth/login'>
                            Ingresar
                        </Link>
                        
                            
                    </Grid>
                </Grid>

            </form>

        </AuthLayout>
                
    )
}
