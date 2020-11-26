//import { Action } from '@ngrx/store';

import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/UserModel';


  export const CREAR = createAction(
    '[User] Crear User',
    props<UserModel>());

  export const EDITAR = createAction(
    '[User] Editar User',
    props<{id_usuario: number, id_perfil: number, usuario: string, email: string}>());

  export const ELIMINAR = createAction(
    '[User] Eliminar User',
    props<{id: number}>());
