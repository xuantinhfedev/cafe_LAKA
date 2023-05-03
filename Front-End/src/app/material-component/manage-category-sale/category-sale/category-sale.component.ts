import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category/category.service';
import { CategorySaleService } from 'src/app/services/category-sale/category-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-category-sale',
  templateUrl: './category-sale.component.html',
  styleUrls: ['./category-sale.component.scss']
})
export class CategorySaleComponent implements OnInit {
  onAdd = new EventEmitter();
  onEdit = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  labelMessage: string = "Thêm"
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categorySaleService: CategorySaleService,
    public dialogRef: MatDialogRef<CategorySaleComponent>,
    private toastr: Toastr
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.labelMessage = "Sửa"
      this.dialogAction = 'Edit';
      this.action = 'Edit';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }


  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  async add() {
    var formData = this.categoryForm.value;
    var data = {
      name: formData.name,
    };
    let response = await this.categorySaleService.add(data);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onAdd.emit();
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

  async edit() {
    var formData = this.categoryForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
    };
    // console.log('Dialog data: ',this.dialogData)
    let response = await this.categorySaleService.update(data);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onEdit.emit();
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
