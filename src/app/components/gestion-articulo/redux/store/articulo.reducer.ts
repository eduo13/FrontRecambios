import { ArticuloModelo } from '../../models/ArticuloModelo';
import { ArticuloActions, ArticuloActionTypes } from './articulo.actions';



export interface ArticuloState{
  articulos: ArticuloModelo[] | null;
}

export const initialState: ArticuloState = {
  articulos: null
};

export function articuloReducer(state = initialState, action: ArticuloActions): ArticuloState {
  switch (action.type) {
    case ArticuloActionTypes.CREAR: {
      return {
        ...state,
        articulos: [...state.articulos, action.payload]
      }
    }
    case ArticuloActionTypes.ELIMINAR: {
      return {
        ...state,
        articulos: state.articulos.filter(
          articulo => articulo.ID_Articulo !== action.payload.id)
      };
    }
    case ArticuloActionTypes.LISTA_ARTICULOS: {
      return {
        ...state,
        articulos: action.payload.lista
      }
    }
    default: {
      return state;
    }
  }
}

