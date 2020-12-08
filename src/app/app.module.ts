//Rutas
import { APP_ROUTING } from './app.routes';

//@Angular
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//@ngrx
import { appReducers, metaReducers } from './app.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/shared/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';

//Auth Guard
import { AuthServiceCanloadGuard } from './components/auth/auth-service-canload.guard';
import { AuthServiceCanActivateGuard } from './components/auth/auth-service-canactivate.guard';
import { TokenInterceptor } from './components/auth/token.interceptor';

//Servicios
import { GestionArticuloService } from './components/gestion-articulo/gestion-articulo.service';
import { GestionUsuarioService } from './components/gestion-usuario/gestion-usuario.service';
import { GestionPedidosService } from './components/gestion-pedidos/gestion-pedidos.service';

//Extras
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    APP_ROUTING,
    StoreModule.forRoot(appReducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthServiceCanloadGuard,
    AuthServiceCanActivateGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    GestionArticuloService,
    GestionUsuarioService,
    GestionPedidosService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
