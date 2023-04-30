import { Component, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.scss'],
})
export class ManageClientComponent implements OnInit {
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }

  constructor(private cartService: CartService) {}

  cart: Cart = { items: [] };
}
