import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { startDeletingNote } from '../../store/auth'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'

export const NoteView = () => {
    const dispatch = useDispatch()
    const { active: note, isSaving, messageSaved} = useSelector( state => state.journal)
    const { title, body, handleInputChange, formState, date} = useForm( note )
    const fileInputRef = useRef()
    const dateString = useMemo(()=>{
        const newDate = new Date( date )
        return newDate.toUTCString()
    }, [date])

    useEffect(() => {
      
        dispatch( setActiveNote( formState ))
    }, [formState])

    useEffect(() => {
        if(messageSaved.length !== 0){
            Swal.fire( 'Nota actualizada', messageSaved, 'success')

        }
        
    }, [messageSaved])
    
    const onSaveNote = () =>{
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ({ target }) =>{
        if( target.files === 0) return
        dispatch ( startUploadingFiles ( target.files))
    }
    const onDelete = () =>{
        dispatch( startDeletingNote( note.id ) )
    }
    
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb:1 }} className=' animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input type='file' multiple onChange={ onFileInputChange } style={{ display: 'none'}} ref={ fileInputRef }/>
                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={ ()=> fileInputRef.current.click()}
                >
                    <UploadFileOutlined />
                </IconButton>
                <Button onClick={ onSaveNote } disabled={ isSaving }>
                    <SaveOutlined sx={{ fontSize: 30, mr:1}}></SaveOutlined>
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='Titulo'
                    name='title'
                    value={ title }
                    onChange={handleInputChange}
                    sx={{ border:'none', mb:1}}
                />
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder={ body ? '' : '¿Qué has hecho hoy?'}
                    label='Descripción'
                    minRows={5}
                    name='body'
                    value= { body }
                    onChange={handleInputChange}
                    sx={{ border:'none', mb:1}}
                />
            </Grid>
            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete}
                    sx={{ mt: 2}}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>

            </Grid>
            <ImageGallery image={ note.imageUrls } />
        </Grid>
        
    )
}
