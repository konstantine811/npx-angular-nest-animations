/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearnThreeSecondComponent } from './learn-three-second.component';

describe('LearnThreeSecondComponent', () => {
  let component: LearnThreeSecondComponent;
  let fixture: ComponentFixture<LearnThreeSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnThreeSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnThreeSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
