import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class Toastr {
  constructor(private toastr: ToastrService) {}

  public toastSuccess(message: any, title: any) {
    this.toastr.success(message, title, {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      extendedTimeOut: 1000,
      enableHtml: true,
      timeOut: 4000,
    });
  }

  public toastError(message: any, title: any) {
    this.toastr.error(message, title, {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      extendedTimeOut: 1000,
      enableHtml: true,
      timeOut: 4000,
    });
  }

  public toastWarning(message: any, title: any) {
    this.toastr.warning(message, title, {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      extendedTimeOut: 1000,
      enableHtml: true,
      timeOut: 4000,
    });
  }

  public toastInfo(message: any, title: any) {
    this.toastr.info(message, title, {
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      extendedTimeOut: 1000,
      enableHtml: true,
      timeOut: 4000,
    });
  }
}
