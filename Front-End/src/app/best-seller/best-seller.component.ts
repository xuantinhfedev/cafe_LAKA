import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LiveChatComponent } from '../live-chat/live-chat.component';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss'],
})
export class BestSellerComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onContact.subscribe((response) => {
      Swal.fire(
        'Thành công',
        'Cảm ơn bạn đã sử dụng sản phẩm của chúng tôi, hãy kiểm tra Email của bạn thường xuyên khi chúng tôi liên lạc lại nhé',
        'success'
      );
    });
  }

  liveChat(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'live-chat',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(LiveChatComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onChat.subscribe((response) => {
      Swal.fire(
        'Thành công',
        'Cảm ơn bạn đã sử dụng sản phẩm của chúng tôi, hãy kiểm tra Email của bạn thường xuyên khi chúng tôi liên lạc lại nhé',
        'success'
      );
    });
  }

  check = 1;
  showButton() {
    if (this.check == 0) {
      this.check = 1;
    } else {
      this.check = 0;
    }
    console.log(this.check);
  }
}
