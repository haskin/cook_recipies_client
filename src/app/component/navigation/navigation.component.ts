import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  loggedInSubscription: Subscription = new Subscription();
  constructor(private authService: AuthService) {
    // console.log('in navigation constructor');
    this.loggedInSubscription = authService
      .getTokenActive()
      .subscribe((tokenState) => {
        console.log('Token State: ' + tokenState);
        this.loggedIn = tokenState;
      });
  }

  ngOnInit(): void {
    // console.log('in navigation init');
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }
}
