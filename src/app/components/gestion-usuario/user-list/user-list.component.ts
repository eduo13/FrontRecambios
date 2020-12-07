import { Component, OnInit } from '@angular/core';
import { GestionUsuarioService } from '../gestion-usuario.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { EliminarUser } from '../redux/store/usuario.actions';
import { UserModel } from '../models/UserModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  resultado:any;
  users: UserModel[];

  constructor(private gestionUsuarioService: GestionUsuarioService,
              private store: Store<AppState>,
              private router: Router,
              private toastr: ToastrService) {

      this.store.select('users').subscribe(listaUsers => {
      this.users = listaUsers.users
    })
  }

  ngOnInit(): void {

  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  delUser(id: number){
    if(confirm('¿Estás seguro de que quieres eliminar este usuario?')){
      this.gestionUsuarioService.deleteUser(id).subscribe(data => {
        this.resultado = data;
        if(data['Retcode'] === 0){
        this.store.dispatch(new EliminarUser({id: id}));
        this.toastr.success("Usuario eliminado correctamente");

        //this.gestionUsuarioService.getUsersList();
        }else{
          this.toastr.error("No se ha podido eliminar el usuario con id: "+id);
        }
        this.reloadComponent();
      });

    }
  }

  editar(usuario){
    this.gestionUsuarioService.actualizar(usuario);
  }
}
