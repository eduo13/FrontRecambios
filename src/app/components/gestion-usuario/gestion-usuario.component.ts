import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GestionUsuarioService } from './gestion-usuario.service';
import { AppState } from '../../app.reducer';
import { CargaUsers } from './redux/store/usuario.actions';


@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {

  constructor(private gestionUsuario: GestionUsuarioService, private store: Store<AppState>) { }

  ngOnInit(): void {
    //noos subscribimos a la lista de usuarios y la cargamos en el store
    this.gestionUsuario.getUsers().subscribe(listaUsers => {
      this.store.dispatch(new CargaUsers({lista: listaUsers}));
    })
  }

}
