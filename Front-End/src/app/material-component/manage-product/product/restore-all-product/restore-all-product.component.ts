import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-restore-all-product',
  templateUrl: './restore-all-product.component.html',
  styleUrls: ['./restore-all-product.component.scss'],
})
export class RestoreAllProductComponent implements OnInit {
  onRestoreAllCategory = new EventEmitter();
  responseMessage: any;
  details: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private productService: ProductService,
    public dialogRef: MatDialogRef<RestoreAllProductComponent>,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    if(this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async restoreAll() {
    var data = {};
    let response = await this.productService.restoreAll(data);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onRestoreAllCategory.emit();
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
