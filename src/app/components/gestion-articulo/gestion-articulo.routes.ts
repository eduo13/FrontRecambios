import { CardArticuloComponent } from './card-articulo/card-articulo.component';
import { Routes, RouterModule } from '@angular/router';
import { GestionArticuloComponent } from './gestion-articulo.component';
import { AddStockComponent } from './add-stock/add-stock.component';


const GESTION_ARTICULO_ROUTES: Routes = [
    { path: '', component: GestionArticuloComponent},
    { path: 'listadoArticulo', component: CardArticuloComponent},
    { path: 'addstock', component: AddStockComponent},

];

export const GESTION_ARTICULO_ROUTING = RouterModule.forChild(GESTION_ARTICULO_ROUTES);
