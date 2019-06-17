import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedCouponsComponent } from './applied-coupons.component';

describe('AppliedCouponsComponent', () => {
  let component: AppliedCouponsComponent;
  let fixture: ComponentFixture<AppliedCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedCouponsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});