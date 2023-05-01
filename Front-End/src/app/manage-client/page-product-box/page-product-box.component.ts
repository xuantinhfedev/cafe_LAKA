import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
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
  selector: 'app-page-product-box',
  templateUrl: './page-product-box.component.html',
  styleUrls: ['./page-product-box.component.scss'],
})
export class PageProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: data | undefined;   
  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
