import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent{

  user: any;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authservice: AuthService) {
    this.authservice.user.subscribe(user => this.user = user);
  }

  permisos(permiso: number): boolean{
    if(this.user != null){
      switch(permiso){
        case 1://admin
          return (this.user.IdPerfil === 1);
        break;
        case 2://admin y gestor
          return (this.user.IdPerfil <= 2);
        break;
        case 3:
          return (this.user.IdPerfil <= 3);
        break;
        default:
          false;
      }
    }else{
      return false;
    }
  }

  logout(){
    this.authservice.logout();
  }
}
