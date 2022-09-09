import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn: boolean = false;
  readonly userUrlPrefix: string = 'http://localhost:8080/api/user';
  readonly registerSuffix: string = '/signup';

  constructor(private httpClient: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  register(user: User): void {
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
    this.httpClient
      .post<any>(url, user)
      .subscribe((response) => console.log(response));
  }
}
