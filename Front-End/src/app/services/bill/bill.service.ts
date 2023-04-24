import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
const api_url = 'bill/';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private __baseService: BaseService
  ) {}

  generateReport(data: any) {
    return this.httpClient.post(this.url + `/bill/generateReport`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getPDF(data: any): Observable<Blob> {
    return this.httpClient.post(this.url + `/bill/getPdf`, data, {
      responseType: 'blob',
    });
  }

  async getBills(pageSize: number, pageIndex: number, value: string) {
    let res = await this.__baseService.getService(
      api_url +
        'getBills?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value,
      ''
    );
    return res;
  }

  async getBillsInTrash(pageSize: number, pageIndex: number, value: string) {
    let res = await this.__baseService.getService(
      api_url +
        'trash?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value,
      ''
    );
    return res;
  }

   // Hàm thực hiện gọi API xóa hóa đươn
   async moveTrash(id: any) {
    let dataResponse = await this.__baseService.deleteService(
      api_url + 'delete?id=' + id,
      ''
    );
    return dataResponse;
  }


}
