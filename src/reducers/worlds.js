export default (state = null, action) => {
  switch (action.type) {
    case 'FETCHED_WORLDS':
      return action.payload;
    default:
      return state;
  }
};
