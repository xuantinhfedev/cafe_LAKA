import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url_environment = environment.apiUrl;
const api_url = 'category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(
  private baseService: BaseService,
  private httpClient: HttpClient
  ) { }

  // Hàm thực hiện gọi API thêm danh mục
  async add(data: any){
    let dataResponse = await this.baseService.postService(data, api_url + 'add', '');
    return dataResponse;
  }

  // Hàm thực hiện gọi API cập nhật danh mục
  async update(data: any){
    let dataResponse = await this.baseService.patchService(data, api_url + 'update', '');
    return dataResponse;
  }

  // Hàm thực hiện gọi API lấy danh sách danh mục
  async getCategorys() {
    let dataResponse = await this.baseService.getService(api_url + 'get', '');
    // console.log("Category service: ", dataResponse);
    return dataResponse;
  }

}
