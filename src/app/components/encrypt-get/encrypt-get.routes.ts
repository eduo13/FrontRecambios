import { Routes, RouterModule } from '@angular/router';
import { EncryptGetComponent } from './encrypt-get.component';


const ENCRYPT_ROUTES: Routes = [
    { path: '', component: EncryptGetComponent },
];

export const ENCRYPT_ROUTING = RouterModule.forChild(ENCRYPT_ROUTES);