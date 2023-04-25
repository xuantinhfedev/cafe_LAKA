import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url_environment = environment.apiUrl;
const api_url = 'user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) {}

  // Hàm thực hiện gọi API đăng ký tài khoản
  async signUp(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'signup',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API đăng nhập
  async login(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'login',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API quên mật khẩu
  async forgotPassword(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'forgotPassword',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API kiểm tra token
  async checkToken() {
    let dataResponse = await this.baseService.getService(
      api_url + 'checkToken',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API thay đổi mật khẩu
  async changePassword(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'changePassword',
      ''
    );
    return dataResponse;
  }

  //
  async getUsers(pageSize: number, pageIndex: number, value: string) {
    let res = await this.baseService.getService(
      api_url +
        'get?pageSize=' +
        pageSize +
        '&pageIndex=' +
        pageIndex +
        '&value=' +
        value,
      ''
    );
    return res;
  }

  //
  async update(data: any) {
    let res = await this.baseService.patchService(
      data,
      `${api_url}/update`,
      ''
    );
    return res;
  }
}
