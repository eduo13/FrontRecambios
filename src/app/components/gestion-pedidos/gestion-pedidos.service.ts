import { Observable } from 'rxjs';
import { PedidoModelo } from './models/PedidoModelo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionPedidosService {

  private createUrl = "http://localhost:44303/api/Pedidos/createPedido";
  private listUrl = "http://localhost:44303/api/Pedidos/listPedidos";
  private deleteUrl = "http://localhost:44303/api/pedidos/deletePedido";

  list:PedidoModelo[];

  constructor(private http: HttpClient) { }

  //CREAR PEDIDO
  crearPedido(pedidoData: PedidoModelo): Observable<PedidoModelo>{
    return this.http.post<PedidoModelo>(this.createUrl, pedidoData);
  }

  //LISTAR ARTICULOS
  getPedidosList(){
    this.http.get<PedidoModelo[]>(this.listUrl).toPromise().then(data => {
      this.list = data as PedidoModelo[],
      console.log(this.list)
      });
  }
    //LISTAR ARTICULOS
  recuperaPedidos(){
    return this.http.get<PedidoModelo[]>(this.listUrl);
  }

    //LISTAR ARTICULOS
  recuperaPedidosPendientes(){
    return this.http.get<PedidoModelo[]>(this.listUrl).pipe(
      map((pedidos: PedidoModelo[]) => pedidos.filter((pedido: PedidoModelo) => pedido.Estado == "PENDIENTE"))
    )
  }


  //CANCELAR PEDIDO
  deletePedido(id: number): Observable<PedidoModelo>{
    const ID_Pedido = {
      ID_Pedido: id
    };
    console.log("pedido a eliminar const "+ID_Pedido.ID_Pedido);
    return this.http.post<PedidoModelo>(this.deleteUrl, ID_Pedido);
  }

}
