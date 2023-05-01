import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

const api_url = 'product/';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private _base: BaseService) {}

  // Hàm thực hiện gọi API lấy danh sách sản phẩm
  async pageAllProducts(
    pageSize: number,
    pageIndex: number,
    value: string,
    sort: string
  ) {
    let dataResponse = await this._base.getService(
      api_url +
        'pageAllProduct?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value +
        '&sort=' +
        sort,
      ''
    );
    return dataResponse;
  }
}