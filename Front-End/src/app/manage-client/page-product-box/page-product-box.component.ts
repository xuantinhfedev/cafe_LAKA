import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-product-box',
  templateUrl: './page-product-box.component.html',
  styleUrls: ['./page-product-box.component.scss']
})
export class PageProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false
  constructor() { }

  ngOnInit(): void {
  }

}
