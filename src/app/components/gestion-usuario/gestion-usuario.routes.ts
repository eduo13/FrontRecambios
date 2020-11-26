import { GestionUsuarioComponent } from './gestion-usuario.component';
import { Routes, RouterModule } from '@angular/router';


const GESTION_USUARIO_ROUTES: Routes = [
    { path: '', component: GestionUsuarioComponent},
    
];

export const GESTION_USUARIO_ROUTING = RouterModule.forChild(GESTION_USUARIO_ROUTES);