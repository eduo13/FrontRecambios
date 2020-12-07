import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GestionArticuloService } from './gestion-articulo.service';
import { AppState } from '../../app.reducer';
import { CargaArticulos } from './redux/store/articulo.actions';

@Component({
  selector: 'app-gestion-articulo',
  templateUrl: './gestion-articulo.component.html',
  styleUrls: ['./gestion-articulo.component.css']
})
export class GestionArticuloComponent implements OnInit {

  constructor(private gestionArticleService: GestionArticuloService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
      this.gestionArticleService.getArticulos().subscribe(data => {
      this.store.dispatch(new CargaArticulos({lista: data}));
    })
  }

}
