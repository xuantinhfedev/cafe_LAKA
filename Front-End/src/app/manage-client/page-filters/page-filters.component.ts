import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-page-filters',
  templateUrl: './page-filters.component.html',
  styleUrls: ['./page-filters.component.scss'],
})
export class PageFiltersComponent implements OnInit {
  categories = ['Cafe pha phin', 'Bánh'];

  constructor(private __category: CategoryService) {}

  ngOnInit(): void {
    // this.getLstCategory();
  }

  async getLstCategory() {
    let res = await this.__category.getLstPageCategory();
  }
}
