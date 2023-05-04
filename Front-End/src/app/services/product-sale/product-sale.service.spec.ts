/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductSaleService } from './product-sale.service';

describe('Service: ProductSale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSaleService]
    });
  });

  it('should ...', inject([ProductSaleService], (service: ProductSaleService) => {
    expect(service).toBeTruthy();
  }));
});
