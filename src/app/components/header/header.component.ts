import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  display : boolean = false
  dipslayInfo : boolean = false

  constructor(private router : Router,private authService:AuthService){}
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
  }

  hideInfo(){
    this.dipslayInfo = false
  }
}
