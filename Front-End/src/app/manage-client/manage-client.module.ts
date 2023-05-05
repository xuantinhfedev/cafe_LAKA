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
import { MatTooltipModule } from '@angular/material/tooltip';

import { PageHomeComponent } from './page-home/page-home.component';
import { PageSidebarComponent } from './page-sidebar/page-sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material-module';
import { PageFiltersComponent } from './page-filters/page-filters.component';
import { PageProductHeaderComponent } from './page-product-header/page-product-header.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatStepperModule } from '@angular/material/stepper';
import { PageProductBoxComponent } from './page-product-box/page-product-box.component';
import { PageCartComponent } from './page-cart/page-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from '../shared/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StylePaginatorDirective } from './style-paginator.directive';
import { PageFooterComponent } from './page-footer/page-footer.component';
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
    MatFormFieldModule,
    MatCarouselModule,
    MatTooltipModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MatStepperModule,
    MaterialExampleModule,
    MatPaginatorModule,
  ],
  declarations: [
    StylePaginatorDirective,
    ManageClientComponent,
    PageHeaderComponent,
    PageHomeComponent,
    PageSidebarComponent,
    PageFiltersComponent,
    PageProductHeaderComponent,
    PageProductBoxComponent,
    PageCartComponent,
    PageFooterComponent,
  ],
  providers: [
  ]
})
export class ManageClientModule {}
