import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsLayoutComponent } from './terms-conditions-layout.component';

describe('TermsConditionsLayoutComponent', () => {
  let component: TermsConditionsLayoutComponent;
  let fixture: ComponentFixture<TermsConditionsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
