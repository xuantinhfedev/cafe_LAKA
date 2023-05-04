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
import { DeleteCategoryComponent } from './dialog/category/delete-category/delete-category.component';

import { MatFormFieldModule } from '@angular/material/form-field';

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
import { TrashBillComponent } from './view-bill/trash-bill/trash-bill.component';
import { ManageUserComponent } from './manage-user/manage-user/manage-user.component';
import { ManageContactComponent } from './manage-contact/manage-contact/manage-contact.component';
import { ManageCategorySaleComponent } from './manage-category-sale/manage-category-sale/manage-category-sale.component';
import { CategorySaleComponent } from './manage-category-sale/category-sale/category-sale.component';
import { DeleteCategorySaleComponent } from './manage-category-sale/delete-category-sale/delete-category-sale.component';
import { TrashCategorySaleComponent } from './manage-category-sale/trash-category-sale/trash-category-sale.component';
import { TrashAllCategorySaleComponent } from './manage-category-sale/trash-all-category-sale/trash-all-category-sale.component';
import { TrashOneCategorySaleComponent } from './manage-category-sale/trash-one-category-sale/trash-one-category-sale.component';
import { ManageProductSaleComponent } from './manage-product-sale/manage-product-sale/manage-product-sale.component';
import { TrashProductSaleComponent } from './manage-product-sale/trash-product-sale/trash-product-sale.component';
import { AddProductSaleComponent } from './manage-product-sale/add-product-sale/add-product-sale.component';
import { EditProductSaleComponent } from './manage-product-sale/edit-product-sale/edit-product-sale.component';
import { DeleteProductSaleComponent } from './manage-product-sale/delete-product-sale/delete-product-sale.component';
import { ClearProductSaleComponent } from './manage-product-sale/clear-product-sale/clear-product-sale.component';
import { DestroyProductSaleComponent } from './manage-product-sale/destroy-product-sale/destroy-product-sale.component';
import { RestoreAllProductSaleComponent } from './manage-product-sale/restore-all-product-sale/restore-all-product-sale.component';
import { RestoreProductSaleComponent } from './manage-product-sale/restore-product-sale/restore-product-sale.component';
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
    TrashBillComponent,
    ManageUserComponent,
    ManageContactComponent,
    ManageCategorySaleComponent,
    CategorySaleComponent,
    DeleteCategorySaleComponent,
    TrashCategorySaleComponent,
    TrashAllCategorySaleComponent,
    TrashOneCategorySaleComponent,
    ManageProductSaleComponent,
    TrashProductSaleComponent,
    AddProductSaleComponent,
    EditProductSaleComponent,
    ClearProductSaleComponent,
    DeleteProductSaleComponent,
    DestroyProductSaleComponent,
    RestoreAllProductSaleComponent,
    RestoreProductSaleComponent
  ],
  exports: [],
})
export class MaterialComponentsModule {}
