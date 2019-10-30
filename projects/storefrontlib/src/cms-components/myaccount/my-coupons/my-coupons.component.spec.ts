import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCouponsComponent } from './my-coupons.component';
import {
  I18nTestingModule,
} from '@spartacus/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  const customerCouponService = jasmine.createSpyObj('CustomerCouponService', [
    'getCustomerCoupons',
    'getCustomerCouponsLoading',
    'loadCustomerCoupons',
    'subscribeCustomerCoupon',
    'unsubscribeCustomerCoupon',
    'getSubscribeCustomerCouponResultLoading',
    'getUnsubscribeCustomerCouponResultLoading',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        MyCouponsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    customerCouponService.getCustomerCoupons.and.returnValue(of(''));
    customerCouponService.getCustomerCouponsLoading.and.returnValue(of(false));
    customerCouponService.loadCustomerCoupons.and.stub();
    customerCouponService.getSubscribeCustomerCouponResultLoading.and.returnValue(
      of(true)
    );
    customerCouponService.getUnsubscribeCustomerCouponResultLoading.and.returnValue(
      of(true)
    );
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be able to show message when there is no coupon', () => {
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.cx-section-msg'))
      .nativeElement.textContent;
    expect(!message).toBeFalsy();
  });

  it('should be able to show coupons', () => {
    fixture.detectChanges();

    const message = fixture.debugElement.queryAll(By.css('.cx-section-msg'));
    expect(message.length).toBe(0);

    const sortComponent = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-sorting'
    );
    expect(sortComponent.length).toBe(2);

    const paginationComponent = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-pagination'
    );
    expect(paginationComponent.length).toBe(2);
    const couponCardComponent = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-coupon-card'
    );
    expect(couponCardComponent.length).toBe(2);
  });
  it('should be able to change sort', () => {
    fixture.detectChanges();
    component.sortChange('byStartDateAsc');
    expect(customerCouponService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      0,
      'startDate:asc'
    );
  });
  it('should be able to change page', () => {
    customerCouponService.getCustomerCoupons.and.returnValue(of());
    component.pageChange(1);
    fixture.detectChanges();
    expect(customerCouponService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      1,
      'startDate:asc'
    );
  });

  it('should be able to change coupon notification', () => {
    component.onNotificationChange({
      notification: true,
      couponId: 'CustomerCoupon1',
    });
    expect(customerCouponService.subscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );
    component.onNotificationChange({
      notification: false,
      couponId: 'CustomerCoupon1',
    });
    expect(customerCouponService.unsubscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );
  });
});
