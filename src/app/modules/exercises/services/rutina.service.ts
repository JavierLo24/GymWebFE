import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.dev';
import { JwtService } from '../../auth/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  
  private httpOptions = new HttpHeaders({
    Authorization: this.jwt.getToken()
  })
  
  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { }

  public crearRutina(rutina: any){
    return this.http.post(`${environment.dev}rutina`, rutina, {headers: this.httpOptions})
  }

  public listarRutinas(){
    return this.http.get(`${environment.dev}rutina`, {headers: this.httpOptions})
  }
}
