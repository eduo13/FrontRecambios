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
    case ArticuloActionTypes.EDITAR: {
      //buscamos posición del articulo a modificar
      const index = state.articulos.findIndex(item => item.ID_Articulo === action.payload.ID_Articulo);
      const array = [...state.articulos]; //copiamos articulos a nuevo array
      array[index] = action.payload;
      return {//devolvemos nuevo state
        ...state,
        articulos: array
      }
    }

    case ArticuloActionTypes.ELIMINAR: {
      return {
        ...state,
        articulos: state.articulos.filter(
          articulo => articulo.ID_Articulo !== action.payload.id)
      };
    }
    case ArticuloActionTypes.CARGA_ARTICULOS: {
      return {
        ...state,
        articulos: action.payload.lista
      }
    }
    case ArticuloActionTypes.VER_ARTICULOS: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}

