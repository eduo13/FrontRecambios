import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { GestionPedidosService } from '../../gestion-pedidos/gestion-pedidos.service';
import { GestionArticuloService } from '../../gestion-articulo/gestion-articulo.service';
import { CargaArticulos } from '../../gestion-articulo/redux/store/articulo.actions';
import { CargaPedidos } from '../../gestion-pedidos/redux/store/pedido.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  admin = false;
  gestor = false;
  operador = false;

  constructor(private store: Store<AppState>,
              private gestionPedidosService: GestionPedidosService,
              private gestionArticleService: GestionArticuloService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.admin = (this.user.IdPerfil === 1) ? true : false;
    this.gestor = (this.user.IdPerfil === 2) ? true : false;
    this.operador = (this.user.IdPerfil === 3) ? true : false;
  }

  ngOnInit(): void {
    console.log(" perfil user logado = "+this.user.IdPerfil);

    this.gestionArticleService.getArticulos().subscribe(data => {
      this.store.dispatch(new CargaArticulos({lista: data}));
    })
    this.gestionPedidosService.getPedidos().subscribe(data => {
      this.store.dispatch(new CargaPedidos({lista: data}));
    })
  }
}