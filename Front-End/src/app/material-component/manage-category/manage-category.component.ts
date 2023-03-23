import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category/category.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: string = '';
  valueSearch: string = "";

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  @ViewChild(MatSort)
  sort!: MatSort;

  // pagination
  length = 0
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 30];

  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  // end pagination

  constructor(
    private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: Toastr
  ) {}

  ngOnInit() {
    this.ngxService.start();
    this.tableData();
  }

  // Hàm thực hiện tìm kiếm tên danh mục
  async searchNameCategory() {

    if(this.valueSearch == ""){
      this.tableData();
      return;
    }
    let response = await this.categoryService.getSearchCategory(this.valueSearch);
    if (response.results.responseCode == '200') {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response.results.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = response.results.dataCount;
      console.log(this.dataSource.paginator)
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

  // Hàm thực hiện lấy danh sách bản ghi
  async tableData() {
    let response = await this.categoryService.getCategorys();
    if (response.results.responseCode == '200') {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response.results.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator.length = response.results.dataCount;
      console.log(this.dataSource.paginator)
      console.log(this.dataSource.sort);
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

  //
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //
  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableData();
      }
    )

  }

  //
  handleEditAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: element
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (response) => {
        this.tableData();
      }
    )

  }
}
