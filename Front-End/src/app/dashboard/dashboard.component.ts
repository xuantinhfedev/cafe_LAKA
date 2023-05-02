import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { Toastr } from '../services/toastr.service';
import { GlobalConstants } from '../shared/global-constants';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
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
    this.test();
  }

  option: any = {
    xAxis: {
      type: 'category',
      data: [],
    },
    tooltip: {},
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [405000, 70000],
        type: 'line',
      },
    ],
  };

  temp: any;

  async test() {
    // Tạo một object để lưu tổng tiền của từng tháng
    const totalByMonth: any = {};
    let res = await this.dashboardService.getLstBill();
    this.temp = res.results.data;
    console.log(this.temp);
    this.option.xAxis.data = [];
    this.option.series[0].data = [];
    for (const month in this.temp) {
      this.option.xAxis.data.push(`Tháng ${month}`);
      this.option.series[0].data.push(this.temp[month]);
    }
    console.log(this.option);
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

  // Xử lý date
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  process() {
    console.log(this.range);
  }
}
