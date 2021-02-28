/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrainShaderComponent } from './train-shader.component';

describe('TrainShaderComponent', () => {
  let component: TrainShaderComponent;
  let fixture: ComponentFixture<TrainShaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainShaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainShaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
