import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmDialogActionType,
  AsmCustomer360Facade,
  AsmCustomer360Overview,
  AsmCustomer360Response,
  AsmCustomer360TabComponent,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { AsmCustomer360Config } from '../config/asm-customer-360-config';
import {
  CxDatePipe,
  I18nTestingModule,
  LanguageService,
  User,
} from '@spartacus/core';
import {
  DirectionMode,
  DirectionService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AsmCustomer360Component } from './asm-customer-360.component';
import { CsAgentAuthService } from '@spartacus/asm/root';
import { ArgsPipe } from '@spartacus/asm/core';
import { FeaturesConfig, FeaturesConfigModule } from '@spartacus/core';
import {
  AsmCustomer360ActiveCartComponent,
  AsmCustomer360ProductReviewsComponent,
  AsmCustomer360ProfileComponent,
} from '../sections';

describe('AsmCustomer360Component', () => {
  const mockAsmConfig: AsmCustomer360Config = {
    asmCustomer360: {
      dateFormat: 'MM-dd-yyyy',
      dateTimeFormat: 'dd-MM-yy hh:mm a',
      tabs: [
        {
          i18nNameKey: 'asmCustomer360.overviewTab',
          components: [
            {
              component: AsmCustomer360ActiveCartComponent,
            },
          ],
        },
        {
          i18nNameKey: 'asmCustomer360.profileTab',
          components: [
            {
              component: AsmCustomer360ProfileComponent,
            },
            {
              component: AsmCustomer360ProductReviewsComponent,
              requestData: {
                type: AsmCustomer360Type.REVIEW_LIST,
              },
              config: { pageSize: 5 },
            },
          ],
        },
      ],
    },
  };

  const mockOverview: AsmCustomer360Overview = {
    type: AsmCustomer360Type.OVERVIEW,
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
      signedUpAt: '2023-04-06T02:15:30.085Z',
      address: {
        id: '00123',
        title: 'Mr.',
        titleCode: 'mr',
        firstName: 'Jone',
        lastName: 'Doe',
        companyName: 'SAP',
        line1: '55 State',
        line2: '',
        town: 'Boston',
        postalCode: '02109',
        phone: '4165556666',
        cellphone: '9057778888',
        email: 'johndoe@example.com',
        country: {
          isocode: 'US',
          name: 'United States',
        },
        shippingAddress: true,
        defaultAddress: true,
        visibleInAddressBook: true,
        formattedAddress: '53 State St,, , Massachusetts, Boston, 02109',
      },
      userAvatar: {
        url: '/medias/SAP-scrn-R.png?context=bWFzdGVyfGltYWdlc3wxMDEyN3xpbWFnZS9wbmd8YVcxaFoyVnpMMmc0WXk5b1ltSXZPRGM1TnpRNU5qYzNNRFU1TUM1d2JtY3w3MDRiODkxNWI2YWRmZTQ0NDFhZmIxZjZkYmZmYTA3MjM0NTY4NmNlYzU4OWM4Y2VmNDY5MzZkNmY0ZWMxZWUx',
        format: 'png',
      },
    },
  };

  @Component({
    selector: 'cx-asm-customer-360-section',
    template: '',
  })
  class MockAsmCustomer360SectionComponent {}

  class MockDirectionService {
    getDirection() {
      return DirectionMode.LTR;
    }
  }

  class MockAsm360Service {
    get360Data(): Observable<AsmCustomer360Response> {
      return of({ value: [mockOverview] });
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
  const mockLanguageService = {
    getActive: () => {},
  };

  let component: AsmCustomer360Component;
  let fixture: ComponentFixture<AsmCustomer360Component>;
  let el: DebugElement;
  let csAgentAuthService: CsAgentAuthService;
  let launchDialogService: LaunchDialogService;
  let asmCustomer360Facade: AsmCustomer360Facade;
  let datePipe: CxDatePipe;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, FeaturesConfigModule],
      declarations: [
        AsmCustomer360Component,
        MockAsmCustomer360SectionComponent,
        ArgsPipe,
      ],
      providers: [
        CxDatePipe,
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: AsmCustomer360Config, useValue: mockAsmConfig },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: AsmCustomer360Facade, useClass: MockAsm360Service },
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        {
          provide: FeaturesConfig,
          useValue: {
            features: { level: '*' },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    datePipe = TestBed.inject(CxDatePipe);
    languageService = TestBed.inject(LanguageService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    asmCustomer360Facade = TestBed.inject(AsmCustomer360Facade);
    spyOn(languageService, 'getActive').and.returnValue(of('en'));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360Component);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get avatar data', () => {
    expect(component.getAvatarText(customer)).toBe('JD');
    expect(component.getAvatarImage(mockOverview.overview)).toEqual({
      altText: mockOverview?.overview?.name,
      url: mockOverview?.overview?.userAvatar?.url,
      format: mockOverview?.overview?.userAvatar?.format,
    });
  });

  it('should display customer general information', () => {
    const formatedDate = datePipe.transform(
      mockOverview.overview?.signedUpAt,
      mockAsmConfig.asmCustomer360?.dateFormat
    );
    const log = el.query(By.css('.header-profile-details-log'));
    expect(log.nativeElement.textContent).toContain(formatedDate);
    const email = el.query(By.css('.cx-asm-customer-email'));
    expect(email.nativeElement.textContent).toContain(
      mockOverview.overview?.email
    );

    const town = el.query(By.css('.cx-asm-customer-address'));
    expect(town.nativeElement.textContent).toContain(
      mockOverview.overview?.address?.town
    );
  });

  it("should show a label with information on the emulated user's active cart", () => {
    const label = el.query(By.css('.header-account-details-active-cart'))
      .nativeElement.textContent;
    expect(label).toContain(mockOverview.overview?.cartCode);
    expect(label).toContain(mockOverview.overview?.cartSize);
  });

  it("should show a label with information on the emulated user's most recent order", () => {
    const formatedLatestOrderTime = datePipe.transform(
      mockOverview.overview?.latestOrderTime,
      mockAsmConfig.asmCustomer360?.dateFormat
    );
    const label = el.query(By.css('.header-account-details-recent-order'))
      .nativeElement.textContent;
    expect(label).toContain(mockOverview.overview?.latestOrderTotal);
    expect(label).toContain(mockOverview.overview?.latestOrderCode);
    expect(label).toContain(formatedLatestOrderTime);
  });

  it('should render component sections', () => {
    const sections = el.queryAll(By.css('cx-asm-customer-360-section'));
    expect(sections.length).toBe(1);
  });

  it('should re-render component sections when selecting a new tab', () => {
    component.selectTab(1);

    fixture.detectChanges();

    const sections = el.queryAll(By.css('cx-asm-customer-360-section'));
    expect(sections.length).toBe(2);
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

  it('should close dialog when customer support agent logout', () => {
    spyOn(launchDialogService, 'closeDialog').and.stub();
    csAgentAuthService.logoutCustomerSupportAgent();
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should not display error', () => {
    component.errorAlert$.subscribe((value) => {
      expect(value).toBeFalsy();
    });
    component.errorTab$.subscribe((value) => {
      expect(value).toBeFalsy();
    });
  });

  describe('Tab navigation', () => {
    it('should display tabs', () => {
      expect(component.tabHeaderItems.length).toBe(
        mockAsmConfig.asmCustomer360?.tabs?.length
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

  describe('Unhappy path for header and tab content', () => {
    it('should display error message if fail to get header data', () => {
      spyOn(asmCustomer360Facade, 'get360Data').and.callFake(
        (components: Array<AsmCustomer360TabComponent>) => {
          const overview = components.filter(
            (comp) => comp.requestData?.type === AsmCustomer360Type.OVERVIEW
          );
          if (overview.length) {
            return throwError({
              error: {
                errors: [{ type: 'UnknownIdentifierError' }],
              },
            });
          } else {
            return of({ value: [mockOverview] });
          }
        }
      );
      fixture = TestBed.createComponent(AsmCustomer360Component);
      component = fixture.componentInstance;
      el = fixture.debugElement;

      fixture.detectChanges();
      component.customerOverview$.subscribe().unsubscribe();

      component.errorAlert$.subscribe((value) => {
        expect(value).toBeTruthy();
      });
      component.errorTab$.subscribe((value) => {
        expect(value).toBeFalsy();
      });
    });

    it('should display the tab content with error if backend call fails', () => {
      spyOn(asmCustomer360Facade, 'get360Data').and.callFake(
        (components: Array<AsmCustomer360TabComponent>) => {
          const overview = components.filter(
            (comp) => comp.requestData?.type === AsmCustomer360Type.OVERVIEW
          );
          if (overview.length) {
            return of({ value: [mockOverview] });
          } else {
            return throwError({
              error: {
                errors: [{ type: 'UnknownIdentifierError' }],
              },
            });
          }
        }
      );
      fixture = TestBed.createComponent(AsmCustomer360Component);
      component = fixture.componentInstance;
      el = fixture.debugElement;

      fixture.detectChanges();
      component.customerOverview$.subscribe().unsubscribe();

      component.errorAlert$.subscribe((value) => {
        expect(value).toBeTruthy();
      });
      component.errorTab$.subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });
  });
});
