import { GestionPedidosService } from './gestion-pedidos.service';
import { PedidoModelo } from './models/PedidoModelo';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { GestionArticuloService } from '../gestion-articulo/gestion-articulo.service';
import { ArticuloModelo } from '../gestion-articulo/models/ArticuloModelo';
import { ArticuloEnLista } from './models/ArticuloEnLista';
import { CrearPedido } from './redux/store/pedido.actions';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
})
export class GestionPedidosComponent implements OnInit {

  forma: FormGroup;
  resultado: any;
  articulosObj: [ArticuloModelo];
  listaArticulos: ArticuloEnLista[] = [];
  articles: ArticuloModelo[];

  constructor(private fb: FormBuilder,
              public gestionPedidosService: GestionPedidosService,
              public gestionArticuloService: GestionArticuloService,
              private store: Store<AppState>,
              private toastr: ToastrService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    //this.gestionArticuloService.getArticleList();
    //   this.gestionArticuloService.getArticulos().subscribe(articulos => {
    //   this.articles = articulos as ArticuloModelo[];
    //   console.log(this.articles);
    //   this.store.dispatch(new ListaArticulo({lista: articulos}))
    // })
    this.store.select('articulos').subscribe(listaArticulos => {
      this.articles = listaArticulos.articulos
    })
  }

  //Validators
  get articulos(){
    return this.forma.get('articulos') as FormArray;
  }
  get contactoNoValido(){
    return this.forma.get('contacto').invalid && this.forma.get('contacto').touched;
  }
  get calleNoValido(){
    return this.forma.get('calle').invalid && this.forma.get('calle').touched;
  }
  get provinciaNoValido(){
    return this.forma.get('provincia').invalid && this.forma.get('provincia').touched;
  }
  get poblacionNoValido(){
    return this.forma.get('poblacion').invalid && this.forma.get('poblacion').touched;
  }
  get codigopostalNoValido(){
    return this.forma.get('codigopostal').invalid && this.forma.get('codigopostal').touched;
  }
  get numeroNoValido(){
    return this.forma.get('numero').invalid && this.forma.get('numero').touched;
  }
  get telefonoNoValido(){
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched;
  }
   get cantidadNoValido(){
     return this.forma.get('cantidad').invalid && this.forma.get('cantidad').touched;
  }

  crearFormulario(){
      this.forma = this.fb.group({
      contacto     : ['', Validators.required],
      calle        : ['', Validators.required],
      provincia    : ['', Validators.required],
      poblacion    : ['', Validators.required],
      codigopostal : ['', Validators.required],
      numero       : ['', Validators.required],
      telefono     : ['', Validators.required],
      selectArticulo: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }


  agregarArticulo(){

    var idynombre = this.forma.get('selectArticulo').value.split('-');
    this.listaArticulos.push({ID_Articulo: idynombre[0], Nombre: idynombre[1], Cantidad: this.forma.get('cantidad').value, Estado: ""});
  }

  crear(){

    //console.log(this.listaArticulos);

    //Control de validación del formulario
    if(this.forma.invalid){
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
    const pedidoData: PedidoModelo = {
      PersonaContacto: this.forma.get('contacto').value,
      Calle: this.forma.get('calle').value,
      Provincia: this.forma.get('provincia').value,
      Poblacion: this.forma.get('poblacion').value,
      CodigoPostal: this.forma.get('codigopostal').value,
      Numero: this.forma.get('numero').value,
      Telefono: this.forma.get('telefono').value,
      Articulos: this.listaArticulos
    }


    console.log("pedidoData = " + pedidoData.Articulos[0].Nombre);
    //Llamamos al servicio que agrega el pedido
    this.gestionPedidosService.crearPedido(pedidoData).subscribe(data => {
      this.resultado = data;
      console.log(data);
      if(data['Retcode'] === 0 && data['ID_Pedido'] > 0){//si pedido creado correctamente
        //añadimos id y estado a los datos que iran al store
        pedidoData.ID_Pedido = data['ID_Pedido'];
        pedidoData.Estado = data['Estado'];
        this.store.dispatch(new CrearPedido(pedidoData));

        this.toastr.success("Pedido creado correctamente");
      }else{
        this.toastr.error("Error al crear el pedido");
      }
      this.forma.reset();
    })

  }
}
