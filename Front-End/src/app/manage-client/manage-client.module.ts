import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClientComponent } from './manage-client.component';
import { ClientRoutingRoutes } from './client-routing.routing';
import { PageHeaderComponent } from './page-header/page-header.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PageHomeComponent } from './page-home/page-home.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingRoutes,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
  ],
  declarations: [ManageClientComponent, PageHeaderComponent, PageHomeComponent],
})
export class ManageClientModule {}
