import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.userService.getUserInformation().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
