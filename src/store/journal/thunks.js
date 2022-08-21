import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../auth/firebase/config'
import { fileUpload } from '../../helpers/fileUpload'
import { loadNotes } from '../../helpers/loadNotes'
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice'

export const startNewNote =  () =>{
    return async(dispatch, getState) =>{
        dispatch( savingNewNote() )
        const { uid } = getState().auth
        const newNote={
            title:'',
            body:'',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ))
        await setDoc( newDoc, newNote)
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote))
        dispatch( setActiveNote( newNote ))
    }
}

export const startLoadingNotes = ()=>{
    return async(dispatch, getState) =>{
        const { uid } = getState().auth 
        const notes = await loadNotes(uid)
        dispatch( setNotes( notes ))
    }
}

export const startSaveNote = () =>{
    return async (dispatch, getState) =>{
        dispatch(setSaving ())
        const { uid } = getState().auth
        const { active: note} = getState().journal
        const noteToFirestore = { ...note}
        delete noteToFirestore.id

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id}`)

        try {
            await setDoc( docRef, noteToFirestore, { marge: true})
        } catch (error) {
            console.log(error)
        }
        dispatch( updateNote( note ))
    }
}
export const startUploadingFiles = ( files = []) =>{
    return async (dispatch) =>{
        dispatch( setSaving() )
        //await fileUpload( files [0])  
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises )
        console.log(photosUrls)
        dispatch( setPhotosToActiveNote( photosUrls ))
        
    }
}