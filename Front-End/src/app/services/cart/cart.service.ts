import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from 'src/app/manage-client/cart.model';
import { Toastr } from '../toastr.service';
import { BaseService } from '../base.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private __toastr: Toastr, private baseService: BaseService) {
    let getItems = sessionStorage.getItem('items');
    if (getItems) {
      this.cart.value.items = JSON.parse(getItems);
    }
  }

  removeToCart(item: CartItem) {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        _item.quantityRemain++;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    sessionStorage.setItem('items', JSON.stringify(filteredItems));

    this.cart.next({ items: filteredItems });

    this.__toastr.toastInfo('1 sản phẩm đã bỏ ra khỏi giỏ hàng', 'Thông báo');
  }

  addToCart(item: CartItem) {
    let quantityHold = item.quantityRemain;
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
      itemInCart.quantityRemain -= 1;
      quantityHold = itemInCart.quantityRemain;
    } else {
      items.push(item);
    }
    console.log(quantityHold);
    if (quantityHold <= 0) {
      Swal.fire('Thông báo', 'Số lượng còn lại của sản phẩm không đủ. Xin lỗi vì sự bất tiện này', 'info');
      return;
    }

    sessionStorage.setItem('items', JSON.stringify(items));

    this.cart.next({ items });
    this.__toastr.toastInfo('1 sản phẩm được thêm vào giỏ hàng', 'Thông báo');
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map(
        (item) => (item.price - (item.price * item.sale) / 100) * item.quantity
      )
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart() {
    sessionStorage.removeItem('items');
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
      sessionStorage.setItem('items', JSON.stringify(filteredItems));
      this.cart.next({
        items: filteredItems,
      });
      this.__toastr.toastInfo('Sản phẩm đã bị xóa khỏi giỏ hàng', 'Thông báo');
    }

    return filteredItems;
  }

  async updateQuantity(data: any) {
    let res = await this.baseService.putService(data, `${api_url}`, ``);
    return res;
  }
}

const api_url = 'productSale/subtract';
