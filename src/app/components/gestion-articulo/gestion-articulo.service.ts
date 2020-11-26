import { ArticuloModelo } from './models/ArticuloModelo';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ArticuloState } from './redux/store/articulo.reducer';

@Injectable({
  providedIn: 'root'
})
export class GestionArticuloService {

  private createUrl = "http://localhost:44303/api/articulos/createArticle";
  private listUrl = "http://localhost:44303/api/articulos/listArticle";
  private deleteUrl = "http://localhost:44303/api/articulos/deleteArticle";
  private updateUrl = "http://localhost:44303/api/articulos/updateArticle";
  private stockUrl = "http://localhost:44303/api/articulos/addStock";
  private quitaStockUrl = "http://localhost:44303/api/articulos/quitaStock";
  private getStockUrl = "http://localhost:44303/api/articulos/getStock";
  private updateEstadoArticuloUrl = "http://localhost:44303/api/articulos/updateArticuloPedido";

  list: ArticuloModelo[];
  private actualizarFormulario = new BehaviorSubject<ArticuloModelo>({} as any);

  constructor(private http: HttpClient, private store: Store<ArticuloState>) { }

  //CREAR ARTICULO
  crearArticulo(articleData: ArticuloModelo): Observable<ArticuloModelo>{
    return this.http.post<ArticuloModelo>(this.createUrl, articleData);
  }

  //LISTAR ARTICULOS
  getArticleList(){
    this.http.get<ArticuloModelo[]>(this.listUrl).toPromise().then(data => {
      this.list = data as ArticuloModelo[]
    });
  }

  getArticulos(){
    return this.http.get<ArticuloModelo[]>(this.listUrl);
  }

  //BORRAR ARTICULO
  deleteArticle(id: number): Observable<ArticuloModelo>{
    const articleID = {
      ID_Articulo: id
    };
    return this.http.post<ArticuloModelo>(this.deleteUrl, articleID);
  }

  //ACTUALIZAR ARTICULO
  updateArticle(art:ArticuloModelo): Observable<ArticuloModelo>{
    return this.http.post<ArticuloModelo>(this.updateUrl, art);
  }

  updateEstadoArticulo(datos: any): Observable<any>{
    return this.http.post(this.updateEstadoArticuloUrl, datos);
  }

  //AÑADIR STOCK
  getStock(articulo: object): Observable<object>{
    return this.http.post<object>(this.getStockUrl, articulo);
  }

  //AÑADIR STOCK
  addStock(stock: object): Observable<object>{
    return this.http.post<object>(this.stockUrl, stock);
  }

  //AÑADIR STOCK
  quitaStock(stock: object): Observable<object>{
    return this.http.post<object>(this.quitaStockUrl, stock);
  }

  //Actualizar Form
  actualizar(articulo){
    this.actualizarFormulario.next(articulo);
  }
  obtenerArticulo$(): Observable<ArticuloModelo>{
    return this.actualizarFormulario.asObservable();
  }
}

