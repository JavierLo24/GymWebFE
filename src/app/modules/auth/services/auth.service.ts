import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any | null>(null);

  constructor(
    private http: HttpClient,
    private _router: Router,
    private readonly jwtService: JwtService
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
        this.jwtService.saveToken(res.headers.get('Authorization')!);
      })
    )
  }

  /**
   * Método para cerrar sesion del usuario.
   */
  public logout() {
    this.purgeAuth();
    this._router.navigate(['/auth/sign-in']);
  }

   /**
   * Método para destruir el token del usuario
   */
   public purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
