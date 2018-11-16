import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsPageComponent } from './terms-conditions-page.component';

describe('TermsConditionsPageComponent', () => {
  let component: TermsConditionsPageComponent;
  let fixture: ComponentFixture<TermsConditionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsConditionsPageComponent]
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
