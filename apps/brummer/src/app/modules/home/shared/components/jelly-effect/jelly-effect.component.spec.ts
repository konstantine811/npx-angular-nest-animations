/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JellyEffectComponent } from './jelly-effect.component';

describe('JellyEffectComponent', () => {
  let component: JellyEffectComponent;
  let fixture: ComponentFixture<JellyEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JellyEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JellyEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
