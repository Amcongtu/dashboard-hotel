import Swal from "sweetalert2";
const alert = {
    getAlert: (title, type, timer = 1500, showConfirmButton = true) => 
    {
        Swal.fire({
            title: title,
            icon: type,
            showConfirmButton: showConfirmButton,
            timer: timer
        })

    },

}

       
export default alert