/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HelloMainComponent } from './hello-main.component';

describe('HelloMainComponent', () => {
  let component: HelloMainComponent;
  let fixture: ComponentFixture<HelloMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
