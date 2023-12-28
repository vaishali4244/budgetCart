import { createSlice } from "@reduxjs/toolkit";

// Initial states constructed
const initialState = {
    loading: false,
    user: {
        name: 'vicky',
        email: "vicky@gmail.com",
    },
    marks: [],
    accessToken:'',
}


//redux slices are made
export const userDetail = createSlice({
    name: "boy",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setUserName: (state, action) => {
            state.user.name = action.payload;
        },
        setUserEmail: (state, action) => {
            state.user.email = action.payload
        },
        setMarks: (state, action) => {
            state.marks = action.payload
        },
        SAGA_POST_REQUEST:()=>{},
        SAGA_PUT_REQUEST:()=>{}
    }
})

//automatically generated actions and reducer
export const {setLoading, setUserName, setUserEmail, setMarks, SAGA_POST_REQUEST, SAGA_PUT_REQUEST} = userDetail.actions;
export default userDetail.reducer;