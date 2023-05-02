import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { UploadService } from '../uploadService.service';

const api_url = 'contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private baseService: BaseService,
    private uploadService: UploadService
  ) {}

  async postData(data: any) {
    let res = await this.baseService.postService(data, api_url + '/send', '');
    return res;
  }

  async getData(pageSize: any, pageIndex: any, value: any){
    let res = await this.baseService.getService(
      `${api_url}/get?pageSize=${pageSize}&pageIndex=${pageIndex}&value=${value}`, ``
    )

    return res;
  }
  
  async update(data: any) {
    let res = await this.baseService.patchService(
      data,
      `${api_url}/update`,
      ''
    );
    return res;
  }
}
