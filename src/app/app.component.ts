import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { HttpService } from './services/http.service';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Ecommerce';
  authSubscription !: Subscription

  constructor(private authService: AuthService,private http:HttpService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe()
    this.authService.outoSignIn()

  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe
    }
  }


}

