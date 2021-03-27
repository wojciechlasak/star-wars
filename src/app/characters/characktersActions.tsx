import { Dispatch } from 'redux';
import { CharactersDispatchTypes, CHARACTERS_SUCCESS, CHARACTERS_LOADING, CHARACTERS_FAIL } from './characterActionTypes';

// export const getCharacters = (dispatch: Dispatch<CharactersDispatchTypes>) => {

// }

export const fetchCharacters = (url: string) => async (dispatch: Dispatch<CharactersDispatchTypes>) => {
  try {
    dispatch({
      type: CHARACTERS_LOADING
    })


    await fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: CHARACTERS_SUCCESS,
          payload: res.results
        })
        return res.count;
      })
      .then(count => {
        const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        let promises = [];
        for (let i = 2; i <= numberOfPagesLeft; i++) {
            promises.push(fetch(`${url}/?page=${i}`));
        }
        return Promise.all(promises)
    })
    .then(res => res.map(value => value.json()))
    .then(res => res.map(value => value.then(
        response => {
        
        dispatch({
          type: CHARACTERS_SUCCESS,
          payload: response.results
        })
      }))
    )

  } catch(e) {
    dispatch({
      type: CHARACTERS_FAIL
    })
  }
}