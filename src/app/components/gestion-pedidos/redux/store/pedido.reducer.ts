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
        pedidos: [...state.pedidos, action.payload]
      }
    }
    case PedidoActionTypes.ELIMINAR: {
      return {
        ...state,
        pedidos: state.pedidos.filter(
          Pedido => Pedido.ID_Pedido !== action.payload.id)
      };
    }
    case PedidoActionTypes.CARGA_PEDIDOS: {
      return {
        ...state,
        pedidos: action.payload.lista
      }
    }
    case PedidoActionTypes.VER_PEDIDOS: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}



