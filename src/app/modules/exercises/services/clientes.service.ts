import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.dev';
import { JwtService } from '../../auth/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private httpOptions = new HttpHeaders({
    Authorization: this.jwt.getToken()
  })

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { }

  public listClientes(){
    return this.http.get(`${environment.dev}clientes`, {headers: this.httpOptions})
  }

  public registerCliente(cliente: any){
    return this.http.post(`${environment.dev}clientes`,cliente, {headers: this.httpOptions});
  }
}
