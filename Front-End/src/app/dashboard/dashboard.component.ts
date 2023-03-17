import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { Toastr } from '../services/toastr.service';
import { GlobalConstants } from '../shared/global-constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  responseMessage: string = '';
  data: any;
  ngAfterViewInit() {}

  ngOnInit(): void {
    this.dashboardData();
  }

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private toastr: Toastr
  ) {
    this.ngxService.start();
  }

  // Hàm xử lý nghiệp vụ lấy thông tin đashboard
  async dashboardData() {
    let response = await this.dashboardService.getDetails();
    if (response.results.responseCode == '200') {
      this.ngxService.stop();
      this.data = response.results.data;
    } else {
      this.ngxService.stop();
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }
}
