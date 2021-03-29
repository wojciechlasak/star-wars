import {FilmsInformation, FilmsDispatchTypes, FILMS_SUCCESS, FILMS_LOADING, FILMS_FAIL } from './filmsActionTypes';

export interface DefaultStateI {
  loading: boolean,
  films: FilmsInformation[]
}

const defaultState: DefaultStateI = {
  loading: false,
  films: []
}

export const filmsReducer = (state:DefaultStateI = defaultState, action: FilmsDispatchTypes):DefaultStateI => {
  switch(action.type) {
    case FILMS_FAIL:
      return {
        loading: false,
        films: [],
      }
    case FILMS_LOADING: 
      return {
        loading: true,
        films: [],
      }
    case FILMS_SUCCESS:
      return {
        loading: false,
        films: action.payload,
      }
    default:
      return state;
  }
}

