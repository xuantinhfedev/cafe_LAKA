import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategorySaleService } from 'src/app/services/category-sale/category-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { TrashAllCategorySaleComponent } from '../trash-all-category-sale/trash-all-category-sale.component';

import { TrashOneCategorySaleComponent } from '../trash-one-category-sale/trash-one-category-sale.component';

@Component({
  selector: 'app-trash-category-sale',
  templateUrl: './trash-category-sale.component.html',
  styleUrls: ['./trash-category-sale.component.scss']
})
export class TrashCategorySaleComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'edit'];
  dataSource: any;
  responseMessage: string = '';
  valueSearch: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  // pagination
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30];

  // end pagination
  constructor(
    private categorySaleService: CategorySaleService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: Toastr
  ) {}


  ngOnInit() {
    this.ngxService.start();
    this.tableData(10, 0, this.valueSearch);
  }

  // Hàm thực hiện lấy danh sách bản ghi
  async tableData(pageSize: number, pageIndex: number, value: string) {
    let response = await this.categorySaleService.trashCategory(
      pageSize,
      pageIndex,
      value
    );
    if (response.results.responseCode == '200') {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response.results.data);
      this.dataSource.sort = this.sort;
      this.length = response.results.dataCount;
      this.responseMessage = response.results.message;
      this.toastr.toastSuccess(this.responseMessage, 'Thành công');
    } else {
      this.ngxService.stop();
      if (response.results.message) {
        this.responseMessage = response.results.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.toastr.toastError(this.responseMessage, 'Lỗi');
    }
  }

  async searchNameCategory() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch)
  }

  async handleRestoreAllAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'restoreAll',
      message: 'khôi phục tất cả danh mục từ trong thùng rác',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(TrashAllCategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onRestoreAllCategory.subscribe(
      (response) => {
        this.router.navigate(['/cafe/category-sales']);
      }
    );
  }

  async handleDestroyAllAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'destroyAll',
      message: 'xóa tất cả danh mục có trong thùng rác',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(TrashAllCategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onDestroyAllCategory.subscribe(
      (response) => {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
      }
    );
  }

  async handleBackUpAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'restore',
      message: 'khôi phục danh mục này',
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(TrashOneCategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onRestoreCategory.subscribe(
      (response) => {
        this.router.navigate(['/cafe/category-sales']);
      }
    );
  }

  async handleDestroyAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'destroy',
      message: 'xóa bỏ hoàn toàn danh mục này',
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(TrashOneCategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onDestroyCategory.subscribe(
      (response) => {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
      }
    );
  }

  returnCategory() {
    this.router.navigate(['/cafe/category-sales']);
  }

}
