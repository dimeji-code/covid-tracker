import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const user:any = JSON.parse(localStorage.getItem('user') || '{}')


const initialState = {
    
    lang:"En",
    toastOpen: false,
    modalOpen: false,
    country:"",
    countryApi:""
}




export const windowSlice = createSlice({
    //name of the slice
    name: "window",
    //the initial state definition, will be altered along the way
    initialState,
    reducers:{
        toggleLanguage :(state,action) =>{

            state.lang = (state.lang == "En"?"Fr":"En") ;
        
    },
    toggleToast:(state,action) =>{
        state.toastOpen = action.payload.toastOpen;
    },
    toggleModal:(state,action) =>{
        state.modalOpen = action.payload.modalOpen;
    },
    setCountry:(state,action)=>{
        state.country = action.payload.country;
        state.countryApi = action.payload.countryApi

    }
}
    
    
})

export const {toggleLanguage,toggleToast, toggleModal,setCountry} = windowSlice.actions
export default windowSlice.reducer