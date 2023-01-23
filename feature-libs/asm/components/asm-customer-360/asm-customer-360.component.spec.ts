import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmConfig } from '@spartacus/asm/core';
import {
  Asm360Facade,
  AsmCustomer360Response,
  AsmCustomer360Type,
  AsmDialogActionType,
} from '@spartacus/asm/root';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { I18nTestingModule, User } from '@spartacus/core';
import { OrderHistoryFacade, OrderHistoryList } from '@spartacus/order/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { AsmCustomer360Component } from './asm-customer-360.component';

describe('AsmCustomer360Component', () => {
  const mockAsmConfig: AsmConfig = {
    asm: {
      customer360: {
        tabs: [
          {
            i18nNameKey: 'asm.customer360.overviewTab',
            components: [
              {
                component: 'AsmCustomer360OverviewComponent',
              },
            ],
          },
          {
            i18nNameKey: 'asm.customer360.profileTab',
            components: [
              {
                component: 'AsmCustomer360ProfileComponent',
              },
              {
                component: 'AsmCustomer360ProductReviewsComponent',
                requestData: {
                  type: AsmCustomer360Type.REVIEW_LIST,
                },
                config: { pageSize: 5 },
              },
            ],
          },
        ],
      },
    },
  };

  @Component({
    selector: 'cx-asm-customer-section',
    template: '',
  })
  class MockAsmCustomerSectionComponent {}

  class MockActiveCartService {
    getActive(): Observable<Cart> {
      return of({
        totalItems: 3,
        code: '00001089',
      });
    }
  }

  class MockOrderHistoryService {
    getOrderHistoryList(): Observable<OrderHistoryList> {
      return of({
        orders: [
          {
            code: '00001088',
            placed: new Date('2022-11-21T20:14:59+0000'),
            total: {
              formattedValue: '$10.00',
            },
          },
        ],
      });
    }
  }

  class MockSavedCartService {
    getList(): Observable<Array<Cart>> {
      return of([]);
    }
  }

  class MockAsm360Service {
    get360Data(tab: number): Observable<AsmCustomer360Response> {
      if (tab === 0) {
        return of({
          value: [
            {
              type: AsmCustomer360Type.REVIEW_LIST,
              reviews: [],
            },
          ],
        });
      } else {
        return of({ value: [] });
      }
    }
  }

  const customer: User = {
    firstName: 'Justin',
    lastName: 'Lee',
    uid: 'justin.lee01@sap.com',
  };

  const dialogClose$ = new BehaviorSubject<any>('');
  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    data$ = of({ customer });

    openDialogAndSubscribe() {
      return of();
    }
    get dialogClose() {
      return dialogClose$.asObservable();
    }

    closeDialog() {}
  }

  let component: AsmCustomer360Component;
  let fixture: ComponentFixture<AsmCustomer360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AsmCustomer360Component, MockAsmCustomerSectionComponent],
      providers: [
        { provide: AsmConfig, useValue: mockAsmConfig },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: OrderHistoryFacade, useClass: MockOrderHistoryService },
        { provide: SavedCartFacade, useClass: MockSavedCartService },
        { provide: Asm360Facade, useClass: MockAsm360Service },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360Component);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show a label with information on the emulated user's active cart", () => {
    const label = fixture.debugElement.query(
      By.css('.header-account-details-active-cart')
    );
    expect(label.nativeElement.textContent).toEqual(
      ' asm.customer360.header.activeCartLabel cartSize:3  00001089 '
    );
  });

  it("should show a label with information on the emulated user's most recent order", () => {
    const label = fixture.debugElement.query(
      By.css('.header-account-details-recent-order')
    );
    expect(label.nativeElement.textContent).toEqual(
      ' asm.customer360.header.recentOrderLabel price:$10.00  00001088 , 11-21-2022 '
    );
  });

  it('should render component sections', () => {
    const sections = fixture.debugElement.queryAll(
      By.css('cx-asm-customer-section')
    );
    expect(sections.length).toBe(1);
  });

  it('should re-render component sections when selecting a new tab', () => {
    component.selectTab(1);

    fixture.detectChanges();

    const sections = fixture.debugElement.queryAll(
      By.css('cx-asm-customer-section')
    );
    expect(sections.length).toBe(1);
  });

  it('should create an avatar for the customer', () => {
    expect(component.getAvatar()).toBe('JL');
  });

  it('should close modal', () => {
    const launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'closeDialog').and.stub();

    component.closeModal('foo');

    expect(launchDialogService.closeDialog).toHaveBeenCalledTimes(1);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('foo');
  });

  it('should navigate to product details', () => {
    const launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'closeDialog').and.stub();

    component.navigateTo({
      cxRoute: 'product',
      params: { code: 'product001', name: 'Product' },
    });

    expect(launchDialogService.closeDialog).toHaveBeenCalledTimes(1);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith({
      actionType: AsmDialogActionType.NAVIGATE,
      selectedUser: customer,
      route: {
        cxRoute: 'product',
        params: { code: 'product001', name: 'Product' },
      },
    });
  });
});
