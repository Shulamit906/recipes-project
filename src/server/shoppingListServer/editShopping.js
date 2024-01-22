import axios from "axios";
import deleteRecipe from './deleteShopping'
import Swal from "sweetalert2";

export default function editShopping(data, user,count) {

    return dispatch => {
        if (data.Count + count == 0) 
            dispatch(deleteRecipe(data))
        else
            axios.post("http://localhost:8080/api/bay/", { Name: data.Name, UserId: user.Id, Count: count })
                .then(x => {
                    dispatch({ type: 'EDIT_SHOPPING', payload: x.data })
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "כמות המוצר שונתה בהצלחה",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(err => {console.log(err)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "קרתה תקלה בעריכת המוצר נסה שנית",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

}


