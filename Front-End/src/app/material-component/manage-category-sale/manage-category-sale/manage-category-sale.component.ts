import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategorySaleComponent } from '../category-sale/category-sale.component';
import { MatSort } from '@angular/material/sort';
import { CategorySaleService } from 'src/app/services/category-sale/category-sale.service';
import { DeleteCategorySaleComponent } from '../delete-category-sale/delete-category-sale.component';
@Component({
  selector: 'app-manage-category-sale',
  templateUrl: './manage-category-sale.component.html',
  styleUrls: ['./manage-category-sale.component.scss'],
})
export class ManageCategorySaleComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'edit'];
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

  // Hàm thực hiện tìm kiếm tên danh mục
  async searchNameCategory() {

    this.pageSize = 10;
    this.pageIndex = 0;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  // Xử lý phân trang
  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch)
  }

  // Hàm thực hiện lấy danh sách bản ghi
  async tableData(pageSize: number, pageIndex: number, value: string) {
    let response = await this.categorySaleService.getCategories(
      pageSize,
      pageIndex,
      value
    );
    if (response.results.responseCode == '200') {
      this.ngxService.stop();
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

   //
   handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(CategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe(
      (response) => {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
      }
    );
  }

  //
  handleEditAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(CategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      // console.log('Router event: ', this.router.events);
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEdit.subscribe(
      (response) => {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
      }
    );
  }

  //
  handleDeleteAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'chuyển danh mục này vào thùng rác',
      action: 'Delete',
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(DeleteCategorySaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onDelete.subscribe(
      (response) => {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
      }
    );
  }

  //
  handleRouterToTrash() {
    this.router.navigate(['/cafe/category-sales/trash-category-sales']);
  }
}
