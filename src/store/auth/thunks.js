

import { deleteDoc, doc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../auth/firebase/config'
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, signInWithGoogle } from '../../auth/firebase/providers'
import { clearNotesLogout, deleteNoteById } from '../journal/journalSlice'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = ( email, password ) =>{
    console.log({email, password})
    return async ( dispatch ) =>{
        dispatch( checkingCredentials())

    }
}

export const startGoogleSignIn = () =>{
    return async (dispatch) =>{
        dispatch( checkingCredentials())
        const result = await signInWithGoogle()
        if( !result.ok ) return dispatch( logout( result.errorMessage ) )
        
        dispatch( login( result ))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) =>{
    return async( dispatch ) =>{
        dispatch( checkingCredentials() )
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmail({email, password, displayName})
        
        if(!ok) return dispatch( logout({ errorMessage }))

        dispatch( login({ uid, email, displayName, photoURL}))
    }
}

export const startLoginWithEmailPassword = ( { email, password }) =>{
    return async ( dispatch ) =>{
        dispatch (checkingCredentials())
        const { ok, errorMessage, uid, displayName, photoURL } = await loginWithEmailPassword({ email, password})

        if( !ok ) return dispatch( logout({ errorMessage }))
        dispatch( login({uid, email, displayName, photoURL, errorMessage}))
    }
}

export const startLogout = () =>{
    return async( dispatch ) =>{
        try {
            await logoutFirebase()
            dispatch( clearNotesLogout())
            dispatch( logout())

            
        } catch (error) {
            console.log(error)
        }
        
    }
}

export const startDeletingNote = ( idNote ) =>{
    return async( dispatch, getState ) =>{
        const { uid } = getState().auth
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ idNote }`)
        await deleteDoc(docRef)
        
        dispatch(deleteNoteById( idNote ))
    }   
}