/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrashCategorySaleComponent } from './trash-category-sale.component';

describe('TrashCategorySaleComponent', () => {
  let component: TrashCategorySaleComponent;
  let fixture: ComponentFixture<TrashCategorySaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashCategorySaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashCategorySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
