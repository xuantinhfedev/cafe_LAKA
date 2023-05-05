/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LiveChatComponent } from './live-chat.component';

describe('LiveChatComponent', () => {
  let component: LiveChatComponent;
  let fixture: ComponentFixture<LiveChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
