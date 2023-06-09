import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';
import { JwtService } from '../../auth/services/jwt.service';
import { Usuario } from 'src/app/data/interfaces/Usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(
    private http: HttpClient,
    private readonly jwt: JwtService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.jwt.getToken(),
    }),
  };


  /**
   * Método para listar a todos los entrenadores mediante el endpoint del backend
   * Solo permitido para los administradores
   *
   * @params
   * @return la lista de con los entrenadores
   */
public listTrainers(): Observable<Usuario[]> {
  const url = `${environment.dev}usuario/listar?rol=ROLE_ENTRENADOR`;
  return this.http.get<Usuario[]>(url, this.httpOptions);
}

/**
   * Método para borrar al usuario ENTRENADOR mediante el endpoint del backend
   * Solo permitido para los administradores
   *
   * @params email del usuario ENTRENADOR a eliminar
   * @return
   */
public deleteTrainers(email: string): Observable<Usuario[]> {
  const url = `${environment.dev}usuario/eliminar?email=${email}`;
  return this.http.delete<Usuario[]>(url, this.httpOptions);
}

/**
   * Método para registrar a un usuario ENTRENADOR mediante el endpoint del backend
   * Solo permitido para los administradores
   *
   * @params Correo y contraseña del usuario ENTRENADOR a registrar y la autorización de administrador
   * @return
   */
public registerTrainer(nombre: string, correo: string, contrasena: string): Observable<Usuario> {
  const url = `${environment.dev}usuario/entrenador`;
  return this.http.post<Usuario>(
    url,
    {
      nombre,
      correo,
      contrasena,
    },
    this.httpOptions
  );
}

}
