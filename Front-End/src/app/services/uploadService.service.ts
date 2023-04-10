import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  path: string;
  constructor(
    private http: HttpClient,
    private __ngUiService: NgxUiLoaderService
  ) {
    this.path = environment.apiUrl;

  }

  async postService(data: any, url: string, host: string) {
    try {
      let response = await this.http
        .post<any>(`${this.path}/${url}`, data, {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        })
        .toPromise();
      let status = response?.status;
      let dataRest = response?.body;
      if (status == 200 && dataRest) {
        if (dataRest.code != '200') {
          this.__ngUiService.stop();

          return dataRest;
        } else {
          return dataRest;
        }
      } else {
        this.__ngUiService.stop();
        return dataRest;
      }
    } catch (error) {
      this.__ngUiService.stop();
    }
    return null;
  }
}
