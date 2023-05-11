import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillService } from 'src/app/services/bill/bill.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-destroy-bill',
  templateUrl: './destroy-bill.component.html',
  styleUrls: ['./destroy-bill.component.scss']
})
export class DestroyBillComponent implements OnInit {
  onDestroyCategory = new EventEmitter();
  responseMessage: any;
  details: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private billService: BillService,
    public dialogRef: MatDialogRef<DestroyBillComponent>,
    private toastr: Toastr
  ) { }

  ngOnInit() {
    if(this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async destroy() {
    var data = {
      id: this.dialogData.data.id,
    };
    let response = await this.billService.destroy(data.id);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onDestroyCategory.emit();
      this.responseMessage = response.results.message;
      this.toastr.toastSuccess(this.responseMessage, 'Thành công');
    } else {
      this.dialogRef.close();
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }
}
