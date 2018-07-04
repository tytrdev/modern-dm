import { toast } from 'react-toastify';

export const toggleProjection = () => async (dispatch) => {
  console.log('Toggling project');
  dispatch({
    type: 'TOGGLE_PROJECTION',
  });
};
