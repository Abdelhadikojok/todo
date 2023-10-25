import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  private authSubscription !: Subscription;
  loginValue: boolean = false;
  error: string = "";
  isloading: boolean = false;
  islogedIn: boolean = false;
  sginUpText: string = '';

  constructor(private authService: AuthService, private router: Router,private alertService:AlertService) {

  }

  removeError() {
      this.error = ""
  }

  changeLogedValue() {
      this.loginValue = !this.loginValue

  }

  submitForm(form: any) {
      if (form.valid) {
          const email = form.value.email;
          const password = form.value.password;
          this.isloading = true;
          this.authSubscription = this.authService.signIn(email, password).subscribe(res => {
              console.log(res)
              this.islogedIn = true
              console.log(this.islogedIn)
              this.isloading = false;
              this.router.navigate(['/'])
              this.alertService.alertMode.next(true)
          }, err => {
              this.error = err;
              console.log(this.error);
              this.alertService.alertMode.next(false)
              this.isloading = false;
          })
          form.reset();

      }
  }

  ngOnDestroy(): void {
      if (this.authSubscription) {
          this.authSubscription.unsubscribe();
      }
  }
}

