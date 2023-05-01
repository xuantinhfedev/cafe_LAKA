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

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

interface data {
  id: number;
  name: string;
  description: string;
  file_src: string;
  price: number;
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
  total = 0;
  productSubscription: Subscription | undefined;

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
    private ngX: NgxUiLoaderService
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
      this.sort
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

  onAddToCart(product: data) {
    this.cartService.addToCart({
      product: product.file_src,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onShowCategory(event: any) {
    this.category = event.name;
  }

  onColumnsCountChange(event: any) {
    this.cols = event;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onItemsCountChange(event: any) {
    this.pageSize = event;
    this.getProducts();
  }

  onSortChange(event: any) {
    this.sort = event;
    this.getProducts();
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
