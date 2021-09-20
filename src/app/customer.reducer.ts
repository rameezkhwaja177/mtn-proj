import {ActionEx, CustomerActionTypes} from './customer.action';
export const initialState = [];
export function CustomerReducer(state = initialState, action: ActionEx) {
    console.dir(action.type);
  switch (true) {
    case (action.type == 'add'):
      return [...state, action.payload];

    case (action.type == 'remove'):
      return [
      //  ...state.splice( action.payload, 1 )
       //state.filter(element => element !== action.payload),

        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
return [...state, action.payload];
}