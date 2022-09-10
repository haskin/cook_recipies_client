import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwtToken';
  private _tokenActive$ = new BehaviorSubject<boolean>(false);
  tokenActive$ = this._tokenActive$.asObservable();

  constructor() {
    this._tokenActive$.next(!!localStorage.getItem(this.TOKEN_KEY));
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.setTokenActive(true);
  }
  getToken(): string {
    let token = localStorage.getItem(this.TOKEN_KEY);
    if (token === null) return '';
    return token;
  }

  isTokenActive(): boolean {
    let token = localStorage.getItem(this.TOKEN_KEY);
    if (token === null) return false;
    return true;
  }

  setTokenActive(tokenState: boolean) {
    this._tokenActive$.next(tokenState);
  }

  getTokenActive(): Observable<boolean> {
    return this._tokenActive$;
  }
}
