import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView} from '../view/'

export const JournalPage = () => {
    const {isSaving, active} = useSelector( state => state.journal )
    const dispatch = useDispatch()
    const onClickNewNote =()=>{
        dispatch( startNewNote())
    }
    return (
        <JournalLayout>
            {
                (!!active 
                    ? <NoteView /> 
                    : <NothingSelectedView />
                )

            }
            
            { /*<NoteView /> */}
            <IconButton
                disabled={ isSaving }
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor:'error.main',
                    ':hover': {backgroundColor:'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom:50
                }
                }
                onClick={ onClickNewNote }
            >
                <AddOutlined sx={{fontSize:40 }}/>
            </IconButton>
        </JournalLayout>
    )
}
