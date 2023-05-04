import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategorySaleService } from 'src/app/services/category-sale/category-sale.service';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-add-product-sale',
  templateUrl: './add-product-sale.component.html',
  styleUrls: ['./add-product-sale.component.scss'],
})
export class AddProductSaleComponent implements OnInit {
  onAdd = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: string = '';
  categories: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productSaleService: ProductSaleService,
    public dialogRef: MatDialogRef<AddProductSaleComponent>,
    private categorySaleService: CategorySaleService,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      categoryId: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      sale: [null, [Validators.required, Validators.max(90), Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      image: [null],
    });
    this.getCategories();
  }

  async getCategories() {
    let response = await this.productSaleService.getCategories();
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

  handleSubmit() {
    this.add();
  }

  nameFile: any;
  valueDesc: any;
  valueName: any;
  valuePrice: any;
  valueSale: any;
  valueQuantity: any;

  uploadFile(event: any) {
    const filePatch = (event.target as HTMLInputElement).files![0];
    this.productForm.patchValue({
      image: filePatch,
    });
    this.productForm.get('image')!.updateValueAndValidity();
    this.nameFile = filePatch.name;
  }

  async add() {
    var formData: FormData = new FormData();
    formData.append('name', this.productForm.get('name')!.value);
    formData.append(
      'categorySaleId',
      this.productForm.get('categoryId')!.value
    );
    formData.append('description', this.productForm.get('description')!.value);
    formData.append('price', this.productForm.get('price')!.value);
    formData.append('sale', this.productForm.get('sale')!.value);
    formData.append('quantity', this.productForm.get('quantity')!.value);
    formData.append('image', this.productForm.get('image')!.value);

    let response = await this.productSaleService.add(formData);
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
}
