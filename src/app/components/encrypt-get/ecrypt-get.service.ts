import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EncryptGetService {

  private url = "http://localhost:44303/api/articulos/encryptGet/";

  constructor( private http: HttpClient) { }

  enviarAlBack(dato){
    return this.http.get<string>(`${this.url}/${dato}`);
  }
}
