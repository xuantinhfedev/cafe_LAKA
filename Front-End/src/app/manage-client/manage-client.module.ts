import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClientComponent } from './manage-client.component';
import { ClientRoutingRoutes } from './client-routing.routing';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingRoutes
  ],
  declarations: [ManageClientComponent, PageHeaderComponent]
})
export class ManageClientModule { }
