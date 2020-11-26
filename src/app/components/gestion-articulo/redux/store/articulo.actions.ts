import { Action, createAction, props } from '@ngrx/store';


export enum ArticuloActionTypes {
  CREAR = '[Articulo] Crear articulo',
  ELIMINAR = '[Articulo] Eliminar articulo',
  CAMBIAR_STOCK = '[Articulo] Cambiar stock articulo',
  LISTA_ARTICULOS = '[Articulo] Lista articulos'
}

export class CrearArticulo implements Action {
  readonly type = ArticuloActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarArticulo implements Action {
  readonly type = ArticuloActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class StockArticulo implements Action {
  readonly type = ArticuloActionTypes.CAMBIAR_STOCK;
  constructor(public payload: any) {}
}

export class ListaArticulo implements Action {
  readonly type = ArticuloActionTypes.LISTA_ARTICULOS;
  constructor(public payload: any) {}
}

export type ArticuloActions =
  | CrearArticulo
  | EliminarArticulo
  | StockArticulo
  | ListaArticulo;

