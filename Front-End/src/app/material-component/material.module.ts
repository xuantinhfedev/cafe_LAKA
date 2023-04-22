import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { DeleteCategoryComponent } from './dialog/category/delete-category/delete-category.component'

import { MatFormFieldModule } from "@angular/material/form-field";

import { StylePaginatorDirective } from './style-paginator.directive';
import { TrashCategoryComponent } from './dialog/category/trash-category/trash-category.component';
import { OneTrashCategoryComponent } from './dialog/category/trash-category/one-trash-category/one-trash-category.component';
import { AllTrashCategoryComponent } from './dialog/category/trash-category/all-trash-category/all-trash-category.component';
import { ManageProductComponent } from './manage-product/manage-product/manage-product.component';
import { AddProductComponent } from './manage-product/product/add-product/add-product.component';
import { EditProductComponent } from './manage-product/product/edit-product/edit-product.component';
import { DeleteProductComponent } from './manage-product/product/delete-product/delete-product.component';
import { TrashProductComponent } from './manage-product/product/trash-product/trash-product.component';
import { RestoreProductComponent } from './manage-product/product/restore-product/restore-product.component';
import { RestoreAllProductComponent } from './manage-product/product/restore-all-product/restore-all-product.component';
import { ClearProductComponent } from './manage-product/product/clear-product/clear-product.component';
import { DestroyProductComponent } from './manage-product/product/destroy-product/destroy-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatFormFieldModule,
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    StylePaginatorDirective,
    DeleteCategoryComponent,
    TrashCategoryComponent,
    OneTrashCategoryComponent,
    AllTrashCategoryComponent,
    ManageProductComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    TrashProductComponent,
    RestoreProductComponent,
    RestoreAllProductComponent,
    ClearProductComponent,
    DestroyProductComponent,
    ManageOrderComponent,
    ViewBillComponent,
  ],
  exports: []
})
export class MaterialComponentsModule {}
