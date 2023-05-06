import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactComponent } from 'src/app/contact/contact.component';
import { LiveChatComponent } from 'src/app/live-chat/live-chat.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss']
})
export class PageAboutComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private router: Router,
    private productSaleService: ProductSaleService
  ) { }

  dataSource: any = [];
  ngOnInit() {
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
