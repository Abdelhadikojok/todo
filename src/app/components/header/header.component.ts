import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  display : boolean = false
  dipslayInfo : boolean = false
  title:string=""
  email:string =""
  getUserEmailSubscription !: Subscription

  constructor(private router : Router,private authService:AuthService,private httpService:HttpService){}

  ngOnInit(): void {
    this.getUserEmail()
    console.log(this.email);

  }

  displayList(){
    this.display = !this.display
  }

  LogOut(){
    this.authService.logout()
    this.router.navigate(["/login"]);
    this.display = false

  }



  clickedOutside(): void {
    this.display = false;
  }

  showInfo(){
    this.dipslayInfo = true
    console.log("sa");

  }

  hideInfo(){
    this.dipslayInfo = false
  }

  gotoaddTask(){
    this.router.navigate(["/addTask"])
  }

  emitFilteredTitle(){
    this.httpService.dataSubject.next(this.title)
  }

  getUserEmail(){
    this.getUserEmailSubscription =this.httpService.getUserEmail().subscribe(res=>{
      console.log(res);

      this.email = res.email
    })
  }

  ngOnDestroy(): void {
    if (this.getUserEmailSubscription) {
      this.getUserEmailSubscription.unsubscribe()
    }
  }
}
