import { FETCH_NEWS } from '../actions/newsActions';

const initialState = { hits: [] };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_NEWS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
