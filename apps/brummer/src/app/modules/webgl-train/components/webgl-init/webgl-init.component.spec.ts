/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WebglInitComponent } from './webgl-init.component';

describe('WebglInitComponent', () => {
  let component: WebglInitComponent;
  let fixture: ComponentFixture<WebglInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebglInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
