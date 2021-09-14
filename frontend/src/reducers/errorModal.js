const defaultState = {
  show: false,
  errorText: '',
};

const errorModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, show: true, errorText: action.text };
    case HIDE_ERROR:
      return { ...state, show: false, errorText: '' };
    default:
      return state;
  }
};

export const showErrorModal = (text) => {
  return { text, type: SHOW_ERROR };
};

export const closeErrorModal = (text) => {
  return { type: HIDE_ERROR };
};

const SHOW_ERROR = 'SHOW_ERROR';
const HIDE_ERROR = 'HIDE_ERROR';

export default errorModalReducer;
