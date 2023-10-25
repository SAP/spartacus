import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AsmCustomer360CustomerCouponList,
  AsmCustomer360Facade,
  AsmCustomer360Response,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { CustomerCouponService, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { AsmCustomer360CustomerCouponComponent } from './asm-customer-360-customer-coupon.component';
import { AsmCustomer360PromotionListingComponent } from '../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.component';
import { CustomerCouponEntry } from './asm-customer-360-customer-coupon.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AsmCustomer360CouponComponent', () => {
  let customerCouponService: CustomerCouponService;
  let component: AsmCustomer360CustomerCouponComponent;
  let fixture: ComponentFixture<AsmCustomer360CustomerCouponComponent>;
  let context: AsmCustomer360SectionContextSource<AsmCustomer360CustomerCouponList>;
  let el: DebugElement;
  const mockCustomerCouponList: AsmCustomer360CustomerCouponList = {
    type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
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
  const mockReloadedCustomerCouponList: AsmCustomer360CustomerCouponList = {
    type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
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
  const mockReloadedAsmCustomer360Response: AsmCustomer360Response = {
    value: [mockReloadedCustomerCouponList],
  };
  class MockAsmCustomer360Facade implements Partial<AsmCustomer360Facade> {
    get360Data(): Observable<AsmCustomer360Response> {
      return of(mockReloadedAsmCustomer360Response);
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
        AsmCustomer360CustomerCouponComponent,
        AsmCustomer360PromotionListingComponent,
      ],
      providers: [
        AsmCustomer360SectionContextSource,
        {
          provide: AsmCustomer360SectionContext,
          useExisting: AsmCustomer360SectionContextSource,
        },
        {
          provide: CustomerCouponService,
          useClass: MockCustomerCouponService,
        },
        {
          provide: AsmCustomer360Facade,
          useClass: MockAsmCustomer360Facade,
        },
      ],
    }).compileComponents();
    customerCouponService = TestBed.inject(CustomerCouponService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360CustomerCouponComponent);
    component = fixture.componentInstance;
    context = TestBed.inject(AsmCustomer360SectionContextSource);
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
      By.css('.cx-asm-customer-360-promotion-listing-search-icon-search')
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
