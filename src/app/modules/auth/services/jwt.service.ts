import { Injectable } from '@angular/core';
import * as jwtHelper from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  /**
   * Método para el obtener el token del usuario
   * @returns el token del usuario
   */
  public getToken(): string {
    return window.localStorage["jwtToken"];
  }

  /**
   * Método para guardar el token del usuario cuando se inicia sesión
   * @param token token a guardar del usuario
   */
  public saveToken(token: string): void {
    window.localStorage["jwtToken"] = token;
  }

  /**
   * Método para destruir el token del usuario cuando se cierre la sesión.
   */
  public destroyToken(): void {
    window.localStorage.clear();
  }

 /**
   * Método para devolver la información del token (payload)
   * TODO: por mejora la lógica (solo es quitar le parametro.)
   * @param token token del usuario a decodificar
   * @returns el payload del usuario
   */
 public unDecodeAllToken(): any{
  return jwtHelper.default(this.getToken().split(' ')[1]);
}

/**
 * Método para obtener el rol del usuario.
 * @returns el rol del usuario
 */
public getRole() {
  // obtengo las autorizaciones (rol)
  const { authority } = JSON.parse(this.unDecodeAllToken().authorities)[0]
  return authority.split('_')[1];
}
}
