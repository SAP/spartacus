import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCouponsComponent } from './my-coupons.component';
import {
  I18nTestingModule,
  CustomerCouponService,
  CustomerCoupon,
  CustomerCouponSearchResult,
} from '@spartacus/core';
import { of, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  DebugElement,
} from '@angular/core';

@Component({
  selector: 'cx-coupon-card',
  template: `
    <input
      type="checkbox"
      class="form-check-input"
      [checked]="coupon?.notificationOn"
      (change)="notificationChange()"
    />
  `,
})
class MockedCouponCardComponent {
  @Input()
  coupon: CustomerCoupon;
  @Output()
  notificationChanged = new EventEmitter<{
    couponId: string;
    notification: boolean;
  }>();

  notificationChange(): void {
    this.notificationChanged.emit({
      couponId: this.coupon.couponId,
      notification: !this.coupon.notificationOn,
    });
  }
}

const subLoading$ = new BehaviorSubject<boolean>(false);
const unsubLoading$ = new BehaviorSubject<boolean>(false);

const emptyCouponResult: CustomerCouponSearchResult = {
  pagination: {
    page: 0,
    count: 0,
    totalPages: 0,
    totalCount: 0,
  },
  sorts: [],
  coupons: [],
};

const couponsSearchResult: CustomerCouponSearchResult = {
  pagination: {
    page: 0,
    count: 0,
    totalPages: 0,
    totalCount: 0,
  },
  sorts: [
    {
      asc: true,
      code: 'startDate',
    },
  ],
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
};
const sortLabels = {
  byStartDateAsc: 'Start date asc',
  byStartDateDesc: 'Start date desc',
  byEndDateAsc: 'End date asc',
  byEndDateDesc: 'End date asc',
};

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  let el: DebugElement;

  const customerCouponService = jasmine.createSpyObj('CustomerCouponService', [
    'getCustomerCoupons',
    'getCustomerCouponsLoaded',
    'loadCustomerCoupons',
    'subscribeCustomerCoupon',
    'unsubscribeCustomerCoupon',
    'getSubscribeCustomerCouponResultLoading',
    'getUnsubscribeCustomerCouponResultLoading',
  ]);
  const translationService = jasmine.createSpyObj('TranslationService', [
    'translate',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [MyCouponsComponent, MockedCouponCardComponent],
      providers: [
        { provide: CustomerCouponService, useValue: customerCouponService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    customerCouponService.getCustomerCoupons.and.returnValue(
      of(emptyCouponResult)
    );
    customerCouponService.getCustomerCouponsLoaded.and.returnValue(of(true));
    customerCouponService.loadCustomerCoupons.and.stub();
    customerCouponService.subscribeCustomerCoupon.and.stub();
    customerCouponService.unsubscribeCustomerCoupon.and.stub();
    customerCouponService.getSubscribeCustomerCouponResultLoading.and.returnValue(
      subLoading$
    );
    customerCouponService.getUnsubscribeCustomerCouponResultLoading.and.returnValue(
      unsubLoading$
    );

    translationService.translate.and.returnValue(of(sortLabels));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be able to show message when there is no coupon', () => {
    fixture.detectChanges();
    const message = el.query(By.css('.cx-section-msg')).nativeElement
      .textContent;
    expect(!message).toBeFalsy();
  });

  it('should be able to show coupons', () => {
    customerCouponService.getCustomerCoupons.and.returnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();

    const message = el.queryAll(By.css('.cx-section-msg'));
    expect(message.length).toBe(0);

    const sortComponent = el.nativeElement.querySelectorAll('cx-sorting');
    expect(sortComponent.length).toBe(2);

    const paginationComponent = el.nativeElement.querySelectorAll(
      'cx-pagination'
    );
    expect(paginationComponent.length).toBe(2);
    const couponCardComponent = el.nativeElement.querySelectorAll(
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
    fixture.detectChanges();
    component.pageChange(1);
    expect(customerCouponService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      1,
      'startDate:asc'
    );
  });

  it('should be able to change coupon notification', () => {
    customerCouponService.getCustomerCoupons.and.returnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    el.query(By.css('form-check-input')).triggerEventHandler('click', null);
    expect(customerCouponService.subscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );
    fixture.debugElement
      .query(By.css('form-check-input'))
      .triggerEventHandler('click', null);
    expect(
      customerCouponService.unsubscribeCustomerCoupon
    ).toHaveBeenCalledWith('CustomerCoupon1');
  });
});
