import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { authResponse, Usuario } from '../interfaces/interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(private http: HttpClient) {}

  get usuario() {
    return { ...this._usuario };
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<authResponse>(url, body).pipe(
      tap((res) => {
        if (res.ok) {
          localStorage.setItem('token', res.token!)
          this._usuario = {
            name: res.name!,
            uid: res.uid!,
          };
        }
      }),
      map((res) => res.ok),
      catchError((err) => of(err.error.msg)) // of transforma un valor booleano a un observable
    );
  }

  validarToken(){
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('token', localStorage.getItem('token')|| '')

    return this.http.get(url, {
      headers
    });

  }


}
