import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from 'src/app/manage-client/cart.model';
import { Toastr } from '../toastr.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private __toastr: Toastr) {}

  addToCart(item: CartItem) {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.__toastr.toastSuccess(
      'Sản phẩm được thêm vào giỏ hàng thành công',
      'Thông báo'
    );
    // console.log(this.cart.value);
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart() {
    this.cart.next({ items: [] });
    this.__toastr.toastInfo(
      'Không có sản phẩm nào còn trong giỏ hàng',
      'Thông báo'
    );
  }

  removeFromCart(item: CartItem) {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    console.log(filteredItems);

    this.cart.next({
      items: filteredItems,
    });

    this.__toastr.toastInfo('Sản phẩm đã bị xóa khỏi giỏ hàng', 'Thông báo');
  }
}
