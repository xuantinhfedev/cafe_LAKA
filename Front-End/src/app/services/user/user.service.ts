import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api_url = 'user/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private baseService: BaseService) {}

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
  async login(data: any){
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'login',
      ''
    );
    return dataResponse;
  }

  // Hàm thực hiện gọi API quên mật khẩu
  async forgotPassword(data: any){
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'forgotPassword',
      ''
    );
    return dataResponse;
  }
}
