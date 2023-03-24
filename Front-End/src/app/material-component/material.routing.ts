import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterGuardService } from '../services/router-guard/router-guard.service';
import { TrashCategoryComponent } from './dialog/category/trash-category/trash-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';


export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  }, {
    path: 'category/category-trash',
    component: TrashCategoryComponent,
    canActivate:[RouterGuardService],
    data: {
      expectedRole: ['admin']
    }
  }
];
