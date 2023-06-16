import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Planes } from 'src/app/data/interfaces/Planes.interface';
import { environment } from 'src/app/environments/environment.dev';
import { JwtService } from '../../auth/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.jwt.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private readonly jwt: JwtService
  ) { }

/**
   * Método para listar a todos los planes mediante el endpoint del backend
   * Solo permitido para los administradores
   *
   * @params
   * @return la lista de los planes
   */
public listPlanes(): Observable<Planes[]> {
  const url = `${environment.dev}plan`;
  return this.http.get<Planes[]>(url, this.httpOptions);
}

/**
   * Método para editar el plan del gimnasio mediante el endpoint del backend
   * Solo permitido para los administradores
   *
   * @params id del plan como parámetro y nombre, descripcion y precio como JSON
   * @return
   */
public editPlan(id:number, nombre: string, descripcion: string, precio: number): Observable<Planes> {
const url = `${environment.dev}plan?planId=${id}`;
  return this.http.put<Planes>(url, {nombre, descripcion, precio}, this.httpOptions);
}


}
