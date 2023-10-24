import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  display : boolean = false
  dipslayInfo : boolean = false
  title:string=""

  constructor(private router : Router,private authService:AuthService,private httpService:HttpService){}
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
}
