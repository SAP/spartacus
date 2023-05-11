import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmDialogActionType,
  Customer360Config,
  Customer360Facade,
  Customer360Overview,
  Customer360Response,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { I18nTestingModule, User } from '@spartacus/core';
import {
  DirectionMode,
  DirectionService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer360Component } from './customer-360.component';
import { AvatarImagePipe } from './avatar-image.pipe';
import { AvatarLabelPipe } from './avatar-label.pipe';
import { CsAgentAuthService } from '@spartacus/asm/root';

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

  const mockOverview: Customer360Overview = {
    type: Customer360Type.OVERVIEW,
    overview: {
      name: 'John Doe',
      cartSize: 5,
      cartCode: '00005033',
      latestOrderTotal: '$12.34',
      latestOrderCode: '00005032',
      latestOrderTime: '2023-04-06T02:15:30.085Z',
      latestOpenedTicketId: '00002000',
      latestOpenedTicketCreatedAt: '2023-04-06T02:15:30.085Z',
      email: 'johndoe@example.com',
      registeredAt: '2023-04-06T02:15:30.085Z',
      address: {
        id: 'string',
        title: 'string',
        titleCode: 'string',
        firstName: 'string',
        lastName: 'string',
        companyName: 'string',
        line1: 'string',
        line2: 'string',
        town: 'string',
        region: {
          isocode: 'string',
          isocodeShort: 'string',
          countryIso: 'string',
          name: 'string',
        },
        district: 'string',
        postalCode: 'string',
        phone: 'string',
        cellphone: 'string',
        email: 'string',
        country: {
          isocode: 'string',
          name: 'string',
        },
        shippingAddress: true,
        defaultAddress: true,
        visibleInAddressBook: true,
        formattedAddress: 'string',
      },
      userAvatar: {
        url: '/medias/SAP-scrn-R.png?context=bWFzdGVyfGltYWdlc3wxMDEyN3xpbWFnZS9wbmd8YVcxaFoyVnpMMmc0WXk5b1ltSXZPRGM1TnpRNU5qYzNNRFU1TUM1d2JtY3w3MDRiODkxNWI2YWRmZTQ0NDFhZmIxZjZkYmZmYTA3MjM0NTY4NmNlYzU4OWM4Y2VmNDY5MzZkNmY0ZWMxZWUx',
        format: 'png',
      },
    },
  };

  @Component({
    selector: 'cx-asm-customer-section',
    template: '',
  })
  class MockAsmCustomerSectionComponent {}

  class MockDirectionService {
    getDirection() {
      return DirectionMode.LTR;
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
        return of({ value: [mockOverview] });
      }
    }
  }

  const customer: User = {
    firstName: 'John',
    lastName: 'Doe',
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

  class MockCsAgentAuthService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(true);

    isCustomerSupportAgentLoggedIn(): Observable<boolean> {
      return this.loggedIn.asObservable();
    }

    logoutCustomerSupportAgent(): void {
      this.loggedIn.next(false);
    }
  }

  let component: Customer360Component;
  let fixture: ComponentFixture<Customer360Component>;
  let el: DebugElement;
  let csAgentAuthService: CsAgentAuthService;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        Customer360Component,
        MockAsmCustomerSectionComponent,
        AvatarImagePipe,
        AvatarLabelPipe,
      ],
      providers: [
        { provide: Customer360Config, useValue: mockAsmConfig },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: Customer360Facade, useClass: MockAsm360Service },
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Customer360Component);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show a label with information on the emulated user's active cart", () => {
    const label = el.query(By.css('.header-account-details-active-cart'));
    expect(label.nativeElement.textContent).toEqual(
      ' customer360.header.activeCartLabel cartSize:5  00005033 '
    );
  });

  it("should show a label with information on the emulated user's most recent order", () => {
    const label = el.query(By.css('.header-account-details-recent-order'));
    expect(label.nativeElement.textContent).toEqual(
      ' customer360.header.recentOrderLabel price:$12.34  00005032, 04-05-2023 '
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

  it('should close modal', () => {
    spyOn(launchDialogService, 'closeDialog').and.stub();

    component.closeModal('foo');

    expect(launchDialogService.closeDialog).toHaveBeenCalledTimes(1);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('foo');
  });

  it('should navigate to product details', () => {
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

    it('should close dialog when customer support agent logout', () => {
      spyOn(launchDialogService, 'closeDialog').and.stub();
      csAgentAuthService.logoutCustomerSupportAgent();
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
    });
  });
});
