import {combineReducers} from "redux";
import { characterReducer } from "../characters/charactersReducer";
import { filmsReducer } from "../films/filmsReducer";

const RootReducer = combineReducers({
  characters: characterReducer,
  films: filmsReducer,
});

export default RootReducer