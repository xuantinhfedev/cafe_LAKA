import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill/bill.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { saveAs } from 'file-saver';
import { ViewBillProductsComponent } from '../../dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from '../../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-trash-bill',
  templateUrl: './trash-bill.component.html',
  styleUrls: ['./trash-bill.component.scss'],
})
export class TrashBillComponent implements OnInit { 
  displayedColumns: string[] = [
    'name',
    'email',
    'contactNumber',
    'paymentMethod',
    'total',
    'view',
  ];
  dataSource: any;
  responseMessage: any;
  valueSearch: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort)
  sort!: MatSort;
  // pagination
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30, 50];

  constructor(
    private __bill: BillService,
    private __ngUi: NgxUiLoaderService,
    private __dialog: MatDialog,
    private __toastr: Toastr,
    private __route: Router
  ) {}

  ngOnInit() {
    this.__ngUi.start();
    this.tableData(10, 0, this.valueSearch);
    this.__ngUi.stop();
  }

  async tableData(pageSize: number, pageIndex: number, value: string) {
    let response = await this.__bill.getBillsInTrash(pageSize, pageIndex, value);
    if (response.results.responseCode == '200') {
      this.dataSource = new MatTableDataSource(response.results.data);
      this.length = response.results.dataCount;
      this.dataSource.sort = this.sort;
      this.responseMessage = response.results.message;
    } else {
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.__toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }

  // downloadReportAction(values: any) {
  //   this.__ngUi.start();
  //   var data = {
  //     name: values.name,
  //     email: values.email,
  //     uuid: values.uuid,
  //     contactNumber: values.contactNumber,
  //     paymentMethod: values.paymentMethod,
  //     totalAmount: values.total,
  //     productDetails: values.productDetails,
  //   };
  //   this.__bill.getPDF(data).subscribe((res) => {
  //     saveAs(res, values.uuid + '.pdf');
  //     this.__ngUi.stop();
  //   });
  // }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values,
    };
    dialogConfig.width = '70%';
    const dialogRef = this.__dialog.open(
      ViewBillProductsComponent,
      dialogConfig
    );
    this.__route.events.subscribe(() => {
      dialogRef.close();
    });
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'xóa bill ' + values.name,
    };
    const dialogRef = this.__dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (res) => {
        this.__ngUi.start();
        this.deleteProduct(values.id);
        this.__ngUi.stop();
        dialogRef.close();
      }
    );
  }

  async deleteProduct(id: any) {
    let res = await this.__bill.moveTrash(id);
    if (res.results.responseCode == '200') {
      this.__toastr.toastSuccess('Đã xóa hóa đơn thành công.', 'Thành công');
      this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
    } else {
      if (res.results.message) {
        this.responseMessage = res.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.__toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }

  async searchNameProduct() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  async pageChangeEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  return(){
    this.__route.navigate(['/cafe/bill'])
  }
}
