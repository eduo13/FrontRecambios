//Rutas
import { GESTION_PEDIDOS_ROUTING } from './gestion-pedidos.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { GestionPedidosComponent } from './gestion-pedidos.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

@NgModule({
  declarations: [
    GestionPedidosComponent,
    ListaPedidosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GESTION_PEDIDOS_ROUTING
  ],
  providers: [

  ]
})
export class GestionPedidosModule { }
