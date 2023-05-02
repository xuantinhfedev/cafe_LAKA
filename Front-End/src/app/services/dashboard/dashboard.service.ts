import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_url = 'dashboard/';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private baseService: BaseService) {}

  async getDetails() {
    let dataResponse = await this.baseService.getService(
      api_url + 'details',
      ''
    );
    return dataResponse;
  }

  async getLstBill(data: any) {
    let res = await this.baseService.postService(
      data,
      api_url + 'getBillDBoard',
      ''
    );
    return res;
  }

  async getBillCreditCard(data: any){
    let res = await this.baseService.postService(
      data,
      api_url + 'getBillCreditCard',
      ''
    );
    return res;
  }

  async getAllStatistic(data: any){
    let res = await this.baseService.postService(
      data,
      api_url + 'getAllStatistic',
      ''
    );
    return res;
  }
}
