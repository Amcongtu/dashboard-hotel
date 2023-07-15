import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
    getToastSuccess: (message, timer)=>
    {
        toast.success(message,
            {
                position: "top-right",
                autoClose: timer,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }

        )
    },

    getToastError: (message, timer)=>
    {
        toast.error(message,
            {
                position: "top-right",
                autoClose: timer,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }

        )
    }


}
export default Toast