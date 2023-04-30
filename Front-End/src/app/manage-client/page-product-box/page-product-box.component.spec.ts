import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProductBoxComponent } from './page-product-box.component';

describe('PageProductBoxComponent', () => {
  let component: PageProductBoxComponent;
  let fixture: ComponentFixture<PageProductBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProductBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProductBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
