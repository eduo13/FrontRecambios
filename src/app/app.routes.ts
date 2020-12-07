import { HomeComponent } from './components/shared/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthServiceCanloadGuard } from './components/auth/auth-service-canload.guard';
import { AuthServiceCanActivateGuard } from './components/auth/auth-service-canactivate.guard';
import { Perfil } from './components/login/models/Perfil';


const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent,
     canActivate: [AuthServiceCanActivateGuard],
    },
    { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },

    { path: 'gestionUsuario',
     loadChildren: () => import('./components/gestion-usuario/gestion-usuario.module').then(m => m.GestionUsuarioModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.Admin] } },

    { path: 'gestionArticulo',
     loadChildren: () => import('./components/gestion-articulo/gestion-articulo.module').then(m => m.GestionArticuloModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     data: { perfiles: [Perfil.Admin] } },

    { path: 'gestionPedido',
     loadChildren: () => import('./components/gestion-pedidos/gestion-pedidos.module').then(m => m.GestionPedidosModule),
    // canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
    },

    { path: 'gestionStock',
     loadChildren: () => import('./components/gestion-stock/gestion-stock.module').then(m => m.GestionStockModule),
     canLoad: [AuthServiceCanloadGuard],
     canActivate: [AuthServiceCanActivateGuard],
     },

    { path: 'encryptGet', loadChildren: () => import('./components/encrypt-get/encrypt-get.module').then(m => m.EncryptGetModule) },

    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
