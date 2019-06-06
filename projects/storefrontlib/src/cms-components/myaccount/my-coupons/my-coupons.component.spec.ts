import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCouponsComponent } from './my-coupons.component';
import { Component } from '@angular/core';
import {
  I18nTestingModule,
  CustomerCouponSearchResult,
  UserService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ListNavigationModule } from '@spartacus/storefront';

const couponResult: CustomerCouponSearchResult = {
  coupons: [
    {
      couponId: 'CustomerCoupon1',
      description: 'CustomerCoupon1',
      endDate: new Date('2019-12-30T23:59:59+0000'),
      name: 'CustomerCoupon1:name',
      notificationOn: 'false',
      solrFacets: '%3Arelevance%3Acategory%3A1',
      startDate: new Date('1970-01-01T00:00:00+0000'),
      status: 'Effective',
    },
    {
      couponId: 'CustomerCoupon2',
      description: 'CustomerCoupon2',
      endDate: new Date('9999-12-30T23:59:59+0000'),
      name: 'CustomerCoupon2:name',
      notificationOn: 'false',
      solrFacets: '%3Arelevance%3Acategory%3A1',
      startDate: new Date('2019-01-01T00:00:00+0000'),
      status: 'Effective',
    },
  ],
  sorts: [{ code: 'name', asc: true }],
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

// @Component({
//   template: '',
//   selector: 'cx-sorting',
// })
// class MockSortingComponent {
//   @Input()
//   items: Item[] = [];
//   @Input()
//   saveForLaterLoading = false;
//   @Input()
//   potentialProductPromotions: PromotionResult[] = [];
// }

@Component({
  selector: 'cx-coupon-card',
  template: '',
})
class MockCouponCardComponent {}

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  const userService = jasmine.createSpyObj('UserService', [
    'getCustomerCoupons',
    'getCustomerCouponsLoaded',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ListNavigationModule,
        MockCouponCardComponent,
      ],
      providers: [{ provide: UserService, useValue: userService }],
      declarations: [MyCouponsComponent, MockSpinnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    userService.getCustomerCoupons.and.returnValue(of({}));
    userService.getCustomerCouponsLoaded.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to show message when there is no coupon', () => {
    const message = fixture.debugElement.queryAll(By.css('.cx-section-msg'));
    expect(message.length).toBe(1);
  });

  it('should be able to show coupons', () => {
    userService.getCustomerCoupons.and.returnValue(of(couponResult));
    fixture.detectChanges();

    const message = fixture.debugElement.queryAll(By.css('.cx-section-msg'));
    expect(message.length).toBe(0);

    const sortComponent = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-sorting'
    );
    expect(sortComponent).toBe(2);

    const paginationComponent = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-pagination'
    );
    expect(paginationComponent).toBe(2);
    const couponCardComponent = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-coupon-card'
    );
    expect(couponCardComponent).toBe(2);
  });
});
