import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-page-filters',
  templateUrl: './page-filters.component.html',
  styleUrls: ['./page-filters.component.scss'],
})
export class PageFiltersComponent implements OnInit {
  categories: any[] = [];

  constructor(private __category: CategoryService, private __toastr: Toastr) {}

  ngOnInit(): void {
    this.getLstCategory();
  }

  async getLstCategory() {
    let res = await this.__category.lstCategory();
    console.log(res);
    if (res.results.responseCode == '200') {
      this.categories = res.results.data;
    } else {
      this.__toastr.toastWarning('Không có danh mục nào', 'Cảnh báo');
    }
  }
}
