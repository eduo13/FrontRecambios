import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionStockComponent } from './gestion-stock.component';
import { GESTION_STOCK_ROUTING } from './gestion-stock.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestionStockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GESTION_STOCK_ROUTING
  ]
})
export class GestionStockModule { }