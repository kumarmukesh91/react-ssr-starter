export const FETCH_NEWS = 'FETCH_NEWS';

//api => It's the custom axios instance
export const fetchNews = () => async (dispatch, getState, api) => {
  try {
    const { data } = await api.get('/search?tags=front_page');
    const { hits, nbPages, page } = data;
    dispatch({
      type: FETCH_NEWS,
      payload: {
        hits,
        nbPages,
        page,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
