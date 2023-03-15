import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  path: string;
  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.path = environment.apiUrl;
  }

  async postService(data: any, url: string, host: string) {
    console.log(data)
    try {
      let response = await this.http
        .post<any>(`${this.path}/${url}`, data, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        })
        .toPromise();
        console.log("Bước 1: ", response);
      if (response && response?.status == 200) {
        console.log("Bước 2: ");

        let dataRest = response?.body;
        console.log("Bước 3: ", dataRest);
        if (dataRest.status != '200') {
          console.log("Bước 3.1: ");
          this.toastr.warning(`${dataRest.message}`, 'Cảnh báo', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            newestOnTop: true,
          });
        } else {
          console.log("Bước 3.2: ");
          return dataRest;
        }
      } else {
        console.log("Bước 2.1: ");

        this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
          timeOut: 5000,
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
        });
      }
    } catch (error) {
      console.log("Catch err: ");

      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
    }
    return null;
  }

  async getService(url: string, host: string) {
    try {
      let response = await this.http
        .get<any>(`${this.path}/${url}`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        })
        .toPromise();

      let status = response?.status;
      let dataRest = response?.body;
      if (status == 200 && dataRest) {
        if (dataRest.result.responseCode != '200') {
          this.toastr.warning(`${dataRest.message}`, 'Cảnh báo', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            newestOnTop: true,
          });
        } else {
          return dataRest;
        }
      } else {
        this.toastr.error('Cảnh báo', `Có lỗi xảy ra vui lòng thử lại sau`, {
          timeOut: 5000,
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
        });
      }
    } catch (error) {
      this.toastr.error('Cảnh báo', `Có lỗi xảy ra vui lòng thử lại sau`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
    }
    return null;
  }

  async deleteService(url: string, host: string) {
    try {
      let response = await this.http
        .delete<any>(`${this.path}/${url}`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        })
        .toPromise();

      let status = response?.status;
      let dataRest = response?.body;
      if (status == 200 && dataRest) {
        if (dataRest.result.responseCode != '200') {
          this.toastr.warning(`${dataRest.message}`, 'Cảnh báo', {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
            newestOnTop: true,
          });
        } else {
          return dataRest;
        }
      } else {
        this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
          timeOut: 5000,
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
        });
      }
    } catch (error) {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
    }
    return null;
  }
}
