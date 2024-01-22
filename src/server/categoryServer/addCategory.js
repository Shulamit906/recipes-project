import axios from "axios";
import Swal from "sweetalert2";

export default function addCategory(data) {
    return dispatch => {
        axios.post("http://localhost:8080/api/category", data)
            .then(x => {
                dispatch({ type: 'ADD_CATEGORIES', payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "הקטגוריה נוספה בהצלחה",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "הקטגוריה קיימת",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

}