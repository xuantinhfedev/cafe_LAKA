import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterGuardService } from '../services/router-guard/router-guard.service';
import { TrashCategoryComponent } from './dialog/category/trash-category/trash-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product/manage-product.component';
import { TrashProductComponent } from './manage-product/product/trash-product/trash-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { TrashBillComponent } from './view-bill/trash-bill/trash-bill.component';
import { ManageUserComponent } from './manage-user/manage-user/manage-user.component';
import { ManageContactComponent } from './manage-contact/manage-contact/manage-contact.component';
import { ManageCategorySaleComponent } from './manage-category-sale/manage-category-sale/manage-category-sale.component';
import { TrashCategorySaleComponent } from './manage-category-sale/trash-category-sale/trash-category-sale.component';
import { ManageProductSaleComponent } from './manage-product-sale/manage-product-sale/manage-product-sale.component';
import { TrashProductSaleComponent } from './manage-product-sale/trash-product-sale/trash-product-sale.component';
import { LiveChatComponent } from '../live-chat/live-chat.component';


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
  {
    path: 'bill/trash',
    component: TrashBillComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'user',
    component: ManageUserComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'contact',
    component: ManageContactComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  },
  {
    path: 'category-sales',
    component: ManageCategorySaleComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'category-sales/trash-category-sales',
    component: TrashCategorySaleComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'product-sales',
    component: ManageProductSaleComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'product-sales/trash-product-sales',
    component: TrashProductSaleComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'live-chat',
    component: LiveChatComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin', 'user']
    }
  }
];
