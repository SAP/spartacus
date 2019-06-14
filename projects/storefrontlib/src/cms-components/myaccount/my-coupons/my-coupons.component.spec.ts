import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCouponsComponent } from './my-coupons.component';
import { Component, Input } from '@angular/core';
import {
  I18nTestingModule,
  CustomerCouponSearchResult,
  UserService,
  CustomerCoupon,
} from '@spartacus/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ListNavigationModule } from '@spartacus/storefront';

const emptyCouponResult: CustomerCouponSearchResult = {
  coupons: [],
  sorts: [{ code: 'startDate', asc: true }],
  pagination: {
    count: 0,
    page: 0,
    totalCount: 0,
    totalPages: 0,
  },
};

const couponResult: CustomerCouponSearchResult = {
  coupons: [
    {
      couponId: 'CustomerCoupon1',
      description: 'CustomerCoupon1',
      endDate: new Date('2019-12-30T23:59:59+0000'),
      name: 'CustomerCoupon1:name',
      notificationOn: false,
      solrFacets: '%3Arelevance%3Acategory%3A1',
      startDate: new Date('1970-01-01T00:00:00+0000'),
      status: 'Effective',
    },
    {
      couponId: 'CustomerCoupon2',
      description: 'CustomerCoupon2',
      endDate: new Date('9999-12-30T23:59:59+0000'),
      name: 'CustomerCoupon2:name',
      notificationOn: false,
      solrFacets: '%3Arelevance%3Acategory%3A1',
      startDate: new Date('2019-01-01T00:00:00+0000'),
      status: 'Effective',
    },
  ],
  sorts: [{ code: 'startDate', asc: true }],
  pagination: {
    count: 5,
    page: 0,
    totalCount: 1,
    totalPages: 1,
  },
};

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-coupon-card',
  template: '',
})
class MockCouponCardComponent {
  @Input() coupon: CustomerCoupon;
  @Input() couponLoading = true;
}

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  const userService = jasmine.createSpyObj('UserService', [
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
      imports: [I18nTestingModule, ListNavigationModule],
      providers: [{ provide: UserService, useValue: userService }],
      declarations: [
        MyCouponsComponent,
        MockSpinnerComponent,
        MockCouponCardComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    userService.getCustomerCoupons.and.returnValue(of(emptyCouponResult));
    userService.getCustomerCouponsLoading.and.returnValue(of(false));
    userService.loadCustomerCoupons.and.stub();
    userService.getSubscribeCustomerCouponResultLoading.and.returnValue(
      of(true)
    );
    userService.getUnsubscribeCustomerCouponResultLoading.and.returnValue(
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
    expect(message).toContain('myCoupons.noCouponsMessage');
  });

  it('should be able to show coupons', () => {
    userService.getCustomerCoupons.and.returnValue(of(couponResult));
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
    userService.getCustomerCoupons.and.returnValue(of(couponResult));
    fixture.detectChanges();
    component.sortChange('byStartDateAsc');
    expect(userService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      0,
      'startDate:asc'
    );
  });
  it('should be able to change page', () => {
    userService.getCustomerCoupons.and.returnValue(of(couponResult));
    component.pageChange(1);
    fixture.detectChanges();
    expect(userService.loadCustomerCoupons).toHaveBeenCalledWith(
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
    expect(userService.subscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );
    component.onNotificationChange({
      notification: false,
      couponId: 'CustomerCoupon1',
    });
    expect(userService.unsubscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );
  });
});
