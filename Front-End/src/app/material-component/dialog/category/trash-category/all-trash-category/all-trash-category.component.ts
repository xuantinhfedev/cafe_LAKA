import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category/category.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-all-trash-category',
  templateUrl: './all-trash-category.component.html',
  styleUrls: ['./all-trash-category.component.scss']
})
export class AllTrashCategoryComponent implements OnInit {
  onRestoreAllCategory = new EventEmitter();
  onDestroyAllCategory = new EventEmitter();
  dialogAction: any = 'restoreAll';
  action: any = 'restoreAll';
  responseMessage: any;
  details: any = {}

  labelMessage: string = 'Khôi phục tất cả';

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private categoryService: CategoryService,
  public dialogRef: MatDialogRef<AllTrashCategoryComponent>,
  private toastr: Toastr) { }

  ngOnInit() {
    if (this.dialogData.action === 'destroyAll') {
      this.labelMessage = "Xóa tất cả"
      this.dialogAction = 'destroyAll';
      this.action = 'destroyAll';
    }

    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }


  handleChangeAction() {
    if(this.dialogAction === 'restoreAll'){
      this.restoreAll();
    }else{
      this.destroyAll();
    }
  }

  async restoreAll() {

    var data = {
      id: 1,
    };
    let response = await this.categoryService.restoreAll(data);
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

  async destroyAll() {
    let response = await this.categoryService.destroyAll();
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onDestroyAllCategory.emit();
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
