import { Dispatch } from 'redux';
import { CharactersDispatchTypes, CHARACTERS_SUCCESS, CHARACTERS_LOADING, CHARACTERS_FAIL } from './characterActionTypes';


const getAllDataFromPages = async (numberOfPages: number, url: string) => {
  const numberOfPagesLeft = Math.ceil((numberOfPages - 1) / 10);
  const promises = [];
  for (let i = 2; i <= numberOfPagesLeft; i++) {
    promises.push(fetch(`${url}/?page=${i}`));
  }
  return Promise.all(promises);
}

export const fetchCharacters = (url: string) => async (dispatch: Dispatch<CharactersDispatchTypes>) => {
  try {
    dispatch({
      type: CHARACTERS_LOADING
    })


    const firstPageData = await fetch(url)
    const firstPageDataJson = await firstPageData.json();
    const numberOfPages  = await firstPageDataJson.count;
    dispatch({
      type: CHARACTERS_SUCCESS,
      payload: firstPageDataJson.results
    })

    const allData = await getAllDataFromPages(numberOfPages, url);
    const allDataJson = await allData.map(data => data.json());
    for (const data of allDataJson) {
      const dataLoaded = await data;
      dispatch({
        type: CHARACTERS_SUCCESS,
        payload: dataLoaded.results
      })
    }

  } catch(e) {
    dispatch({
      type: CHARACTERS_FAIL
    })
  }
}