import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.scss'],
})
export class PageCartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'CAFE pha phin',
        price: 50000,
        sale: 0,
        quantityRemain: 999,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'CAFE pha phin',
        price: 50000,
        sale: 0,
        quantityRemain: 999,
        quantity: 2,
        id: 1,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<String> = [
    'product',
    'name',
    'price',
    'sale',
    'quantityRemain',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(element: any) {
    return (
      element.quantity * (element.price - (element.price * element.sale) / 100)
    );
  }

  getSumTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  async onCheckout() {
    this.http
      .post('http://localhost:8080/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        sessionStorage.removeItem('items');
        let stripe = await loadStripe(
          'pk_test_51MtO0CCDpSxvrGONe1PuenYrLa4gVAXoX8uoFX3n208hNk8cqEaOqFfEGSNryS3Cu4ptKAtiFlB44oiYtRQWWf5J00iaEOq7qt'
        );
        let resp = await this.cartService.updateQuantity(this.cart.items);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });

  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    if (item.quantityRemain <= 0) {
      Swal.fire(
        'Thông báo',
        'Số lượng còn lại của sản phẩm không đủ. Xin lỗi vì sự bất tiện này',
        'info'
      );
      return;
    }
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeToCart(item);
  }
}
