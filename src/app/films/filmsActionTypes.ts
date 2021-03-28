export const FILMS_LOADING = 'FILMS_LOADING';
export const FILMS_FAIL = 'FILMS_FAIL';
export const FILMS_SUCCESS = 'FILMS_SUCCESS';

export type FilmsInformation = {
  title: string,
}


export interface FilmsLoading {
  type: typeof FILMS_LOADING;
}

export interface FilmsFail {
  type: typeof FILMS_FAIL;
}

export interface FilmsSuccess {
  type: typeof FILMS_SUCCESS,
  payload: [],
}

export type FilmsDispatchTypes = FilmsLoading | FilmsFail | FilmsSuccess;