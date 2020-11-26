//Rutas
import { ENCRYPT_ROUTING } from './encrypt-get.routes';

//@Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EncryptGetComponent } from './encrypt-get.component';

@NgModule({
  declarations: [
    EncryptGetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ENCRYPT_ROUTING
  ]
})
export class EncryptGetModule { }
