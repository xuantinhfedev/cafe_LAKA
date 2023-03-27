/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClearProductComponent } from './clear-product.component';

describe('ClearProductComponent', () => {
  let component: ClearProductComponent;
  let fixture: ComponentFixture<ClearProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
