/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearnThreeGeomCustomComponent } from './learn-three-geom-custom.component';

describe('LearnThreeGeomCustomComponent', () => {
  let component: LearnThreeGeomCustomComponent;
  let fixture: ComponentFixture<LearnThreeGeomCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnThreeGeomCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnThreeGeomCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
