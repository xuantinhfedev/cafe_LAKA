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

  removeToCart(item: CartItem) {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });

    this.__toastr.toastInfo('1 sản phẩm đã bỏ ra khỏi giỏ hàng', 'Thông báo');
  }

  addToCart(item: CartItem) {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.__toastr.toastInfo(
      '1 sản phẩm được thêm vào giỏ hàng',
      'Thông báo'
    );
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

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (update) {
      this.cart.next({
        items: filteredItems,
      });
      this.__toastr.toastInfo('Sản phẩm đã bị xóa khỏi giỏ hàng', 'Thông báo');
    }

    return filteredItems;
  }
}
