import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDialogComponent } from './coupon-dialog.component';

describe('CouponDialogComponent', () => {
  let component: CouponDialogComponent;
  let fixture: ComponentFixture<CouponDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
