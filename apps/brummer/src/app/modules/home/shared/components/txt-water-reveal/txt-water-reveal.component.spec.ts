/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TxtWaterRevealComponent } from './txt-water-reveal.component';

describe('TxtWaterRevealComponent', () => {
  let component: TxtWaterRevealComponent;
  let fixture: ComponentFixture<TxtWaterRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtWaterRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtWaterRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
