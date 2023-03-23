import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  name: any;
  constructor(private router: Router,
    private dialog: MatDialog) {
      this.name = sessionStorage.getItem('name');
      // console.log(this.name)
  }

  logOut() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'đăng xuất'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      sessionStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword () {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}
