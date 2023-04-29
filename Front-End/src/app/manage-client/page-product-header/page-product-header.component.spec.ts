import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProductHeaderComponent } from './page-product-header.component';

describe('PageProductHeaderComponent', () => {
  let component: PageProductHeaderComponent;
  let fixture: ComponentFixture<PageProductHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProductHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProductHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
