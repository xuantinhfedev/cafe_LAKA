import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-restore-all-product-sale',
  templateUrl: './restore-all-product-sale.component.html',
  styleUrls: ['./restore-all-product-sale.component.scss']
})
export class RestoreAllProductSaleComponent implements OnInit {
  onRestoreAll = new EventEmitter();

  responseMessage: any;
  details: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private productSaleService: ProductSaleService,
    public dialogRef: MatDialogRef<RestoreAllProductSaleComponent>,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    if(this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async restoreAll() {
    var data = {};
    let response = await this.productSaleService.restoreAll(data);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onRestoreAll.emit();
      this.responseMessage = response.results.message;
      this.toastr.toastSuccess(this.responseMessage, 'Thành công');
    } else {
      this.dialogRef.close();
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }

}
