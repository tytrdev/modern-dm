import { Worlds } from '../firebase';
import { FETCHED_WORLDS } from './types';

export const getUserWorlds = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));

  Worlds.orderByChild('owner').equalTo(user.uid).on('value', (snapshot) => {
    const items = snapshot.val() || {};

    dispatch({
      type: FETCHED_WORLDS,
      payload: Object.values(items),
    });
  });
};
