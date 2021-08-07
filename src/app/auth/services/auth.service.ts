import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { authResponse, Usuario } from '../interfaces/interfaces';
import { of, Observable } from 'rxjs';

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

  register(name:string, email:string, password:string){
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };
    return this.http.post<authResponse>(url, body).pipe(
      tap((res) => {
        if (res.ok) {
          localStorage.setItem('token', res.token!);
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



  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = {  email, password };

    return this.http.post<authResponse>(url, body).pipe(
      tap((res) => {
        if (res.ok) {
          localStorage.setItem('token', res.token!);
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

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<authResponse>(url, { headers }).pipe(
      map((res) => {
        localStorage.setItem('token', res.token!);
        this._usuario = {
          name: res.name!,
          uid: res.uid!,
        };
        return res.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout(){
localStorage.removeItem('token')
  }



}
