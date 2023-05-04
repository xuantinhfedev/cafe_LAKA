import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductSaleService } from 'src/app/services/product-sale/product-sale.service';
import { Toastr } from 'src/app/services/toastr.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AddProductSaleComponent } from '../add-product-sale/add-product-sale.component';
import { EditProductSaleComponent } from '../edit-product-sale/edit-product-sale.component';
import { DeleteProductSaleComponent } from '../delete-product-sale/delete-product-sale.component';
@Component({
  selector: 'app-manage-product-sale',
  templateUrl: './manage-product-sale.component.html',
  styleUrls: ['./manage-product-sale.component.scss'],
})
export class ManageProductSaleComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'name',
    'categoryName',
    'image',
    'description',
    'price',
    'sale',
    'hot',
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
  pageSizeOptions = [10, 20, 30, 50];

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
    let response = await this.productSaleService.getProducts(
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

  async pageChangeEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
    // console.log('Phân trang: ', event);
  }

  async handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(AddProductSaleComponent, dialogConfig);
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

  async handleRouterToTrash() {
    this.router.navigate(['/cafe/product-sales/trash-product-sales']);
  }

  async searchNameProduct() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
  }

  async handleEditAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(EditProductSaleComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEdit.subscribe(
      (response) => {
        
        this.tableData(this.pageSize, this.pageIndex, this.valueSearch);
      }
    );
  }

  async handleDeleteAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `chuyển sản phẩm ${element.name} vào thùng rác`,
      action: 'Delete',
      data: element,
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(DeleteProductSaleComponent, dialogConfig);
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

  async onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id
    }
    let res = await this.productSaleService.updateStatus(data);
    if(res.results.responseCode == '200') {
      this.toastr.toastSuccess('Cập nhật trạng thái thành công', 'Thành công')
    }else{
      this.toastr.toastWarning('Cập nhật trạng thái thất bại', 'Thất bại')
    }
  }

  async onChangeHot(hot: any, id: any) {
    console.log(hot, id)
    var data = {
      hot: hot.toString(),
      id: id
    }
    let res = await this.productSaleService.updateHot(data);
    if(res.results.responseCode == '200') {
      this.toastr.toastSuccess('Cập nhật độ hot thành công', 'Thành công')
    }else{
      this.toastr.toastWarning('Cập nhật độ hot thất bại', 'Thất bại')
    }
  }
}
