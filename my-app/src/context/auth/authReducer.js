export default (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_NEW':
      return {
        ...state,
        newnew: action.payload
      };

    default:
      return state;
  }
};
