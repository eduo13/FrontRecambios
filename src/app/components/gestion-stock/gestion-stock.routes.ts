import { RouterModule, Routes } from '@angular/router';
import { GestionStockComponent } from './gestion-stock.component';

const GESTION_STOCK_ROUTES: Routes = [
    { path: '', component: GestionStockComponent},

];

export const GESTION_STOCK_ROUTING = RouterModule.forChild(GESTION_STOCK_ROUTES);