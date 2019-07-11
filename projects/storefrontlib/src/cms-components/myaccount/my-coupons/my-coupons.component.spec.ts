import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCouponsComponent } from './my-coupons.component';
import {
  Component,
  Input,
  DebugElement,
  EventEmitter,
  Output,
} from '@angular/core';
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
  @Input() couponLoading = false;
  @Output()
  notificationChanged = new EventEmitter();
}

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  let el: DebugElement;
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
    el = fixture.debugElement;
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

  it('should show loading spinner when data is loading', () => {
    userService.getCustomerCouponsLoading.and.returnValue(of(true));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should show message when no data', () => {
    fixture.detectChanges();
    expect(el.query(By.css('[data-test="notexist-msg"]'))).toBeTruthy();
  });

  it('should show coupons list', () => {
    userService.getCustomerCoupons.and.returnValue(of(couponResult));
    fixture.detectChanges();

    expect(el.queryAll(By.css('cx-sorting')).length).toEqual(2);
    expect(el.queryAll(By.css('cx-pagination')).length).toEqual(2);
    expect(el.queryAll(By.css('cx-coupon-card')).length).toEqual(
      couponResult.coupons.length
    );
  });

  it('should be able to change page/sort', () => {
    userService.getCustomerCoupons.and.returnValue(of(couponResult));
    fixture.detectChanges();

    component.sortChange('byStartDateAsc');
    expect(userService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      0,
      'startDate:asc'
    );

    component.pageChange(2);
    expect(userService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      2,
      'startDate:asc'
    );
  });

  it('should be able to trun on/off notification for a coupon', () => {
    fixture.detectChanges();

    component.onNotificationChange({ couponId: '123', notification: true });
    expect(userService.subscribeCustomerCoupon).toHaveBeenCalledWith('123');

    component.onNotificationChange({ couponId: '123', notification: false });
    expect(userService.unsubscribeCustomerCoupon).toHaveBeenCalledWith('123');
  });
});
