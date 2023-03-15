import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Toastr } from '../services/toastr.service'
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private toastr: Toastr, private dialog: MatDialog) {}

  ngOnInit(): void {}

  async signupAction() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "650px";
    this.dialog.open(SignupComponent, dialogConfig)
  }
}
