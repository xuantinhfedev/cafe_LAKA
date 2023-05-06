import { Routes, RouterModule } from '@angular/router';
import { ManageClientComponent } from './manage-client.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageCartComponent } from './page-cart/page-cart.component';
import { PageAboutComponent } from './page-about/page-about.component';

const routes: Routes = [
  {
    path: 'home',
    component: PageHomeComponent,
  },
  {
    path: 'cart',
    component: PageCartComponent,
  },
  {
    path: 'about',
    component: PageAboutComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

export const ClientRoutingRoutes = RouterModule.forChild(routes);
