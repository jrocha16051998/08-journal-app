import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialState = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialState)
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators()

    }, [formState])

    useEffect(() => {
      
        setFormState( initialState)
    
    }, [initialState])
    
    
    const isFormValid = useMemo(()=>{
        for (const formValue of Object.keys( formValidation)) {
            if( formValidation[formValue] !== null) return false
        }
        return true
    }, [formValidation])

    const reset = ()=>{
        setFormState(initialState)
    }

    const handleInputChange =({target})=>{
        setFormState({
            ...formState,
            [target.name]: target.value
        })
    }

    const createValidators = () => {
        
        const formCheckedValues = {}
        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField]

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage
        }

        setFormValidation( formCheckedValues )
        
    }
    
    return { ...formState, formState, handleInputChange, reset, ...formValidation, isFormValid }


}