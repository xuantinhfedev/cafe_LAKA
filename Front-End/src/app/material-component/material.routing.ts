import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterGuardService } from '../services/router-guard/router-guard.service';
import { TrashCategoryComponent } from './dialog/category/trash-category/trash-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product/manage-product.component';
import { TrashProductComponent } from './manage-product/product/trash-product/trash-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';


export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'category/category-trash',
    component: TrashCategoryComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'product',
    component: ManageProductComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'product/product-trash',
    component: TrashProductComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'order',
    component: ManageOrderComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  },
  {
    path: 'bill',
    component: ViewBillComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  },
];
