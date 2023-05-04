import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategorySaleService } from 'src/app/services/category-sale/category-sale.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-page-filters',
  templateUrl: './page-filters.component.html',
  styleUrls: ['./page-filters.component.scss'],
})
export class PageFiltersComponent implements OnInit {
  categories: any[] = [];
  @Output() showCategory = new EventEmitter<string>();

  constructor(private __category: CategoryService, private __toastr: Toastr, private categorySaleService: CategorySaleService) {}

  ngOnInit(): void {
    this.getLstCategory();
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  async getLstCategory() {
    let res = await this.categorySaleService.lstCategory();
    if (res.results.responseCode == '200') {
      this.categories = res.results.data;
      this.categories.unshift({
        id: '',
        name: 'Tất cả',
      });
    } else {
      this.__toastr.toastWarning('Không có danh mục nào', 'Cảnh báo');
    }
  }
}
