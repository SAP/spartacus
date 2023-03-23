import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmDialogActionType,
  Customer360Config,
  Customer360Facade,
  Customer360Response,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { I18nTestingModule, User } from '@spartacus/core';
import { OrderHistoryFacade, OrderHistoryList } from '@spartacus/order/root';
import {
  DirectionMode,
  DirectionService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer360Component } from './customer-360.component';

describe('AsmCustomer360Component', () => {
  const mockAsmConfig: Customer360Config = {
    customer360: {
      tabs: [
        {
          i18nNameKey: 'customer360.overviewTab',
          components: [
            {
              component: 'AsmCustomer360OverviewComponent',
            },
          ],
        },
        {
          i18nNameKey: 'customer360.profileTab',
          components: [
            {
              component: 'AsmCustomer360ProfileComponent',
            },
            {
              component: 'AsmCustomer360ProductReviewsComponent',
              requestData: {
                type: Customer360Type.REVIEW_LIST,
              },
              config: { pageSize: 5 },
            },
          ],
        },
      ],
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

  class MockDirectionService {
    getDirection() {
      return DirectionMode.LTR;
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
    get360Data(tab: number): Observable<Customer360Response> {
      if (tab === 0) {
        return of({
          value: [
            {
              type: Customer360Type.REVIEW_LIST,
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

  let component: Customer360Component;
  let fixture: ComponentFixture<Customer360Component>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [Customer360Component, MockAsmCustomerSectionComponent],
      providers: [
        { provide: Customer360Config, useValue: mockAsmConfig },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: OrderHistoryFacade, useClass: MockOrderHistoryService },
        { provide: SavedCartFacade, useClass: MockSavedCartService },
        { provide: Customer360Facade, useClass: MockAsm360Service },
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Customer360Component);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show a label with information on the emulated user's active cart", () => {
    const label = el.query(By.css('.header-account-details-active-cart'));
    expect(label.nativeElement.textContent).toEqual(
      ' customer360.header.activeCartLabel cartSize:3  00001089 '
    );
  });

  it("should show a label with information on the emulated user's most recent order", () => {
    const label = el.query(By.css('.header-account-details-recent-order'));
    expect(label.nativeElement.textContent).toEqual(
      ' customer360.header.recentOrderLabel price:$10.00  00001088, 11-21-2022 '
    );
  });

  it('should render component sections', () => {
    const sections = el.queryAll(By.css('cx-asm-customer-section'));
    expect(sections.length).toBe(1);
  });

  it('should re-render component sections when selecting a new tab', () => {
    component.selectTab(1);

    fixture.detectChanges();

    const sections = el.queryAll(By.css('cx-asm-customer-section'));
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

  describe('Tab navigation', () => {
    it('should display tabs', () => {
      expect(component.tabHeaderItems.length).toBe(
        mockAsmConfig.customer360?.tabs?.length
      );
    });
    it('should activate the first tab when dialog opens', () => {
      expect(document.activeElement).toBe(
        component.tabHeaderItems.toArray()[0].nativeElement
      );
    });

    it('should switch tab selection', () => {
      const firstTab = component.tabHeaderItems.toArray()[0].nativeElement;
      const secondTab = component.tabHeaderItems.toArray()[1].nativeElement;
      let event = {
        code: 'ArrowRight',
        stopPropagation: () => {},
        preventDefault: () => {},
      };

      expect(firstTab.tabIndex).toBe(0);
      expect(secondTab.tabIndex).toBe(-1);

      event.code = 'ArrowLeft';
      component.switchTab(event as KeyboardEvent, 0);
      expect(firstTab.tabIndex).toBe(-1);
      expect(secondTab.tabIndex).toBe(0);

      event.code = 'ArrowRight';
      component.switchTab(event as KeyboardEvent, 1);
      expect(firstTab.tabIndex).toBe(0);
      expect(secondTab.tabIndex).toBe(-1);

      event.code = 'Home';
      component.switchTab(event as KeyboardEvent, 1);
      expect(firstTab.tabIndex).toBe(0);
      expect(secondTab.tabIndex).toBe(-1);

      event.code = 'End';
      component.switchTab(event as KeyboardEvent, 0);
      expect(firstTab.tabIndex).toBe(-1);
      expect(secondTab.tabIndex).toBe(0);
    });
  });
});
