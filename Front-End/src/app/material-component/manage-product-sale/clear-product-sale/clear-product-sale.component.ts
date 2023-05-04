import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-clear-product-sale',
  templateUrl: './clear-product-sale.component.html',
  styleUrls: ['./clear-product-sale.component.scss']
})
export class ClearProductSaleComponent implements OnInit {
  onClear = new EventEmitter();
  responseMessage: any;
  details: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private productSaleService: ProductSaleService,
    public dialogRef: MatDialogRef<ClearProductSaleComponent>,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async clear() {
    var data = {};
    let response = await this.productSaleService.clear();
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onClear.emit();
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
