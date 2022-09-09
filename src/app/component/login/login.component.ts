import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerSuccess: boolean = false;
  username: string = '';
  password: string = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  register(): void {
    console.log(this.username);
    this.loginService.register({
      username: this.username,
      password: this.password,
    });
  }

  login(): void {
    this.loginService.login({
      username: this.username,
      password: this.password,
    });
  }
}
