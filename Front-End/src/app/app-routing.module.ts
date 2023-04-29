import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouterGuardService } from './services/router-guard/router-guard.service';
import { ManageClientComponent } from './manage-client/manage-client.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'page',
    children: [
      {
        path: '',
        component: ManageClientComponent,
        loadChildren: () =>
          import('./manage-client/manage-client.module').then(
            (m) => m.ManageClientModule
          ),
      },
    ],
  },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./material-component/material.module').then(
            (m) => m.MaterialComponentsModule
          ),
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
