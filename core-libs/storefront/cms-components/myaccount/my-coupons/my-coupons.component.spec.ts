import { AsyncPipe } from '@angular/common';
import {
  Component,
  DebugElement,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import {
  CustomerCoupon,
  CustomerCouponSearchResult,
  CustomerCouponService,
  CxDatePipe,
  FeaturesConfig,
  I18nTestingModule,
  TranslatePipe,
} from '@spartacus/core';
import {
  CouponCardComponent,
  IconComponent,
  PaginationComponent,
  SortingComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from '../../../shared/test/mock-feature-directive';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { LAUNCH_CALLER, LaunchDialogService } from '../../../layout/index';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { ICON_TYPE } from '../../misc/icon/icon.model';
import { MyCouponsComponent } from './my-coupons.component';
import { MyCouponsComponentService } from './my-coupons.component.service';

@Component({
  selector: 'cx-coupon-card',
  template: `
    <input
      type="checkbox"
      class="form-check-input"
      [checked]="coupon?.notificationOn"
      [class.disabled]="couponSubscriptionLoading$ | async"
      [disabled]="couponSubscriptionLoading$ | async"
      (click)="notificationChange()"
    />
  `,
  imports: [I18nTestingModule, SpinnerModule, AsyncPipe],
})
class MockedCouponCardComponent {
  @Input()
  coupon: CustomerCoupon;
  @Input()
  couponSubscriptionLoading$: Observable<boolean>;
  @Output()
  notificationChanged = new EventEmitter<{
    couponId: string;
    notification: boolean;
  }>();
  notificationOn = false;

  notificationChange(): void {
    this.notificationOn = !this.notificationOn;
    this.notificationChanged.emit({
      couponId: this.coupon.couponId,
      notification: this.notificationOn,
    });
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [I18nTestingModule, SpinnerModule],
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

const subLoading$ = new BehaviorSubject<boolean>(false);
const unsubLoading$ = new BehaviorSubject<boolean>(false);
const PAGE_SIZE = 10;

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
    count: 2,
    totalPages: 1,
    totalCount: 2,
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
      endDate: '2019-12-30T23:59:59+0000',
      name: 'CustomerCoupon1:name',
      notificationOn: false,
      allProductsApplicable: false,
      startDate: '1970-01-01T00:00:00+0000',
      status: 'Effective',
    },
    {
      couponId: 'CustomerCoupon2',
      description: 'CustomerCoupon2',
      endDate: '9999-12-30T23:59:59+0000',
      name: 'CustomerCoupon2:name',
      notificationOn: false,
      allProductsApplicable: false,
      startDate: '2019-01-01T00:00:00+0000',
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

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}

@Component({
  template: '',
  selector: 'cx-sorting',
})
class MockSortingComponent {
  @Input() sortOptions;
  @Input() sortLabels;
  @Input() selectedOption;
  @Input() placeholder;
  @Output() sortListEvent = new EventEmitter<string>();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(_caller: LAUNCH_CALLER, _openElement?: ElementRef) {
    return EMPTY;
  }
  closeDialog(_reason: string) {}
}

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  let el: DebugElement;
  let launchDialogService: LaunchDialogService;

  const customerCouponService = {
    getCustomerCoupons: vi.fn(),
    getCustomerCouponsLoading: vi.fn(),
    loadCustomerCoupons: vi.fn(),
    subscribeCustomerCoupon: vi.fn(),
    unsubscribeCustomerCoupon: vi.fn(),
    getSubscribeCustomerCouponResultLoading: vi.fn(),
    getUnsubscribeCustomerCouponResultLoading: vi.fn(),
    getSubscribeCustomerCouponResultError: vi.fn(),
    getUnsubscribeCustomerCouponResultError: vi.fn(),
  };

  const myCouponsComponentService = { getSortLabels: vi.fn() };
  const subscriptionFail = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        I18nTestingModule,
        SpinnerModule,
        MyCouponsComponent,
        MockedCouponCardComponent,
        MockCxIconComponent,
        MockPaginationComponent,
        MockSortingComponent,
        MockFeatureDirective,
      ],
      providers: [
        { provide: CustomerCouponService, useValue: customerCouponService },
        {
          provide: MyCouponsComponentService,
          useValue: myCouponsComponentService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '5.1' },
          },
        },
      ],
    })
      .overrideComponent(MyCouponsComponent, {
        remove: {
          imports: [
            IconComponent,
            TranslatePipe,
            CxDatePipe,
            SortingComponent,
            PaginationComponent,
            CouponCardComponent,
          ],
        },
        add: {
          imports: [
            MockedCouponCardComponent,
            MockCxIconComponent,
            MockPaginationComponent,
            MockSortingComponent,
            I18nTestingModule,
            SpinnerModule,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    launchDialogService = TestBed.inject(LaunchDialogService);

    customerCouponService.getCustomerCoupons.mockReturnValue(
      of(emptyCouponResult)
    );
    customerCouponService.getCustomerCouponsLoading.mockReturnValue(of(false));
    customerCouponService.loadCustomerCoupons.mockImplementation(() => {});
    customerCouponService.subscribeCustomerCoupon.mockImplementation(() => {});
    customerCouponService.unsubscribeCustomerCoupon.mockImplementation(
      () => {}
    );
    customerCouponService.getSubscribeCustomerCouponResultLoading.mockReturnValue(
      subLoading$
    );
    customerCouponService.getUnsubscribeCustomerCouponResultLoading.mockReturnValue(
      unsubLoading$
    );
    customerCouponService.getSubscribeCustomerCouponResultError.mockReturnValue(
      subscriptionFail
    );
    customerCouponService.getUnsubscribeCustomerCouponResultError.mockReturnValue(
      subscriptionFail
    );

    myCouponsComponentService.getSortLabels.mockReturnValue(of(sortLabels));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display header', () => {
    fixture.detectChanges();
    expect(el.query(By.css('h2')).nativeElement.textContent.trim()).toEqual(
      'myCoupons.myCoupons'
    );
  });

  it('should be able to show message when there is no coupon', () => {
    fixture.detectChanges();
    const header = el.query(By.css('.cx-my-coupons-header')).nativeElement
      .textContent;
    expect(header).toBeTruthy();
    const message = el.query(By.css('.cx-section-msg')).nativeElement
      .textContent;
    expect(message).toBeTruthy();
    expect(el.query(By.css('.cx-my-coupons-notes span'))).toBeFalsy();
  });

  it('should show spinner when loading', () => {
    customerCouponService.getCustomerCouponsLoading.mockReturnValue(of(true));
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should be able to show coupons', () => {
    customerCouponService.getCustomerCoupons.mockReturnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();

    const message = el.queryAll(By.css('.cx-section-msg'));
    expect(message.length).toBe(0);

    const sortComponent = el.nativeElement.querySelectorAll('cx-sorting');
    expect(sortComponent.length).toBe(2);

    const paginationComponent =
      el.nativeElement.querySelectorAll('cx-pagination');
    expect(paginationComponent.length).toBe(2);
    const couponCardComponent =
      el.nativeElement.querySelectorAll('cx-coupon-card');
    expect(couponCardComponent.length).toBe(couponsSearchResult.coupons.length);

    expect(
      el.query(By.css('.cx-my-coupons-notes span')).nativeElement
    ).toBeTruthy();
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
    customerCouponService.getCustomerCoupons.mockReturnValue(
      of(couponsSearchResult)
    );
    fixture.detectChanges();
    const checkbox = el.queryAll(By.css('.form-check-input'))[0];
    checkbox.triggerEventHandler('click', null);
    expect(customerCouponService.subscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );

    checkbox.triggerEventHandler('click', null);
    expect(
      customerCouponService.unsubscribeCustomerCoupon
    ).toHaveBeenCalledWith('CustomerCoupon1');
  });

  it('should load customer coupon when subscrib/unsubscribe notification error', () => {
    subscriptionFail.next(true);
    fixture.detectChanges();
    expect(customerCouponService.loadCustomerCoupons).toHaveBeenCalledWith(
      PAGE_SIZE
    );
  });

  it('should be able to open coupon claim dialog if has hash str in location', () => {
    vi.spyOn(component, 'getHashStr').mockReturnValue(String('#testcode'));
    vi.spyOn(launchDialogService, 'openDialog').mockReturnValue(EMPTY);
    component.ngOnInit();
    fixture.detectChanges();
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CLAIM_DIALOG,
      component['host'],
      undefined,
      { coupon: 'testcode', pageSize: 10 }
    );
  });

  describe('focus restoration after dialog close', () => {
    it('should pass the host element ref to openDialog so focus is restored on close', () => {
      vi.spyOn(component, 'getHashStr').mockReturnValue('#testcode');
      vi.spyOn(launchDialogService, 'openDialog').mockReturnValue(EMPTY);

      component.ngOnInit();
      fixture.detectChanges();

      expect(launchDialogService.openDialog).toHaveBeenCalledWith(
        LAUNCH_CALLER.CLAIM_DIALOG,
        component['host'],
        undefined,
        { coupon: 'testcode', pageSize: 10 }
      );
    });
  });

  describe('navigation', () => {
    it('should close the dialog on NavigationStart', () => {
      const router = TestBed.inject(Router);
      vi.spyOn(launchDialogService, 'closeDialog');

      fixture.detectChanges();
      router.navigate(['/']);

      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'Navigation'
      );
    });
  });
});
