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
      if (response && response?.status == 200) {
        let dataRest = response?.body;
        if (dataRest.status != '200') {
          return dataRest;
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
        let dataRest = response?.body;
        return dataRest;
      }
    } catch (error) {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
      const results = {
        responseCode: '404',
        message: 'Đã có lỗi xảy ra.',
      };
      return results;
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
        if (dataRest.results.responseCode != '200') {
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
        return dataRest;
      }
    } catch (error) {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
      const results = {
        responseCode: '404',
        message: 'Đã có lỗi xảy ra.',
      };
      return results;
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
          if (dataRest.results.responseCode != '200') {
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
          return dataRest;
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

  async patchService(data: any, url: string, host: string) {
    try {
      let response = await this.http
        .patch<any>(`${this.path}/${url}`, data, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        })
        .toPromise();
      if (response && response?.status == 200) {
        let dataRest = response?.body;
        if (dataRest.status != '200') {
          return dataRest;
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
        let dataRest = response?.body;
        return dataRest;
      }
    } catch (error) {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
      const results = {
        responseCode: '404',
        message: 'Đã có lỗi xảy ra.',
      };
      return results;
    }
    return null;
  }

  async putService(data: any, url: string, host: string) {
    try {
      let response = await this.http
        .put<any>(`${this.path}/${url}`, data, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        })
        .toPromise();
      if (response && response?.status == 200) {
        let dataRest = response?.body;
        if (dataRest.status != '200') {
          return dataRest;
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
        let dataRest = response?.body;
        return dataRest;
      }
    } catch (error) {
      this.toastr.error('Có lỗi xảy ra vui lòng thử lại sau', `Lỗi`, {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
        newestOnTop: true,
      });
      const results = {
        responseCode: '404',
        message: 'Đã có lỗi xảy ra.',
      };
      return results;
    }
    return null;
  }


}
