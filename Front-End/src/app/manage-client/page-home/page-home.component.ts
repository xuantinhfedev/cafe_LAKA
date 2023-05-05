import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store/store.service';
import { Toastr } from 'src/app/services/toastr.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from 'src/app/contact/contact.component';
import { Router } from '@angular/router';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

interface data {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  sale: number;
  status: string;
  categoryId: number;
  categoryName: string;
}
@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<data> | undefined;
  sort = 'asc';
  search = '';
  pageSize = 12;
  pageIndex = 0;
  categoryId = '';
  total = 0;
  pageSizeOptions = [12, 24, 36];
  productSubscription: Subscription | undefined;
  checkCategory: any = true;
  checkHot: any = false;
  checkSale: any = false;


  slides = [
    { image: './../../../assets/img/page-banner-1.jpg' },
    { image: './../../../assets/img/page-banner-2.jpg' },
    { image: './../../../assets/img/bannner.jpg' },
  ];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private cartService: CartService,
    private storeService: StoreService,
    private toastrService: Toastr,
    private ngX: NgxUiLoaderService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    this.ngX.start();
    let res = await this.storeService.pageAllProducts(
      this.pageSize,
      this.pageIndex,
      this.search,
      this.sort,
      this.categoryId
    );
    if (res.results.responseCode == '200') {
      this.ngX.stop();
      this.products = res.results.data;
      this.total = res.results.dataCount;
    } else {
      this.ngX.stop();
      this.toastrService.toastWarning(
        'Đã có lỗi xảy ra trong quá trình tải trang',
        'Cảnh báo'
      );
    }
  }

  pageChangeEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    if(this.checkHot){
      this.getProductHot()
    }else if(this.checkSale){
      this.getProductSale()
    }else{
      this.getProducts();
    }
    // console.log('Phân trang: ',event)
  }

  onAddToCart(product: data) {
    this.cartService.addToCart({
      product: product.image,
      name: product.name,
      price: product.price,
      sale: product.sale,
      quantityRemain: product.quantity - 1,
      quantity: 1,
      id: product.id,
    });
  }

  onShowCategory(event: any) {
    this.checkCategory = true;
    this.checkHot = false;
    this.checkSale = false;
    this.category = event.name;
    this.categoryId = event.id;
    this.getProducts();
  }

  onColumnsCountChange(event: any) {
    this.cols = event;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onItemsCountChange(event: any) {
    this.pageSize = event;
    this.getProducts();
  }

  onSearchChange(event: any) {
    this.search = event;
    if(this.checkHot){
      this.getProductHot().then(() => {
        if (this.products?.length == 0) {
          Swal.fire(
            `Thông báo`,
            `Không tìm thấy sản phẩm ${event} trong danh sách sản phẩm`,
            'info'
          );
          this.search = '';
          this.sort = 'asc';
          this.pageSize = 12;
          this.pageIndex = 0;
          this.getProductHot();
        }
      })
    }else if(this.checkSale){
      this.getProductSale().then(() => {
        if (this.products?.length == 0) {
          Swal.fire(
            `Thông báo`,
            `Không tìm thấy sản phẩm ${event} trong danh sách sản phẩm`,
            'info'
          );
          this.search = '';
          this.sort = 'asc';
          this.pageSize = 12;
          this.pageIndex = 0;
          this.getProductSale();
        }
      })
    }else{
      this.getProducts().then(() => {
        if (this.products?.length == 0) {
          Swal.fire(
            `Thông báo`,
            `Không tìm thấy sản phẩm ${event} trong danh sách sản phẩm`,
            'info'
          );
          this.search = '';
          this.sort = 'asc';
          this.pageSize = 12;
          this.pageIndex = 0;
          this.getProducts();
        }
      });
    }
  }

  onSortChange(event: any) {
    this.sort = event;

    if(this.checkHot){
      this.getProductHot()
    }else if(this.checkSale){
      this.getProductSale()
    }else{
      this.getProducts();
    }
  }

  async getProductHot() {
    this.ngX.start();

    let res = await this.storeService.pageProductsHot(
      this.pageSize,
      this.pageIndex,
      this.search,
      this.sort,
      this.categoryId
    );
    if (res.results.responseCode == '200') {
      this.ngX.stop();
      this.products = res.results.data;
      this.total = res.results.dataCount;
    } else {
      this.ngX.stop();
      this.toastrService.toastWarning(
        'Đã có lỗi xảy ra trong quá trình tải trang',
        'Cảnh báo'
      );
    }
  }
  async onHot() {
    this.checkCategory = false;
    this.checkHot = true;
    this.checkSale = false;
    this.pageSize = 12;
    this.pageIndex = 0;
    this.search = '';
    this.sort = 'asc';
    this.categoryId = ''
    this.getProductHot();
  }

  async getProductSale() {
    this.ngX.start();
    let res = await this.storeService.pageProductsSale(
      this.pageSize,
      this.pageIndex,
      this.search,
      this.sort,
      this.categoryId
    );
    if (res.results.responseCode == '200') {
      this.ngX.stop();
      this.products = res.results.data;
      this.total = res.results.dataCount;
    } else {
      this.ngX.stop();
      this.toastrService.toastWarning(
        'Đã có lỗi xảy ra trong quá trình tải trang',
        'Cảnh báo'
      );
    }
  }
  async onSale() {
    this.checkCategory = false;
    this.checkHot = true;
    this.checkSale = false;
    this.pageSize = 12;
    this.pageIndex = 0;
    this.search = '';
    this.sort = 'asc';
    this.categoryId = ''
    this.checkCategory = false;
    this.checkHot = false;
    this.checkSale = true;
    this.getProductSale();
  }

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '800px';
    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onContact.subscribe((response) => {
      Swal.fire(
        'Thành công',
        'Cảm ơn bạn đã sử dụng sản phẩm của chúng tôi, hãy kiểm tra Email của bạn thường xuyên khi chúng tôi liên lạc lại nhé',
        'success'
      );
    });
  }

  check = 0;
  showButton() {
    if (this.check == 0) {
      this.check = 1;
    } else {
      this.check = 0;
    }
    console.log(this.check);
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
