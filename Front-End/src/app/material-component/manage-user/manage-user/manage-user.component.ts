import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Toastr } from 'src/app/services/toastr.service';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
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
    private ngX: NgxUiLoaderService,
    private user: UserService,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    this.ngX.start();
    this.tableData(10, 0, this.valueSearch);
  }

  async tableData(pageSize: number, pageIndex: number, value: string) {
    let response = await this.user.getUsers(pageSize, pageIndex, value);
    this.ngX.stop();
    if (response.results.responseCode == '200') {
      this.dataSource = new MatTableDataSource(response.results.data);
      this.length = response.results.dataCount;
      this.dataSource.sort = this.sort;
      this.responseMessage = response.results.message;
    } else {
      this.ngX.stop();
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }

  searchAction() {
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  async pageChangeEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  async handleChangeAction(status: any, id: any) {
    this.ngX.start();
    var data = {
      status: status.toString(),
      id: id,
    };
    let response = await this.user.update(data);
    if (response.results.responseCode == '200') {
      this.ngX.stop();
      this.toastr.toastSuccess(`${response.results.message}`, 'Thành công');
    } else {
      this.ngX.stop();
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }
}
