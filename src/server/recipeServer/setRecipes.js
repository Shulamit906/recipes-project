import axios from "axios"

export const setRecipes = () => {
    return dispatch => {
        axios.get("http://localhost:8080/api/recipe").then(x => {
            dispatch({ type: 'SET_RECIPE', payload: x.data })
        })
            .catch(err => console.log(err))
    }
}