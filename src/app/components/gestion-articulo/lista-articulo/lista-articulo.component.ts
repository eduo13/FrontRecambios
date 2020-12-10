import { GestionArticuloService } from './../gestion-articulo.service';
import { ArticuloModelo } from '../models/ArticuloModelo';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { EliminarArticulo } from '../redux/store/articulo.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-articulo',
  templateUrl: './lista-articulo.component.html',
  styleUrls: ['./lista-articulo.component.css']
})
export class ListaArticuloComponent implements OnInit {

  articulos: ArticuloModelo[];
  resultado: any;

  constructor(public gestionArticuloService:GestionArticuloService,
              private store: Store<AppState>,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    //this.gestionArticuloService.getArticleList();
/*     this.gestionArticuloService.getArticulos().subscribe(articulos => {
      this.articulos = articulos as ArticuloModelo[];
      console.log(this.articulos);
      this.store.dispatch(new ListaArticulo({lista: articulos}))
    }) */
    this.store.select('articulos').subscribe(listaArticulos => {
      this.articulos = listaArticulos.articulos
    })
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  delArt(id: number){
    if(confirm('¿Estás seguro de que quieres eliminar este articulo?')){
      this.gestionArticuloService.deleteArticle(id).subscribe(data => {
        this.resultado = data;
        if(data['Retcode'] === 0){
          // this.gestionArticuloService.getArticleList();
          // this.store.dispatch(new ListaArticulo({lista: this.gestionArticuloService.list}));
          this.toastr.success("Articulo con id: "+data['Id_articulo']+" se ha eliminado correctamente")
          this.store.dispatch(new EliminarArticulo({id: id}));
        }else{
          this.toastr.error("No se ha podido eliminar el articulo con id: "+id)
        }
        this.reloadComponent();
      })
    }
  }

  editar(articulo){
    this.gestionArticuloService.actualizar(articulo);
  }
}
