import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-delete-product-sale',
  templateUrl: './delete-product-sale.component.html',
  styleUrls: ['./delete-product-sale.component.scss']
})
export class DeleteProductSaleComponent implements OnInit {
  onDelete = new EventEmitter();
  details: any = {};
  responseMessage: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productSaleService: ProductSaleService,
    public dialogRef: MatDialogRef<DeleteProductSaleComponent>,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async handleChangeAction() {
    let response = await this.productSaleService.deleteProduct(
      this.dialogData.data.id
    );
    // console.log(response);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onDelete.emit();
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
