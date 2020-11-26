import { Routes, RouterModule } from '@angular/router';
import { GestionPedidosComponent } from './gestion-pedidos.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';


const GESTION_PEDIDOS_ROUTES: Routes = [
    { path: '', component: GestionPedidosComponent},
    { path: 'listadoPedidos', component: ListaPedidosComponent},

];

export const GESTION_PEDIDOS_ROUTING = RouterModule.forChild(GESTION_PEDIDOS_ROUTES);
