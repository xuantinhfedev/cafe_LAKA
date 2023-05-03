import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url_environment = environment.apiUrl;
const api_url = 'category-sale/';

@Injectable({
  providedIn: 'root',
})
export class CategorySaleService {
  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) {}

  // Hàm thực hiện gọi API thêm danh mục
  async add(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'add',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API khôi phục
  async restore(data: any) {
    let dataResponse = await this.baseService.patchService(
      data,
      api_url + 'restore',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API phá hủy(destroy)
  async destroy(id: any) {
    let dataResponse = await this.baseService.deleteService(
      api_url + 'destroy?id=' + id,
      ''
    );
    return dataResponse;
  }
  // Hàm thực hiện gọi API khôi phục
  async restoreAll(data: any) {
    let dataResponse = await this.baseService.patchService(
      data,
      api_url + 'restore-all',
      ''
    );
    return dataResponse;
  }
  // Hàm thực hiện gọi API phá hủy(destroy)
  async destroyAll() {
    let dataResponse = await this.baseService.deleteService(
      api_url + 'destroy-all',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API cập nhật danh mục
  async update(data: any) {
    let dataResponse = await this.baseService.patchService(
      data,
      api_url + 'update',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API lấy danh sách danh mục
  async getCategories(pageSize: number, pageIndex: number, value: string) {
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

  // Hàm thực hiện gọi API tím kiếm danh mục
  async getSearchCategory(valueSearch: any) {
    let dataResponse = await this.baseService.getService(
      api_url + 'search?name=' + valueSearch,
      ''
    );

    return dataResponse;
  }

  // Hàm thực hiện gọi API xóa(mềm) danh mục
  async deleteCategory(id: any) {
    let dataResponse = await this.baseService.deleteService(
      api_url + 'delete?id=' + id,
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API trash-category(Thùng rác)
  async trashCategory(pageSize: any, pageIndex: any, value: any) {
    let dataResponse = await this.baseService.getService(
      api_url +
        'trash?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value,
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API tím kiếm danh mục
  async getSearchTrashCategory(valueSearch: any) {
    let dataResponse = await this.baseService.getService(
      api_url + 'search-trash?name=' + valueSearch,
      ''
    );

    return dataResponse;
  }

  async lstCategory() {
    let res = await this.baseService.getService(
      api_url + 'lstCategory',
      ''
    );
    return res;
  }
}
