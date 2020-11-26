import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../../app.reducer';
import { GestionPedidosService } from '../../gestion-pedidos/gestion-pedidos.service';
import { Perfil } from '../../login/models/Perfil';
import { GestionArticuloService } from '../../gestion-articulo/gestion-articulo.service';
import { ListaArticulo } from '../../gestion-articulo/redux/store/articulo.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private authservice: AuthService,
              private store: Store<AppState>,
              private gestionPedidosService: GestionPedidosService,
              private gestionArticleService: GestionArticuloService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    //console.log(" user = "+this.user.IdPerfil);
    //if(this.user.IdPerfil === 1){
    this.gestionArticleService.getArticulos().subscribe(data => {
      this.store.dispatch(new ListaArticulo({lista: data}));
    })
    //}
  }
}
