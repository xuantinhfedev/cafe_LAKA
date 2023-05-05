import { Component, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { CartService } from '../services/cart/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LiveChatComponent } from '../live-chat/live-chat.component';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.scss'],
})
export class ManageClientComponent implements OnInit {
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  cart: Cart = { items: [] };

  check = 1;
  showButton() {
    if (this.check == 0) {
      this.check = 1;
    } else {
      this.check = 0;
    }
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
}
