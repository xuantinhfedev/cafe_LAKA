import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Toastr } from '../services/toastr.service';
import { UserService } from '../services/user/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private toastr: Toastr,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (sessionStorage.getItem('token') != null) {
      let response = await this.userService.checkToken();
      if (response.results.responseCode == 200) {
        this.router.navigate(['/cafe/dashboard']);
      } else {
      }
    }
  }

  onRouteCart() {
    this.router.navigate(['/page'])
  }

  slides = [
    {'image': './../../assets/img/page-banner-1.jpg'},
    {'image': './../../assets/img/bannner.jpg'},
    {'image': './../../assets/img/page-banner-2.jpg'},
  ];

  // Hàm thực hiện chức năng mở dialog đăng ký
  async signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(SignupComponent, dialogConfig);
  }

  // Hàm thực hiện chức năng mở dialog đăng nhập
  async loginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  // Hàm thực hiện chức năng mở dialog quên mật khẩu
  async fotgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }
}
