import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Planes } from 'src/app/data/interfaces/Planes.interface';
import { environment } from 'src/app/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PlanService {


  constructor(
    private http: HttpClient
  ) { }

/**
   * Método para listar a todos los usuarios PERSONAL/AUXILIARES mediante el endpoint del backend
   * Solo permitido para los administradores
   *
   * @params
   * @return la lista de los usuarios AUXILIAR
   */
public listPlanes(): Observable<Planes[]> {
  // Url del back por get para listar encargados
  const url = `${environment.dev}plan`;
  // Autorización como ADMIN del token para ejecutar el método
  const httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiaWRVc2VyIjoxLCJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2ODYyNDI5NjIsImV4cCI6MTY4NjMyOTM2Mn0.6gTKEgvNDyEZa7tl8hiGcQVhFboacC7B6OZMMWYxl1S5KiYL_dWh0AJi5JOPYfZskFCMj_BitxvtfzNytf1HTg",
    }),
  };
  return this.http.get<Planes[]>(url, httpOptions);
}



}
