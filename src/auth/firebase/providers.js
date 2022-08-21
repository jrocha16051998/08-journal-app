
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config'


const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () =>{
    try {
        const result = await signInWithPopup ( FirebaseAuth, googleProvider)
        const { displayName, email, photoURL, uid} = result.user
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        return{
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        //const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmail = async ({email, password, displayName})=>{

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = resp.user
        await updateProfile(FirebaseAuth.currentUser, {displayName})
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error)
        return {ok: false, errorMessage: 'El email ya esta registrado'}
    }
}

export const loginWithEmailPassword = async ({ email, password}) =>{
    // LOGIN -> THUNK -> Provider -> thunk(logout o login)
    try {
        
        const {user} = await signInWithEmailAndPassword(FirebaseAuth ,email, password)
        const {uid, displayName, photoURL} = user
        return{
            ok: true,
            uid,
            displayName,
            photoURL,
            email
        }
        
    } catch (error) {
        let errorMessage
        if(error.code === 'auth/wrong-password') errorMessage = 'Contraseña incorrecta'
        if(error.code === 'auth/user-not-found') errorMessage = 'Usuario no registrado'
        return{ok: false, errorMessage}
    }
    
}

export const logoutFirebase = async() =>{
    return await FirebaseAuth.signOut()
}

