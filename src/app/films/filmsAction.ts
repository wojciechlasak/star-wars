import { Dispatch } from 'redux';
import {FilmsDispatchTypes, FILMS_SUCCESS, FILMS_LOADING, FILMS_FAIL } from './filmsActionTypes';

export const fetchFilms = (url: string) => async (dispatch: Dispatch<FilmsDispatchTypes>) => {
  try {
    dispatch({
      type: FILMS_LOADING
    })

    const films = await fetch(url)
    const filmsJson = await films.json();
    dispatch({
      type: FILMS_SUCCESS,
      payload: filmsJson.results
    })

  } catch(e) {
    dispatch({
      type: FILMS_FAIL
    })
  }
}