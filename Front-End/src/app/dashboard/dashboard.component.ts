import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { Toastr } from '../services/toastr.service';
import { GlobalConstants } from '../shared/global-constants';
import { EChartsOption } from 'echarts';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
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
    this.startDate = sessionStorage.getItem("start");
    this.endDate = sessionStorage.getItem("end");
  }

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private toastr: Toastr
  ) {
    this.ngxService.start();
    this.statistics();
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
        data: [],
        type: 'line',
      },
    ],
  };

  option2: any = {
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
        data: [],
        type: 'line',
      },
    ],
  };

  temp: any;
  total: any = 0;
  total2: any = 0;
  async statistics() {
    // Tạo một object để lưu tổng tiền của từng tháng
    let data = {
      start: sessionStorage.getItem('start'),
      end: sessionStorage.getItem('end'),
    };
    let res = await this.dashboardService.getLstBill(data);
    let res2 = await this.dashboardService.getBillCreditCard(data);
    this.temp = res.results.data;
    this.option.xAxis.data = [];
    this.option.series[0].data = [];
    this.option2.xAxis.data = [];
    this.option2.series[0].data = [];
    for (const month in this.temp) {
      this.total += this.temp[month];
      this.option.xAxis.data.push(`Tháng ${month}`);
      this.option.series[0].data.push(this.temp[month]);
    }

    for (const month in res2.results.data) {
      this.total2 += res2.results.data[month];
      this.option2.xAxis.data.push(`Tháng ${month}`);
      this.option2.series[0].data.push(res2.results.data[month]);
    }
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

  startDate: any = null;
  endDate: any = null;
  async process() {
    if (this.range.value.start)
      this.startDate = moment(this.range.value.start).format('YYYY-MM-DD');
    if (this.range.value.end)
      this.endDate = moment(this.range.value.end).format('YYYY-MM-DD');

    sessionStorage.setItem('start', this.startDate);
    sessionStorage.setItem('end', this.endDate);
    window.location.reload();
  }
}
