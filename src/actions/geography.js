import { toast } from 'react-toastify';

export const toggleProjection = () => async (dispatch) => {
  dispatch({
    type: 'TOGGLE_PROJECTION',
  });
};
