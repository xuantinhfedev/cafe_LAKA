import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './signup/signup.component';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor/token-interceptor.interceptor';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxEchartsModule } from 'ngx-echarts';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  pbColor: 'brown',
  bgsColor: 'brown',
  fgsColor: 'brown',
  fgsType: SPINNER.squareLoader,
  fgsSize: 50,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3,
};
import {MatTooltipModule} from '@angular/material/tooltip';
import { ContactComponent } from './contact/contact.component';
import { PageFooterComponent } from './manage-client/page-footer/page-footer.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { SocketioService } from './live-chat/web-socket.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ContactComponent,
    LiveChatComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTooltipModule,
    MatStepperModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      countDuplicates: true,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
    SocketioService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
