import { GestionArticuloService } from './../gestion-articulo.service';
import { ArticuloModelo } from '../models/ArticuloModelo';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { EliminarArticulo, ListaArticulo } from '../redux/store/articulo.actions';


@Component({
  selector: 'app-lista-articulo',
  templateUrl: './lista-articulo.component.html',
  styleUrls: ['./lista-articulo.component.css']
})
export class ListaArticuloComponent implements OnInit {

  articulos: ArticuloModelo[];
  resultado: any;

  constructor(public gestionArticuloService:GestionArticuloService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionArticuloService.getArticleList();
    this.gestionArticuloService.getArticulos().subscribe(data => {
      this.store.dispatch(new ListaArticulo({lista: data}))
    })
  }

  delArt(id: number){
    if(confirm('¿Estás seguro de que quieres eliminar este articulo?')){
      this.gestionArticuloService.deleteArticle(id).subscribe(data => {
        this.resultado = data;
        this.gestionArticuloService.getArticleList();
        this.store.dispatch(new ListaArticulo({lista: this.gestionArticuloService.list}));
        this.store.dispatch(new EliminarArticulo({id: id}));
      })
    }
  }

  editar(articulo){
    this.gestionArticuloService.actualizar(articulo);
  }
}
