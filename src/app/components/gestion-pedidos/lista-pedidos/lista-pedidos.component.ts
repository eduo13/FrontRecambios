import { GestionPedidosService } from './../gestion-pedidos.service';
import { PedidoModelo } from '../models/PedidoModelo';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { EliminarPedido, ListaPedido } from '../redux/store/pedido.actions';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html'
})
export class ListaPedidosComponent implements OnInit {

  pedidos: PedidoModelo[];
  resultado: any;

constructor(public gestionPedidosService:GestionPedidosService,
            private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionPedidosService.getPedidosList();
    this.gestionPedidosService.recuperaPedidos().subscribe(pedidos => {
      this.pedidos = pedidos as PedidoModelo[];
      this.store.dispatch(new ListaPedido({lista: this.pedidos}));
    });
  }

  delPedido(id: number){
    if(confirm('¿Estás seguro de que quieres cancelar el pedido?')){
      console.log("pedido a eliminar "+id);
      this.gestionPedidosService.deletePedido(id).subscribe(data => {
        this.resultado = data;
        this.gestionPedidosService.getPedidosList();
        this.store.dispatch(new EliminarPedido({id: id}));
      })
    }
  }
}
