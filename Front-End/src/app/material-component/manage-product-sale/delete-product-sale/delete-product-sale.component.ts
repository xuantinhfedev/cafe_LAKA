import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-product-sale',
  templateUrl: './delete-product-sale.component.html',
  styleUrls: ['./delete-product-sale.component.scss']
})
export class DeleteProductSaleComponent implements OnInit {
  onDelete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
