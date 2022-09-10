import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private loginService: LoginService, private router: Router) {
    // console.log('In login');
  }

  ngOnInit(): void {}

  register(): void {
    console.log(this.username);
    this.loginService.register({
      username: this.username,
      password: this.password,
    });
  }

  login(): void {
    let user = {
      username: this.username,
      password: this.password,
    };
    this.loginService.login(user).subscribe((response) => {
      console.log(response);
      this.router.navigate(['']);
    });
  }
}
