import { GestionPedidosService } from './../gestion-pedidos.service';
import { PedidoModelo } from '../models/PedidoModelo';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { EliminarPedido } from '../redux/store/pedido.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html'
})
export class ListaPedidosComponent implements OnInit {

  pedidos: PedidoModelo[];
  resultado: any;

constructor(private gestionPedidosService:GestionPedidosService,
            private store: Store<AppState>,
            private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.gestionPedidosService.getPedidosList();
/*     this.gestionPedidosService.getPedidos().subscribe(pedidos => {
      this.pedidos = pedidos as PedidoModelo[];
      console.log("los pedidos ......." + this.pedidos);
      this.store.dispatch(new ListaPedido({lista: this.pedidos}));
    }); */
    this.store.select('pedidos').subscribe(listaPedidos => {
      this.pedidos = listaPedidos.pedidos
    })
  }

  delPedido(id: number){
    if(confirm('¿Estás seguro de que quieres cancelar el pedido?')){
      console.log("pedido a eliminar "+id);
      this.gestionPedidosService.deletePedido(id).subscribe(data => {
        console.log(data);
        this.resultado = data;
        if(data['Retcode'] === 0){
        //this.gestionPedidosService.getPedidosList();
        this.store.dispatch(new EliminarPedido({id: id}));
        this.toastr.success("El pedido se ha eliminado correctamente");
        }else{
          this.toastr.error("Error al eliminar el pedido");
        }

      })
    }
  }
}
