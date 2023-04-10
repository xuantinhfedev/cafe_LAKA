import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {
  onDeleteProduct = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
