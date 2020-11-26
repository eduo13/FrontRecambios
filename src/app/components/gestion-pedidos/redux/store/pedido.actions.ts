


/* import { createAction, props } from '@ngrx/store';
import { PedidoModelo } from '../../models/PedidoModelo';


  export const AGREGAR = createAction(
    '[Pedido] Agregar Pedido',
    props<PedidoModelo>());

  export const ELIMINAR = createAction(
    '[Pedido] Eliminar Pedido',
    props<{id: number}>());

  export const LISTA_PEDIDOS = createAction(
    '[Pedido] Lista Pedidos',
    props<{lista: PedidoModelo[]}>());
 */

import { Action } from '@ngrx/store';

export enum PedidoActionTypes {
  CREAR = '[Pedido] Crear Pedido',
  ELIMINAR = '[Pedido] Eliminar Pedido',
  LISTA_PEDIDOS = '[Pedido] Lista Pedidos'
}

export class CrearPedido implements Action {
  readonly type = PedidoActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarPedido implements Action {
  readonly type = PedidoActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class ListaPedido implements Action {
  readonly type = PedidoActionTypes.LISTA_PEDIDOS;
  constructor(public payload: any) {}
}

export type PedidoActions =
  | CrearPedido
  | EliminarPedido
  | ListaPedido;



