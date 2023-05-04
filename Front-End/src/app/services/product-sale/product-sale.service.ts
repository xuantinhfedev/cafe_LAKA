import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadService } from '../uploadService.service';

const url_environment = environment.apiUrl;
const api_url = 'product-sale/';

@Injectable({
  providedIn: 'root',
})
export class ProductSaleService {
  constructor(
    private baseService: BaseService,
    private uploadService: UploadService,
    private httpClient: HttpClient
  ) {}

  // Hàm thực hiện gọi API thêm sản phẩm
  async add(data: any) {
    let dataResponse = await this.uploadService.postService(
      data,
      api_url + 'add',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API cập nhật sản phẩm
  async update(data: any) {
    let dataResponse = await this.uploadService.postService(
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

  // Hàm thực hiện chuyển sản phẩm vào thùng rác
  async deleteProduct(id: any) {
    let dataResponse = await this.baseService.deleteService(
      api_url + 'delete/' + id,
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

    // Hàm thực hiện cập nhật trạng thái Status của sản phẩm
    async updateHot(data: any) {
      let dataResponse = await this.baseService.patchService(
        data,
        api_url + 'updateHot',
        ''
      );
      return dataResponse;
    }

  // Hàm thực hiện gọi API lấy danh sách sản phẩm
  async getTrashProducts(pageSize: number, pageIndex: number, value: string) {
    let dataResponse = await this.baseService.getService(
      api_url +
        'trash-product?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value,
      ''
    );
    return dataResponse;
  }

  // API khôi phục bản ghi
  async restoreProduct(data: any) {
    let res = await this.baseService.patchService(
      data,
      api_url + `restore`,
      ''
    );
    return res;
  }
  // API xóa hoàn toàn bản ghi trong thùng rác
  async destroy(id: any) {
    let dataResponse = await this.baseService.deleteService(
      api_url + 'destroy?id=' + id,
      ''
    );
    return dataResponse;
  }
  // API khôi phục tất cả bản ghi
  // Hàm thực hiện gọi API khôi phục
  async restoreAll(data: any) {
    let dataResponse = await this.baseService.patchService(
      data,
      api_url + 'restore-all',
      ''
    );
    return dataResponse;
  }

  // API xóa hoàn toàn tất cả bản ghi trong thùng rác
  async clear() {
    let dataResponse = await this.baseService.deleteService(
      api_url + `clear`,
      ''
    );
    return dataResponse;
  }
  // async getProductById(id: any){
  //   let res = await this.baseService.getService(
  //     api_url + `getByCategory/${id}`, ''
  //   )
  //   return res;
  // }
  getProductByCategory(id: any) {
    return this.httpClient.get(
      url_environment + '/' + api_url + `getByCategory/${id}`
    );
  }
  getById(id: any) {
    return this.httpClient.get(
      url_environment + '/' + api_url + `getById/${id}`
    );
  }

  // Hàm thực hiện lấy danh sách danh mục
  async getCategories() {
    let dataResponse = await this.baseService.getService(
      api_url + 'getCategories',
      ''
    );
    return dataResponse;
  }
}
