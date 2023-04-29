import { Routes, RouterModule } from '@angular/router';
import { ManageClientComponent } from './manage-client.component';

const routes: Routes = [
  {
    path: '',
    component: ManageClientComponent
   },
];

export const ClientRoutingRoutes = RouterModule.forChild(routes);
