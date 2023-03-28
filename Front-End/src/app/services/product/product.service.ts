import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url_environment = environment.apiUrl;
const api_url = 'product/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) {}

  // Hàm thực hiện gọi API thêm sản phẩm
  async add(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'add',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API cập nhật sản phẩm
  async update(data: any) {
    let dataResponse = await this.baseService.patchService(
      data,
      api_url + 'update',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API lấy danh sách sản phẩm
  async getProducts(pageSize: number, pageIndex: number, value: string) {
    let dataResponse = await this.baseService.getService(
      api_url +
        'get?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value,
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện cập nhật trạng thái Status của sản phẩm
  async updateStatus(data: any) {
    let dataResponse = await this.baseService.patchService(
      data,
      api_url + 'updateStatus',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện chuyển sản phẩm vào thùng rác
  async delete(id: any){
    let dataResponse = await this.baseService.deleteService(
      api_url + 'delete/' + id,
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện lấy danh sách danh mục
  async getCategories(){
    let dataResponse = await this.baseService.getService(
      api_url + 'getCategories',
      ''
    );
    return dataResponse;
  }
}
