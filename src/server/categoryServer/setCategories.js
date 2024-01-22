import axios from "axios"

export const setCategories = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/category").then((x) => {
            dispatch({ type: 'SET_CATEGORIES', payload: x.data })
        })
            .catch(err => console.log(err))
    }
}