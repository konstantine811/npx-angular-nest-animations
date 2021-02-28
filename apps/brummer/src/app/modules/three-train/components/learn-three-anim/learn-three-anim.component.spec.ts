/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearnThreeAnimComponent } from './learn-three-anim.component';

describe('LearnThreeAnimComponent', () => {
  let component: LearnThreeAnimComponent;
  let fixture: ComponentFixture<LearnThreeAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnThreeAnimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnThreeAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
