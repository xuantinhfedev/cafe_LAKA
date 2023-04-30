import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-page-product-box',
  templateUrl: './page-product-box.component.html',
  styleUrls: ['./page-product-box.component.scss'],
})
export class PageProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: 'CAFE pha phin nóng',
    price: 50000,
    category: 'CAFE PHA PHIN',
    description: 'description',
    image: 'https://via.placeholder.com/150',
  };
  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
