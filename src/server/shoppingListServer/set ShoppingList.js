import axios from "axios"

export const setShoppingList = (user) => {
    return dispatch => {
        if (!user)
            dispatch({ type: 'SET_TOSHOPPING', payload: [] })
        else
            axios.get(`http://localhost:8080/api/bay/${user?.Id}`).then(x => {
                dispatch({ type: 'SET_TOSHOPPING', payload: x.data })
            })
                .catch(err => console.log(err))
    }
}