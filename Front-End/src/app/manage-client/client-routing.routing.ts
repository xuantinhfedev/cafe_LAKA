import { Routes, RouterModule } from '@angular/router';
import { ManageClientComponent } from './manage-client.component';
import { PageHomeComponent } from './page-home/page-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: PageHomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

export const ClientRoutingRoutes = RouterModule.forChild(routes);
