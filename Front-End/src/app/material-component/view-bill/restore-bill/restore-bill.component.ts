import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillService } from 'src/app/services/bill/bill.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-restore-bill',
  templateUrl: './restore-bill.component.html',
  styleUrls: ['./restore-bill.component.scss']
})
export class RestoreBillComponent implements OnInit {
  onRestoreCategory = new EventEmitter();
  responseMessage: any;
  details: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<RestoreBillComponent>,
    private toastr: Toastr,
    private billService: BillService
  ) { }

  ngOnInit() {
    if(this.dialogData) {
      this.details = this.dialogData;
    }
  }

  async restore() {
    var data = {
      id: this.dialogData.data.id,
    };
    let response = await this.billService.restore(data);
    if (response.results.responseCode == '200') {
      this.dialogRef.close();
      this.onRestoreCategory.emit();
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
