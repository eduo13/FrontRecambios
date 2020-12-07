import { GestionArticuloService } from './../gestion-articulo.service';
import { Component, OnInit } from '@angular/core';
import { ArticuloModelo } from '../models/ArticuloModelo';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';

@Component({
  selector: 'app-card-articulo',
  templateUrl: './card-articulo.component.html',
  styleUrls: ['./card-articulo.component.css']
})
export class CardArticuloComponent implements OnInit {

  articulos: ArticuloModelo[];

  constructor(public gestionArticuloService: GestionArticuloService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    //this.gestionArticuloService.getArticleList();
/*       this.gestionArticuloService.getArticulos().subscribe(articulos => {
      this.articulos = articulos as ArticuloModelo[];
      console.log(this.articulos);
    }) */
    this.store.select('articulos').subscribe(listaArticulos => {
      this.articulos = listaArticulos.articulos
    })
  }

}
