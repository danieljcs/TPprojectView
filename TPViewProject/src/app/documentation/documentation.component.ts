import { Directive ,HostListener,Input, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TPDocumentation } from '../models/TPDocumentation';
import { ApiDocumentationService } from '../services/api-documentation.service';



@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private serviceDoc: ApiDocumentationService,
    private modalService: NgbModal) {}

  @ViewChild('ConsultaDoc', { static: true}) ConsultaDoc: ElementRef | undefined;
  @ViewChild('CrearDoc', { static: true}) CrearDoc: ElementRef | undefined;
  formDocumentation: FormGroup;
  list_id_type: any;
  nit_form: any;
  data_documentation: TPDocumentation;

  ngOnInit(): void {
    this.createFormDocumentation();
    this.loadParams();
  }

  loadParams() {
    this.serviceDoc.GetIdentificationType().subscribe( res => {
      this.list_id_type = res.data;
    },err => Swal.fire('error', 'code: 500 mensaje: Error metodo principal').then((result) => {}) );
  }

  searchNIT(nit){
    this.serviceDoc.GetDocumentationData(nit).subscribe( res => {
      console.log(res.data)
      if(res.error==false){
        this.data_documentation = res.data;
        if (res.data == null){
          this.formDocumentation.controls['IdentificationNumber'].setValue(this.nit_form);
          this.formDocumentation.controls['Id'].setValue(0);
          this.abrirModal(this.ConsultaDoc,'lg')
        }else{
          this.formDocumentation.controls['Id'].setValue(res.data.id);
          this.formDocumentation.controls['IdentificationTypeId'].setValue(res.data.identificationTypeId)
          this.formDocumentation.controls['IdentificationNumber'].setValue(res.data.identificationNumber)
          this.formDocumentation.controls['CompanyName'].setValue(res.data.companyName)
          this.formDocumentation.controls['FirstName'].setValue(res.data.firstName)
          this.formDocumentation.controls['SecondName'].setValue(res.data.secondName)
          this.formDocumentation.controls['FirstLastName'].setValue(res.data.firstLastName)
          this.formDocumentation.controls['SecondLastName'].setValue(res.data.secondLastName)
          this.formDocumentation.controls['Email'].setValue(res.data.email)
          this.formDocumentation.controls['CheckMessagesCell'].setValue(res.data.checkMessagesCell)
          this.formDocumentation.controls['CheckMessagesEmail'].setValue(res.data.checkMessagesEmail)
          this.abrirModal(this.CrearDoc,'lg')
        }
      }else{
        Swal.fire('error', 'code: '+res.code +'mensaje: '+res.message).then((result) => {});
      }
    },err => Swal.fire('error', 'code: 500 mensaje: Error metodo principal').then((result) => {}) );
  }

  public fieldIsValid(field: string) {
    return this.formDocumentation.controls[field].errors && this.formDocumentation.controls[field].touched && this.formDocumentation.controls[field].dirty && this.formDocumentation.controls[field].invalid;
  }

  createModifyDoc(){
    this.serviceDoc.CreateModifyDocumentation(this.formDocumentation.value).subscribe( res => {
      this.data_documentation = res.data;
      if(res.error==false){
        Swal.fire('correcto', 'registro creado-editado correctamente').then((result) => {});
      }else{
        Swal.fire('error', 'code: '+res.code +'mensaje: '+res.message).then((result) => {});
      }
      delay(2000);
      location.reload();
    },err => Swal.fire('error', 'code: 500 mensaje: Error metodo principal').then((result) => {}));
  }

  abrirModal(modal:any, size:any){
    this.modalService.open(modal, { size: size });
  }

  cerrarModal(modal: any){
    this.modalService.dismissAll(modal);
  }

  permite(elEvento, permitidos) {
    // Variables que definen los caracteres permitidos
    var numeros = "0123456789";
    var caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var numeros_caracteres = numeros + caracteres;
    var teclas_especiales = [8, 37, 39, 46];
    // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha


    // Seleccionar los caracteres a partir del parámetro de la función
    switch(permitidos) {
      case 'num':
        permitidos = numeros;
        break;
      case 'car':
        permitidos = caracteres;
        break;
      case 'num_car':
        permitidos = numeros_caracteres;
        break;
    }

    // Obtener la tecla pulsada
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);

    // Comprobar si la tecla pulsada es alguna de las teclas especiales
    // (teclas de borrado y flechas horizontales)
    var tecla_especial = false;
    for(var i in teclas_especiales) {
      if(codigoCaracter == teclas_especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
    // o si es una tecla especial
    return permitidos.indexOf(caracter) != -1 || tecla_especial;
  }

  private createFormDocumentation(){
    this.formDocumentation = this.fb.group({
      Id: [''],
      IdentificationTypeId: ['',[Validators.required]],
      IdentificationNumber: ['',[Validators.required]],
      CompanyName: [''],
      FirstName: [''],
      SecondName: [''],
      FirstLastName: [''],
      SecondLastName: [''],
      Email: ['', [Validators.required, Validators.email ]],
      CheckMessagesCell: [false],
      CheckMessagesEmail: [false]
    });
  }

}
