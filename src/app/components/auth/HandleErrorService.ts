import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})

export class HandleErrorService {
  constructor(private toastr: ToastrService, private router: Router) {}

  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // Error en la parte cliente
      errorMessage = `Se ha encontrado el siguiente error: ${err.error.message}`;
    } else {
      // Error en el backend.
      errorMessage = "No se recibe respuesta del servidor ";
    }
    this.toastr.error(errorMessage);
  }

}
