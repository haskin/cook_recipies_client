import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  register(): void {
    console.log(this.username);
    this.userService.register({
      username: this.username,
      password: this.password,
    });
  }

  login(): void {
    console.log(this.password);
  }
}
