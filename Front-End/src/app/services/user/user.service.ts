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

  async signUp(data: any) {
    let dataResponse = await this.baseService.postService(
      data,
      api_url + 'signup',
      ''
    );
    return dataResponse;
  }
}
