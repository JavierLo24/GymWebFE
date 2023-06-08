import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(email: string, password: string): Observable<HttpResponse<any>> {
    const data = {
      email,
      password
    }

    const observeResponse: 'body' | 'events' | 'response' = 'response';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: observeResponse,
    };
    
    return this.http.post(`${environment.dev}login`, data, httpOptions).pipe(
      tap((res:any) => {
        console.log(res.headers.get('Authorization')!)
      })
    )
  }
}
