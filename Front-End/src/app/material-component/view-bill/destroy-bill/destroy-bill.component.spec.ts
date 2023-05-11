/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DestroyBillComponent } from './destroy-bill.component';

describe('DestroyBillComponent', () => {
  let component: DestroyBillComponent;
  let fixture: ComponentFixture<DestroyBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestroyBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
