import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  loggedInSubscription: Subscription = new Subscription();
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loggedInSubscription = authService
      .getTokenActive()
      .pipe(tap((tokenState) => console.log('User service: ' + tokenState)))
      .subscribe((tokenState) => (this.loggedIn = tokenState));
  }

  ngOnInit(): void {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.userService.getUserInformation().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }
}
