/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategorySaleService } from './category-sale.service';

describe('Service: CategorySale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategorySaleService]
    });
  });

  it('should ...', inject([CategorySaleService], (service: CategorySaleService) => {
    expect(service).toBeTruthy();
  }));
});
