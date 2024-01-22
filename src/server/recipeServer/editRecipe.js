import axios from "axios";
import Swal from "sweetalert2";

export default function editRecipe(data, navig) {

    return dispatch => {
        axios.post("http://localhost:8080/api/recipe/edit", data)
            .then(x => {
                dispatch({ type: 'EDIT_RECIPE', payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המתכון שונה בהצלחה",
                    showConfirmButton: false,
                    timer: 1500
                });
                navig("/recipes")
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "קרתה תקלה בעריכת המתכון נסה שנית",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

}
