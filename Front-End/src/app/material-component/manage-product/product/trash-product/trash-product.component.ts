import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product/product.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { RestoreProductComponent } from '../restore-product/restore-product.component';
import { DestroyProductComponent } from '../destroy-product/destroy-product.component';
import { RestoreAllProductComponent } from '../restore-all-product/restore-all-product.component';
import { ClearProductComponent } from '../clear-product/clear-product.component';

@Component({
  selector: 'app-trash-product',
  templateUrl: './trash-product.component.html',
  styleUrls: ['./trash-product.component.scss'],
})
export class TrashProductComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'name',
    'categoryName',
    'image',
    'description',
    'price',
    'edit',
  ];
  dataSource: any;
  responseMessage: string = '';
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
  pageSizeOptions = [10, 20, 30];
  constructor(
    private productService: ProductService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    this.ngxService.start();
    this.tableData(10, 0, this.valueSearch);
  }

  async tableData(pageSize: number, pageIndex: number, value: string) {
    let response = await this.productService.getTrashProducts(
      pageSize,
      pageIndex,
      value
    );
    this.ngxService.stop();
    if (response.results.responseCode == '200') {
      this.dataSource = new MatTableDataSource(response.results.data);
      this.length = response.results.dataCount;
      this.dataSource.sort = this.sort;
      this.responseMessage = response.results.message;
      // this.toastr.toastSuccess(this.responseMessage, 'Thành công');
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

  async searchNameProduct() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  async handleRestoreAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'restore',
      message: 'khôi phục sản phẩm này',
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(RestoreProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onRestoreCategory.subscribe(
      (response) => {
        this.router.navigate(['/cafe/product']);
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
    const dialogRef = this.dialog.open(DestroyProductComponent, dialogConfig);
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

  async handleRestoreAllAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'restoreAll',
      message: 'khôi phục tất cả danh mục từ trong thùng rác',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(RestoreAllProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onRestoreAllCategory.subscribe(
      (response) => {
        this.router.navigate(['/cafe/product']);
      }
    );
  }

  async handleClearAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'destroyAll',
      message: 'xóa tất cả danh mục có trong thùng rác',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(ClearProductComponent, dialogConfig);
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

  async pageChangeEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  returnCategory() {
    this.router.navigate(['/cafe/product']);
  }
}
