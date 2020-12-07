import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { GestionArticuloService } from '../gestion-articulo/gestion-articulo.service';
import { ArticuloModelo } from '../gestion-articulo/models/ArticuloModelo';
import { PedidoModelo } from '../gestion-pedidos/models/PedidoModelo';

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit {


  forma: FormGroup;
  resultado: any;
  suscription: Subscription;
  upArt: ArticuloModelo;
  idArticulo = 0;
  pedidos: PedidoModelo[] = [];
  articulos: ArticuloModelo[];

  constructor(private fb: FormBuilder,
              private gestionArticuloService: GestionArticuloService,
              private store: Store<AppState>) {
    this.forma = this.fb.group({ stock: [0] });
  }

  ngOnInit(): void {
    this.store.select('articulos').subscribe(listaArticulos => {
      this.articulos = listaArticulos.articulos
    })
    this.suscription = this.gestionArticuloService.obtenerArticulo$().subscribe(data =>{
      this.upArt = data;
      this.forma.patchValue({
        stock: 0
      });

      this.idArticulo = this.upArt.ID_Articulo;
    });
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  addStock(){

    //Control de validación del formulario
    if(this.idArticulo === 0){
      return Object.values(this.forma.controls).forEach( control =>{
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
        control.markAsTouched();
      });
    }

    //Cargar datos del formulario
    const stock = {
      ID_Articulo: this.idArticulo,
      Cantidad: this.forma.get('stock').value
    }

    var obser: Observable<PedidoModelo[]>;
     //Llamamos al servicio que agrega el articulo
    this.gestionArticuloService.addStock(stock).subscribe(data => {
      var stockActual = data['Stock'];
      console.log("el stock actual es = "+ data['Stock']);
      if(data['Retcode'] == 0){//si se ha actualizado el stock correctamente
        console.log("registro actualizado correctamente "+ data['Retcode']);
      }
      this.gestionArticuloService.getArticleList();
      this.forma.reset();
      this.idArticulo = 0;
    })
  }

}
