import { toast } from 'react-toastify';
import { Auth, GoogleProvider } from '../firebase';

export const initUser = () => async (dispatch) => {
  Auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
    }
  });
};

export const login = () => async (dispatch) => {
  Auth.signInWithPopup(GoogleProvider).then((result) => {
    const { user } = result;

    toast.success('You have logged in');

    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  });
};

export const logout = () => async (dispatch) => {
  Auth.signOut().then(() => {
    toast.success('You have logged out');

    dispatch({
      type: 'LOGOUT',
    });
  });
};
