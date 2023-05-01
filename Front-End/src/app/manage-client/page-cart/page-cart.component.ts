import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatStepper } from '@angular/material/stepper';
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
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'CAFE pha phin',
        price: 50000,
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
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;

    });
  }

  getTotal(element: any) {
    return element.quantity * element.price;
  }

  getSumTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem){
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem){
    this.cartService.removeToCart(item)
  }
}
