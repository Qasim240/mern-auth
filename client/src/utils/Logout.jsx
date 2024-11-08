
import { clearUser } from '../redux/slices/userSlice';


export const handleLogout = (dispatch, navigate) => {
    dispatch(clearUser());
    navigate('/login');
};
