/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrashBillComponent } from './trash-bill.component';

describe('TrashBillComponent', () => {
  let component: TrashBillComponent;
  let fixture: ComponentFixture<TrashBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
