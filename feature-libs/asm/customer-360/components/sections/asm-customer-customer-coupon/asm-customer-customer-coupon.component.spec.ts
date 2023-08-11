import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Customer360CustomerCouponList,
  Customer360Facade,
  Customer360Response,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { CustomerCouponService, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerCustomerCouponComponent } from './asm-customer-customer-coupon.component';
import { AsmCustomerPromotionListingComponent } from '../../asm-customer-promotion-listing/asm-customer-promotion-listing.component';
import { CustomerCouponEntry } from './asm-customer-customer-coupon.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AsmCustomerCouponComponent', () => {
  let customerCouponService: CustomerCouponService;
  let component: AsmCustomerCustomerCouponComponent;
  let fixture: ComponentFixture<AsmCustomerCustomerCouponComponent>;
  let context: Customer360SectionContextSource<Customer360CustomerCouponList>;
  let el: DebugElement;
  const mockCustomerCouponList: Customer360CustomerCouponList = {
    type: Customer360Type.CUSTOMER_COUPON_LIST,
    customerCoupons: [
      {
        code: 'CUSTOMER_COUPON_1',
        name: 'NAME OF CUSTOMER_COUPON_1',
        description: 'DESCRIPTION OF CUSTOMER_COUPON_1',
      },
      {
        code: 'CUSTOMER_COUPON_2',
        name: 'NAME OF CUSTOMER_COUPON_2',
        description: 'DESCRIPTION OF CUSTOMER_COUPON_2',
      },
      {
        code: 'CUSTOMER_COUPON_3',
        name: 'NAME OF CUSTOMER_COUPON_3',
        description: 'DESCRIPTION OF CUSTOMER_COUPON_3',
      },
    ],
  };
  const mockCustomerCouponEntryList: Array<CustomerCouponEntry> = [
    {
      code: 'NAME OF CUSTOMER_COUPON_1',
      name: 'DESCRIPTION OF CUSTOMER_COUPON_1',
      codeForApplyAction: 'CUSTOMER_COUPON_1',
      applied: false,
    },
    {
      code: 'NAME OF CUSTOMER_COUPON_2',
      name: 'DESCRIPTION OF CUSTOMER_COUPON_2',
      codeForApplyAction: 'CUSTOMER_COUPON_2',
      applied: false,
    },
    {
      code: 'NAME OF CUSTOMER_COUPON_3',
      name: 'DESCRIPTION OF CUSTOMER_COUPON_3',
      codeForApplyAction: 'CUSTOMER_COUPON_3',
      applied: false,
    },
  ];
  const mockReloadedCustomerCouponList: Customer360CustomerCouponList = {
    type: Customer360Type.CUSTOMER_COUPON_LIST,
    customerCoupons: [
      {
        code: 'RELOAD_CUSTOMER_COUPON_1',
        name: 'NAME OF CUSTOMER_COUPON_1',
        description: 'DESCRIPTION OF CUSTOMER_COUPON_1',
      },
      {
        code: 'RELOAD_CUSTOMER_COUPON_2',
        name: 'NAME OF CUSTOMER_COUPON_2',
        description: 'DESCRIPTION OF CUSTOMER_COUPON_2',
      },
      {
        code: 'RELOAD_CUSTOMER_COUPON_3',
        name: 'NAME OF CUSTOMER_COUPON_3',
        description: 'DESCRIPTION OF CUSTOMER_COUPON_3',
      },
    ],
  };
  const mockReloadCustomerCouponEntryListForSentTab: Array<CustomerCouponEntry> =
    [
      {
        code: 'NAME OF CUSTOMER_COUPON_1',
        name: 'DESCRIPTION OF CUSTOMER_COUPON_1',
        codeForApplyAction: 'RELOAD_CUSTOMER_COUPON_1',
        applied: true,
      },
      {
        code: 'NAME OF CUSTOMER_COUPON_2',
        name: 'DESCRIPTION OF CUSTOMER_COUPON_2',
        codeForApplyAction: 'RELOAD_CUSTOMER_COUPON_2',
        applied: true,
      },
      {
        code: 'NAME OF CUSTOMER_COUPON_3',
        name: 'DESCRIPTION OF CUSTOMER_COUPON_3',
        codeForApplyAction: 'RELOAD_CUSTOMER_COUPON_3',
        applied: true,
      },
    ];
  const mockReloadCustomerCouponEntryListForAvailableTab: Array<CustomerCouponEntry> =
    [
      {
        code: 'NAME OF CUSTOMER_COUPON_1',
        name: 'DESCRIPTION OF CUSTOMER_COUPON_1',
        codeForApplyAction: 'RELOAD_CUSTOMER_COUPON_1',
        applied: false,
      },
      {
        code: 'NAME OF CUSTOMER_COUPON_2',
        name: 'DESCRIPTION OF CUSTOMER_COUPON_2',
        codeForApplyAction: 'RELOAD_CUSTOMER_COUPON_2',
        applied: false,
      },
      {
        code: 'NAME OF CUSTOMER_COUPON_3',
        name: 'DESCRIPTION OF CUSTOMER_COUPON_3',
        codeForApplyAction: 'RELOAD_CUSTOMER_COUPON_3',
        applied: false,
      },
    ];
  const mockReloadedCustomer360Response: Customer360Response = {
    value: [mockReloadedCustomerCouponList],
  };
  class MockCustomer360Facade implements Partial<Customer360Facade> {
    get360Data(): Observable<Customer360Response> {
      return of(mockReloadedCustomer360Response);
    }
  }
  class MockCustomerCouponService implements Partial<CustomerCouponService> {
    getClaimCustomerCouponResultError(): Observable<boolean> {
      return of();
    }

    getDisclaimCustomerCouponResultError(): Observable<boolean> {
      return of();
    }

    claimCustomerCoupon(_couponCode: string): void {}

    disclaimCustomerCoupon(_couponCode: string): void {}
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomerCustomerCouponComponent,
        AsmCustomerPromotionListingComponent,
      ],
      providers: [
        Customer360SectionContextSource,
        {
          provide: Customer360SectionContext,
          useExisting: Customer360SectionContextSource,
        },
        {
          provide: CustomerCouponService,
          useClass: MockCustomerCouponService,
        },
        {
          provide: Customer360Facade,
          useClass: MockCustomer360Facade,
        },
      ],
    }).compileComponents();
    customerCouponService = TestBed.inject(CustomerCouponService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerCustomerCouponComponent);
    component = fixture.componentInstance;
    context = TestBed.inject(Customer360SectionContextSource);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display error message alert at init', () => {
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should be able to reload customer coupon list when customer change to Available tab', () => {
    component.changeTab(false);
    component.entries$.subscribe((entries) => {
      expect(entries).toEqual(mockReloadCustomerCouponEntryListForSentTab);
      expect(component.activeTab).toEqual(1);
    });
  });

  it('should be able to reload customer coupon list when customer change to Sent tab', () => {
    component.changeTab(true);
    component.entries$.subscribe((entries) => {
      expect(entries).toEqual(mockReloadCustomerCouponEntryListForAvailableTab);
      expect(component.activeTab).toEqual(0);
    });
  });

  it('should reload customer coupon list when searching customer coupon ', () => {
    spyOn(component, 'searchCustomerCoupon').and.callThrough();
    el.query(
      By.css('.cx-asm-customer-promotion-listing-search-icon')
    ).nativeElement.click();
    expect(component.searchCustomerCoupon).toHaveBeenCalled();
  });

  it('should be able to fetch coupon list from context data', () => {
    context.data$.next(mockCustomerCouponList);
    component.fetchCustomerCoupons();
    component.entries$.subscribe((entries) => {
      expect(entries).toEqual(mockCustomerCouponEntryList);
      expect(component.showErrorAlert$.getValue()).toBe(false);
    });
  });

  it('should be able to assign customer coupon to customer', () => {
    spyOn(customerCouponService, 'claimCustomerCoupon').and.stub();
    mockCustomerCouponEntryList[1].applied = false;
    component.claimCouponToCustomer(mockCustomerCouponEntryList[1]);
    expect(customerCouponService.claimCustomerCoupon).toHaveBeenCalled();
    component.entries$.subscribe((entries) => {
      expect(entries[1].applied).toBe(true);
    });
  });

  it('should be able to remove customer coupon from customer', () => {
    spyOn(customerCouponService, 'disclaimCustomerCoupon').and.stub();
    mockCustomerCouponEntryList[0].applied = true;
    component.disclaimCouponToCustomer(mockCustomerCouponEntryList[0]);
    expect(customerCouponService.disclaimCustomerCoupon).toHaveBeenCalled();
    component.entries$.subscribe((entries) => {
      expect(entries[1].applied).toBe(false);
    });
  });

  it('should reload customer coupon list when applying customer coupon failed', () => {
    spyOn(
      customerCouponService,
      'getClaimCustomerCouponResultError'
    ).and.returnValue(of(true));
    spyOn(component, 'changeTab').and.callThrough();
    component.ngOnInit();
    customerCouponService.getClaimCustomerCouponResultError();
    expect(component.changeTab).toHaveBeenCalled();
  });

  it('should reload customer coupon list when removing customer coupon failed', () => {
    spyOn(
      customerCouponService,
      'getDisclaimCustomerCouponResultError'
    ).and.returnValue(of(true));
    spyOn(component, 'changeTab').and.callThrough();
    component.ngOnInit();
    customerCouponService.getDisclaimCustomerCouponResultError();
    expect(component.changeTab).toHaveBeenCalled();
  });

  it('should close error message alert of loading data when click close button', () => {
    component.showErrorAlert$.next(true);
    component.closeErrorAlert();
    component.showErrorAlert$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should close error message alert of applying action when click close button', () => {
    component.showErrorAlertForApplyAction$.next(true);
    component.closeErrorAlertForApplyAction();
    component.showErrorAlertForApplyAction$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
