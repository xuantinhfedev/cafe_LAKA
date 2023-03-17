import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Toastr } from '../services/toastr.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private toastr: Toastr, private dialog: MatDialog) {}

  ngOnInit(): void {}

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
