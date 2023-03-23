import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Toastr } from '../toastr.service';
import jwt_decode from 'jwt-decode';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Injectable({
  providedIn: 'root',
})
export class RouterGuardService {
  constructor(
    public auth: AuthService,
    public router: Router,
    private toastr: Toastr
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = sessionStorage.getItem('token');
    var tokenPayload: any;
    try {
      tokenPayload = jwt_decode(token);
      sessionStorage.setItem('role', tokenPayload.role);
      sessionStorage.setItem('name', tokenPayload.name);
    } catch (err) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }
      this.toastr.toastError(GlobalConstants.unauthorized, 'Lỗi');
      this.router.navigate(['/cafe/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      sessionStorage.clear();
      return false;
    }
  }
}
