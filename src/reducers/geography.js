export const projection = (state = 'ORTHOGRAPHIC', action) => {
  switch (action.type) {
    case 'TOGGLE_PROJECTION':
      return state === 'ORTHOGRAPHIC' ? 'EQUIRECTANGULAR' : 'ORTHOGRAPHIC';
    default:
      return state;
  }
};
