import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/ApiResponse';
import { LoginResponse } from '../model/LoginResponse';
import { User } from '../model/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  registerError: boolean = false;
  loggedIn: boolean = false;
  readonly userUrlPrefix: string = 'http://localhost:8080/api/user';
  readonly registerSuffix: string = '/signup';

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  register(user: User): boolean {
    let apiResponse: ApiResponse = { success: false, message: '' };
    const url = this.userUrlPrefix.concat(this.registerSuffix);
    // let response = this.httpClient.get<any>(url);
    console.log(url);
    console.log(user);
    // const httpOptions: HttpHeaders = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'my-auth-token',
    //   }),
    // };
    this.httpClient.post<ApiResponse>(url, user).subscribe((response) => {
      apiResponse = response;
    });
    return apiResponse.success;
  }

  login(user: User): void {
    let url = `${this.userUrlPrefix}/signin`;
    this.httpClient.post<LoginResponse>(url, user).subscribe((response) => {
      console.log(response.tokenType);
      this.userService.setToken(response.accessToken);
    });
  }
}
