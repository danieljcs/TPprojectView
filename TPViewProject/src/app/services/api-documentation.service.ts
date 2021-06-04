import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {  map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiDocumentationService {

  public host = 'https://localhost:44389/api/';

  constructor(private http: HttpClient) { }

  GetIdentificationType(): Observable<any> {
    try{
      return this.http.get(`${this.host}Main/GetIdentificationTypes`);
    }catch{
      return Observable.create(observer =>{
        observer.next({'error': true, 'message':'errror en la api'})
        observer.complete()})
    }
  }
  GetDocumentationData(identification): Observable<any> {
    try{
      return this.http.get(`${this.host}Main/GetDocumentation?identification=${identification}`);
    }catch{
      return Observable.create(observer =>{
        observer.next({'error': true, 'message':'errror en la api'})
        observer.complete()})
    }
  }
  CreateModifyDocumentation(data): Observable<any> {
    try{
      return this.http.post(`${this.host}Main/RegisterModify`, data);
    }catch{
      return Observable.create(observer =>{
        observer.next({'error': true, 'message':'errror en la api'})
        observer.complete()})
    }
  }

}
