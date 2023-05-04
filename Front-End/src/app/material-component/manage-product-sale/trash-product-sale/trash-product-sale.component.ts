import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { RestoreAllProductSaleComponent } from '../restore-all-product-sale/restore-all-product-sale.component';
import { RestoreProductSaleComponent } from '../restore-product-sale/restore-product-sale.component';
import { DestroyProductSaleComponent } from '../destroy-product-sale/destroy-product-sale.component';
import { ClearProductSaleComponent } from '../clear-product-sale/clear-product-sale.component';
@Component({
  selector: 'app-trash-product-sale',
  templateUrl: './trash-product-sale.component.html',
  styleUrls: ['./trash-product-sale.component.scss']
})
export class TrashProductSaleComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'name',
    'categoryName',
    'image',
    'description',
    'price',
    'sale',
    'quantity',
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
    private productSaleService: ProductSaleService,
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
    let response = await this.productSaleService.getTrashProducts(
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
    const dialogRef = this.dialog.open(RestoreProductSaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onRestore.subscribe(
      (response) => {
        this.router.navigate(['/cafe/product-sales']);
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
    const dialogRef = this.dialog.open(DestroyProductSaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onDestroy.subscribe(
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
    const dialogRef = this.dialog.open(RestoreAllProductSaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onRestoreAll.subscribe(
      (response) => {
        this.router.navigate(['/cafe/product-sales']);
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
    const dialogRef = this.dialog.open(ClearProductSaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onClear.subscribe(
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
    this.router.navigate(['/cafe/product-sales']);
  }

}
