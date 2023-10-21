import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { User } from '../models/models';

// import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
    user: User | null = null
    constructor(
    private router: Router,
    private authService: AuthService
    ) {
    this.authService.userSubject.pipe(take(1)).subscribe(res => this.user = res)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('please make sure to login')
    if (this.user) {
      return true;
    }

    this.router.navigate(['/unAutherized'], { queryParams: { returnUrl: state.url } });
    return false;
    }
}
