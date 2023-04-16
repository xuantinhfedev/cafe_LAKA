import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clear-product',
  templateUrl: './clear-product.component.html',
  styleUrls: ['./clear-product.component.scss'],
})
export class ClearProductComponent implements OnInit {
  onDestroyAllCategory = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
