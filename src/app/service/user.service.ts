import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../model/ApiResponse';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = '';

  setToken(token: string): void {
    this.token = token;
  }
}
