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

  private isAuthenticated = false;

  public userEmail = '';

  public userToken = '';

  private currentUserSubject = new BehaviorSubject<any | null>(null);

  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private _router: Router,
    private readonly jwtService: JwtService
  ) {
    this.userToken = this.jwtService.getToken();
    if (this.userToken != undefined) {
      this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')!));
    }
  }

  public login(email: string, password: string): Observable<HttpResponse<any>> {
    const observeResponse: 'body' | 'events' | 'response' = 'response';

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: observeResponse,
    };
    
    return this.http.post(`${environment.dev}login`, {email, password}, httpOptions).pipe(
      tap((res:any) => {
        this.jwtService.saveToken(res.headers.get('Authorization')!);

        const authToken = res.headers.get('Authorization')!.split(' ')[1];
        const decodedToken = this.jwtService.unDecodeAllToken();

        this.userEmail = decodedToken.sub;
        this.userToken = authToken;

        // Se valida cambia el estado de validacion de sesion
        this.isAuthenticated = true;

        this.emitCurrentUser();
        this._router.navigate(["/admin"])
      })
    )
  }

  public getRoleUser(){
    return this.jwtService.getRole();
  }

  /**
   * Método para cerrar sesion del usuario.
   */
  public logout() {
    this.purgeAuth();
    this._router.navigate(['/auth/sign-in/aspirante']);
  }


  /**
   * Método para destruir el token del usuario
   */
  public purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  /**
   * Método para saber si se tiene una sesion activa
   * TODO: por implemtnar logica de validacion del tiempo de expiracion del token para cerrar la sesion automaticamente.
   * @returns true si ya se ha autentificado el usuario
   */
  public hasActiveSession() {
    return this.isAuthenticated || this.jwtService.getToken() != null;
  }

  /**
   * Método para saber si un usuario es admin, usuario con aspirante
   * TODO: por implementar la logica cuando sea encargado.
   * @param id del usuario
   * @returns observable con toda la informacion del usuario
   */
  private getUserInfo(id: number) {
    return this.http.get(`${environment.dev}/aspirante/${id}`);
  }

  /**
   * Método para la emision del usuario dependiendo del role
   * @param id correspondiente al usuario
   * @param role role correspondiente al usuario
   * @returns
   */

  private emitCurrentUser() {
    this.currentUserSubject.next({
      name: 'Administrador',
      role: this.jwtService.getRole(),
      status: -1,
    });

    localStorage.setItem(
      'user',
      JSON.stringify(this.currentUserSubject.getValue())
    );
  }

}
