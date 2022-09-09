import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwtToken';
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
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
  constructor() {}
}
