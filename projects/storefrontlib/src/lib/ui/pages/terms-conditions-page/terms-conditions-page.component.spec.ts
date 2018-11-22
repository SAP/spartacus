import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TermsConditionsPageComponent } from './terms-conditions-page.component';

@Component({
  selector: 'cx-terms-conditions-layout',
  template: ''
})
export class MockTermsConditionsLayoutComponent {}

describe('TermsConditionsPageComponent', () => {
  let component: TermsConditionsPageComponent;
  let fixture: ComponentFixture<TermsConditionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TermsConditionsPageComponent,
        MockTermsConditionsLayoutComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
