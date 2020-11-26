import { EncryptGetService } from './ecrypt-get.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-encrypt-get',
  templateUrl: './encrypt-get.component.html',
})
export class EncryptGetComponent implements OnInit {

  form: FormGroup;
  resultado: any;
  datoEnviado: string;
  datoEncriptado: string;

  constructor(private fb:FormBuilder, private encryptGetService:EncryptGetService) {
    this.form = this.fb.group({
      dato: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  /*
    INSTALACIÓN NECESARIA
      npm install crypto-js
      npm install @types/crypto-js
  */
  encriptar(dato:string){
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(dato), key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  transformarCaracteres(datoEncriptado):string{
    var nuevaCadena = "";
    for (var i = 0; i < datoEncriptado.length; i++) {
      var temp = datoEncriptado.charAt(i);
      switch(temp){
        case "+":
          temp = "_";
          break;
        case "=":
          temp = "|";
          break;
        case "/":
          temp = "`";
          break;
      }
      nuevaCadena += temp;
    }
    return nuevaCadena;
  }

  enviar(){

    const dato = this.form.get('dato').value;
    this.datoEnviado = dato;
    console.log(dato)

    var datoEncriptado = this.encriptar(dato);
    this.datoEncriptado = datoEncriptado;
    console.log(datoEncriptado);

    var datoSaneado = this.transformarCaracteres(datoEncriptado);
    console.log(datoSaneado);

    this.encryptGetService.enviarAlBack(datoSaneado).subscribe(data => {
      this.resultado = data;
    })
  }

}
