import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-product-header',
  templateUrl: './page-product-header.component.html',
  styleUrls: ['./page-product-header.component.scss'],
})
export class PageProductHeaderComponent implements OnInit {
  sort = 'tăng dần';
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  itemsShowCount = 12;
  search = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch() {
    this.searchChange.emit(this.search);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onItemsUpdated(count: number): void {
    this.itemsCountChange.emit(count);
    this.itemsShowCount = count;
  }

  onSortUpdated(newSort: string): void {
    if (newSort == 'desc') {
      this.sort = 'giảm dần';
    } else {
      this.sort = 'tăng dần';
    }
    this.sortChange.emit(newSort);
  }
}
