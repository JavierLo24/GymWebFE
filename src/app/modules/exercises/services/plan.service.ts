import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient
  ) { }

  public list(){
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem("jwtToken")!
    })
    return this.http.get(`${environment.dev}clientes`,{headers})
  }
}
