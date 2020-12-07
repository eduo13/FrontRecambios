import { Action, createAction, props } from '@ngrx/store';


export enum ArticuloActionTypes {
  CREAR = '[Articulo] Crear articulo',
  ELIMINAR = '[Articulo] Eliminar articulo',
  EDITAR = '[Articulo] Editar articulo',
  CAMBIAR_STOCK = '[Articulo] Cambiar stock articulo',
  CARGA_ARTICULOS = '[Articulo] Cargar articulos',
  VER_ARTICULOS = '[Articulo] Ver articulos'
}

export class CrearArticulo implements Action {
  readonly type = ArticuloActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarArticulo implements Action {
  readonly type = ArticuloActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarArticulo implements Action {
  readonly type = ArticuloActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class StockArticulo implements Action {
  readonly type = ArticuloActionTypes.CAMBIAR_STOCK;
  constructor(public payload: any) {}
}

export class CargaArticulos implements Action {
  readonly type = ArticuloActionTypes.CARGA_ARTICULOS;
  constructor(public payload: any) {}
}

export class VerArticulos implements Action {
  readonly type = ArticuloActionTypes.VER_ARTICULOS;
  constructor() {}
}

export type ArticuloActions =
  | CrearArticulo
  | EditarArticulo
  | EliminarArticulo
  | StockArticulo
  | CargaArticulos
  | VerArticulos;

