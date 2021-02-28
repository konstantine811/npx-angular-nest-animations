/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimpleBufferGeometryComponent } from './simple-buffer-geometry.component';

describe('SimpleBufferGeometryComponent', () => {
  let component: SimpleBufferGeometryComponent;
  let fixture: ComponentFixture<SimpleBufferGeometryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleBufferGeometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBufferGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
