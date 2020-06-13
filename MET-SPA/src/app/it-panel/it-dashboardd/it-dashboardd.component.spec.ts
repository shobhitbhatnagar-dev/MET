/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ItDashboarddComponent } from './it-dashboardd.component';

describe('ItDashboarddComponent', () => {
  let component: ItDashboarddComponent;
  let fixture: ComponentFixture<ItDashboarddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItDashboarddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItDashboarddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
