// import { loadingReducer, LoadingState } from "./shared/componentes/loading/store/loading.reducer";
import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from "@ngrx/store";
import { loginReducer, LoginState } from './components/login/redux/store/login.reducer';
import { localStorageSync, LocalStorageConfig } from "ngrx-store-localstorage";
import { userReducer, UserState } from './components/gestion-usuario/redux/store/usuario.reducer';
import { ArticuloState, articuloReducer } from './components/gestion-articulo/redux/store/articulo.reducer';
import { PedidoState, pedidoReducer } from './components/gestion-pedidos/redux/store/pedido.reducer';


export interface AppState {

  //loading: LoadingState;
  login: LoginState,
  users: UserState,
  articulos: ArticuloState,
  pedidos: PedidoState
}

export const appReducers: ActionReducerMap<any> = {
  //loading: loadingReducer,
  login: loginReducer,
  users: userReducer,
  articulos: articuloReducer,
  pedidos: pedidoReducer
};

export const selectLoginState = createFeatureSelector<AppState>('login');

export function persitsData(reducer: ActionReducer<any>): ActionReducer<any> {
  const config: LocalStorageConfig = {
    keys: [
//      {'loading': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'login': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'users': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'articulos': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'pedidos': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
    ],
    rehydrate: true,
    removeOnUndefined: true,
    storage: sessionStorage
  };
  return localStorageSync(config)(reducer);
}


export const metaReducers: MetaReducer<any, Action>[] = [persitsData];

export const arrEffect: any[] = [];
