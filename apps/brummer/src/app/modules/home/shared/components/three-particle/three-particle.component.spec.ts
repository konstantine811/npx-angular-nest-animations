/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThreeParticleComponent } from './three-particle.component';

describe('ThreeParticleInteractiveComponent', () => {
  let component: ThreeParticleComponent;
  let fixture: ComponentFixture<ThreeParticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeParticleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeParticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
