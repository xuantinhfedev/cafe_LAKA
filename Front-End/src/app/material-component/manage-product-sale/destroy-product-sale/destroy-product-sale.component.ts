import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-destroy-product-sale',
  templateUrl: './destroy-product-sale.component.html',
  styleUrls: ['./destroy-product-sale.component.scss']
})
export class DestroyProductSaleComponent implements OnInit {
  onDestroy = new EventEmitter();

  responseMessage: any;
  details: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private productSaleService: ProductSaleService,
    public dialogRef: MatDialogRef<DestroyProductSaleComponent>,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    if(this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async destroy() {
    var data = {
      id: this.dialogData.data.id,
    };
    let response = await this.productSaleService.destroy(data.id);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onDestroy.emit();
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
