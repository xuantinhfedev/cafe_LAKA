import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategorySaleService } from 'src/app/services/category-sale/category-sale.service';

@Component({
  selector: 'app-delete-category-sale',
  templateUrl: './delete-category-sale.component.html',
  styleUrls: ['./delete-category-sale.component.scss']
})
export class DeleteCategorySaleComponent implements OnInit {
  onDelete = new EventEmitter();
  details: any = {};
  responseMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categorySaleService: CategorySaleService,
    public dialogRef: MatDialogRef<DeleteCategorySaleComponent>,
    private toastr: Toastr
  ) { }

  ngOnInit(): void {
    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async handleChangeAction() {
    let response = await this.categorySaleService.deleteCategory(
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
