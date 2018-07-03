export default (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};
