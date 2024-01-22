import axios from "axios";
import Swal from "sweetalert2";

export default function deleteRecipe(data, navig) {
  console.log("delete xxx")
  return dispatch => {
    axios.post(`http://localhost:8080/api/recipe/delete/${data.Id}`)
      .then(x => {
        dispatch({ type: 'DELETE_RECIPE', payload: data })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " המתכון נמחק בהצלחה",
          showConfirmButton: false,
          timer: 1500
        });
        navig("/recipes")
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          position: "top-end",
          icon: "eroor",
          title: "קרתה תקלה במחיקת המתכון נסה שנית",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }

}


