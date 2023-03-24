import { Component, OnInit, EventEmitter,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category/category.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-one-trash-category',
  templateUrl: './one-trash-category.component.html',
  styleUrls: ['./one-trash-category.component.scss'],
})
export class OneTrashCategoryComponent implements OnInit {
  onRestoreCategory = new EventEmitter();
  onDestroyCategory = new EventEmitter();
  dialogAction: any = 'restore';
  action: any = 'restore';
  responseMessage: any;
  details: any = {}

  labelMessage: string = 'Khôi phục';
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<OneTrashCategoryComponent>,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    if (this.dialogData.action === 'destroy') {
      this.labelMessage = "Xóa"
      this.dialogAction = 'destroy';
      this.action = 'destroy';
    }

    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }

  handleChangeAction() {
    if(this.dialogAction === 'restore'){
      this.restore();
    }else{
      this.destroy();
    }
  }


  async restore() {

    var data = {
      id: this.dialogData.data.id,
    };
    let response = await this.categoryService.restore(data);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onRestoreCategory.emit();
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

  async destroy() {
    let response = await this.categoryService.destroy(this.dialogData.data.id);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onDestroyCategory.emit();
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
