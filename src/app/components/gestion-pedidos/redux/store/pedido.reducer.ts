//import { createReducer, on } from '@ngrx/store';
import { PedidoModelo } from '../../models/PedidoModelo';
import { PedidoActions, PedidoActionTypes } from './pedido.actions';
//import * as actions from '../store/pedido.actions';


export interface PedidoState{
  pedidos: PedidoModelo[] | null;
}


export const initialState: PedidoState = {
  pedidos: null
}


export function pedidoReducer(state = initialState, action: PedidoActions): PedidoState {
  switch (action.type) {
    case PedidoActionTypes.CREAR: {
              console.log("creando pedido")
      return {
        ...state,
        pedidos: [state.pedidos, action.payload]
      }
    }
    case PedidoActionTypes.ELIMINAR: {
      return {
        ...state,
        pedidos: state.pedidos.filter(
          Pedido => Pedido.ID_Pedido !== action.payload.id)
      };
    }
    case PedidoActionTypes.LISTA_PEDIDOS: {
      return {
        ...state,
        pedidos: action.payload.lista
      }
    }
    default: {
      return state;
    }
  }
}




/*
const __pedidoReducer = createReducer(
  initialState,

  on( actions.AGREGAR, (state,  pedido ) => {
      return {
        ...state,
        pedidos: [...state.pedidos , pedido]
      }
  }),

  on( actions.ELIMINAR, (state, { id }) => {
     return {
      ...state,
        ...state.pedidos.filter(pedido => pedido.ID_Pedido !== id),
      }
  }),

  on( actions.LISTA_PEDIDOS, (state, { lista }) =>  {
    return {...state, pedidos : lista}
  }),

//  on( actions.EDITAR, (state, { lista }) => state = lista ),

);

export function pedidoReducer(state, action) {
  return __pedidoReducer(state, action);
} */
