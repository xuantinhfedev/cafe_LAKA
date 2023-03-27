/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrashProductComponent } from './trash-product.component';

describe('TrashProductComponent', () => {
  let component: TrashProductComponent;
  let fixture: ComponentFixture<TrashProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
