import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.dev';
import { JwtService } from '../../auth/services/jwt.service';
import { Ejercicios } from 'src/app/data/interfaces/Ejercicio.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  private httpOptions = new HttpHeaders({
    Authorization: this.jwt.getToken()
  })

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { }

  /**
   * Metodo para obtener el listado de las partes del cuerpo.
   * @returns un observable con la lista de las partes del cuerpo a entrenar para un ejercicio.
   */
  public getPartOfBody(){
    return this.http.get(`${environment.dev}partesCuerpo`, {headers: this.httpOptions})
  }

  /**
   * Metodo para obtener la lista de los musculos que se van entrenar.
   * @returns un observable con la lista de los musculos objetivo para un ejercicio
   */
  public getObjectivesMuscles(){
    return this.http.get(`${environment.dev}musculoObjetivo`, {headers: this.httpOptions})
  }

  public createExercise(ejercicio: any){
    return this.http.post(`${environment.dev}ejercicio`,ejercicio, {headers: this.httpOptions})
  }

  public editExercise(ejercicio:any, id:number){
    return this.http.put(`${environment.dev}ejercicio/${id}`,ejercicio, {headers: this.httpOptions})
  }

  public listExercises(){
    return this.http.get(`${environment.dev}ejercicio`, {headers: this.httpOptions})
  }

  public listExercisesById(id:number):Observable<Ejercicios>{
    return this.http.get<Ejercicios>(`${environment.dev}ejercicio/${id}`, {headers: this.httpOptions})
  }

  public delete(id:number){
    return this.http.delete(`${environment.dev}ejercicio/${id}`, {headers: this.httpOptions})
  }
}
