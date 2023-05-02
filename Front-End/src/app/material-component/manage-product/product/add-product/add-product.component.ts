import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: string = '';
  categories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private categoryService: CategoryService,
    private toastr: Toastr
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      categoryId: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      image: [null]
    });

    this.getCategories();
  }

  async getCategories() {
    let response = await this.productService.getCategories();
    if (response.results.responseCode == '200') {
      this.categories = response.results.data;
    } else {
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }

  handleSubmit(){
    this.add();
  }

  nameFile: any;
  valueDesc: any;
  valueName: any;
  valuePrice: any;

  uploadFile(event: any) {
    const filePatch = (event.target as HTMLInputElement).files![0];
    this.productForm.patchValue({
      image: filePatch,
    });
    this.productForm.get('image')!.updateValueAndValidity();
    this.nameFile = filePatch.name;
  }

  async add(){
    var formData: FormData = new FormData();
    formData.append('name', this.productForm.get('name')!.value);
    formData.append('categoryId', this.productForm.get('categoryId')!.value);
    formData.append('description', this.productForm.get('description')!.value);
    formData.append('price', this.productForm.get('price')!.value);
    formData.append('image', this.productForm.get('image')!.value);

    let response = await this.productService.add(formData);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onAddProduct.emit();
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
