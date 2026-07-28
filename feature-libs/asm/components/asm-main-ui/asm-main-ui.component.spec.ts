import {
  Component,
  DebugElement,
  Directive,
  EventEmitter,
  Injectable,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmService } from '@spartacus/asm/core';
import {
  AsmConfig,
  AsmEnablerService,
  AsmSessionCreationOptions,
  AsmUi,
  CsAgentAuthService,
  CustomerListColumnActionType,
} from '@spartacus/asm/root';
import {
  AuthService,
  CxDatePipe,
  FeatureModulesService,
  GlobalMessageService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  OAuthLibWrapperService,
  RoutingService,
  TranslatePipe,
  User,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import {
  AsmSessionTimerComponent,
  AsmToggleUiComponent,
  CSAgentLoginFormComponent,
  CustomerEmulationComponent,
  CustomerSelectionComponent,
} from '../public_api';
import { AsmComponentService } from '../services/asm-component.service';
import { AsmMainUiComponent } from './asm-main-ui.component';

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }

  updateIsUsingASMClient(_isUsing: boolean) {
    return of(false);
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  authorizeCustomerSupportAgent(): Promise<void> {
    return Promise.resolve();
  }
  isCustomerSupportAgentLoggedIn(): Observable<boolean> {
    return of(false);
  }
  getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    return of(false);
  }
  startCustomerEmulationSession(_customerId: string) {}

  authorizeCustomerSupportAgentWhenUseCodeFlow(): Promise<void> {
    return Promise.resolve();
  }
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get(): Observable<User> {
    return EMPTY;
  }

  getById(): Observable<User> {
    return EMPTY;
  }
}

export class MockNgbModalRef {
  componentInstance = {
    selectedUserGroupId: '',
    customerSearchPage$: of({}),
    customerListsPage$: of({}),
    selectedCustomer: {},
    fetchCustomers: () => {},
    closeModal: (_reason?: any) => {},
  };
  result: Promise<any> = new Promise(() => {});
}

const dialogClose$ = new BehaviorSubject<any>('');
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }
  get dialogClose() {
    return dialogClose$.asObservable();
  }

  closeDialog() {}
}

@Component({
  selector: 'cx-asm-toggle-ui',
  template: '',
})
class MockAsmToggleUiComponent {}

@Component({
  selector: 'cx-asm-session-timer',
  template: '',
})
class MockAsmSessionTimerComponent {}

@Component({
  selector: 'cx-customer-selection',
  template: '',
})
class MockCustomerSelectionComponent {
  @Output()
  submitEvent = new EventEmitter();
}
@Component({
  selector: 'cx-csagent-login-form',
  template: '',
})
class MockCSAgentLoginFormComponent {
  @Output()
  submitEvent = new EventEmitter();
  @Input()
  csAgentTokenLoading = false;
}
@Component({
  template: '',
  selector: 'cx-customer-emulation',
})
class MockCustomerEmulationComponent {}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  remove() {}
  add() {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class mockFeatureModulesService implements Partial<FeatureModulesService> {
  isConfigured(): boolean {
    return true;
  }
  resolveFeature(featureName: string): Observable<any> {
    return of(featureName);
  }
}

@Injectable()
class MockAsmComponentService extends AsmComponentService {
  logoutCustomerSupportAgentAndCustomer(): void {}
  unload() {}
  isCustomerEmulationSessionInProgress() {
    return of(false);
  }
}

class MockAsmService implements Partial<AsmService> {
  getAsmUiState(): Observable<AsmUi> {
    return of(mockAsmUi);
  }

  createAsmSessionEvent(_option: AsmSessionCreationOptions): void {}

  customerSearch(_searchTerm: unknown): void {}
}

const mockAsmUi: AsmUi = {
  collapsed: false,
};

class MockOAuthLibWrapperService implements Partial<OAuthLibWrapperService> {
  refreshAuthConfig() {}
}

@Directive({ selector: '[cxFeature]' })
export class MockRevertedFeatureDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {}

  @Input() set cxFeature(_feature: string) {
    if (_feature.toString().includes('!')) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

describe('AsmMainUiComponent', () => {
  let featureModulesService: FeatureModulesService;
  let component: AsmMainUiComponent;
  let fixture: ComponentFixture<AsmMainUiComponent>;
  let authService: AuthService;
  let csAgentAuthService: CsAgentAuthService;
  let userAccountFacade: UserAccountFacade;
  let el: DebugElement;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;
  let asmComponentService: AsmComponentService;
  let asmService: AsmService;
  let launchDialogService: LaunchDialogService;
  let asmEnablerService: AsmEnablerService;
  let asmConfig: AsmConfig;
  const testCustomerId: string = 'test.customer@hybris.com';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, AsmMainUiComponent],
      providers: [
        {
          provide: FeatureModulesService,
          useClass: mockFeatureModulesService,
        },
        { provide: AuthService, useClass: MockAuthService },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AsmComponentService, useClass: MockAsmComponentService },
        { provide: AsmService, useClass: MockAsmService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: OAuthLibWrapperService,
          useClass: MockOAuthLibWrapperService,
        },
      ],
    })
      .overrideComponent(AsmMainUiComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            AsmToggleUiComponent,
            CSAgentLoginFormComponent,
            CustomerSelectionComponent,
            AsmSessionTimerComponent,
            CustomerEmulationComponent,
            IconComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockAsmToggleUiComponent,
            MockCSAgentLoginFormComponent,
            MockCustomerSelectionComponent,
            MockAsmSessionTimerComponent,
            MockCustomerEmulationComponent,
            MockCxIconComponent,
            MockRevertedFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmMainUiComponent);
    authService = TestBed.inject(AuthService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    userAccountFacade = TestBed.inject(UserAccountFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);
    asmComponentService = TestBed.inject(AsmComponentService);
    asmService = TestBed.inject(AsmService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    asmEnablerService = TestBed.inject(AsmEnablerService);
    featureModulesService = TestBed.inject(FeatureModulesService);
    asmConfig = TestBed.inject(AsmConfig);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call authorizeCustomerSupportAgent() on agent login form submit', () => {
    fixture.detectChanges();
    vi.spyOn(csAgentAuthService, 'authorizeCustomerSupportAgent').mockImplementation(() => {});

    const userId = 'asagent';
    const password = 'password';
    component.loginCustomerSupportAgent({ userId, password });
    expect(
      csAgentAuthService.authorizeCustomerSupportAgent
    ).toHaveBeenCalledWith(userId, password);
  });

  it('should call authorizeCustomerSupportAgentWhenUseCodeFlow() when click agent login link', () => {
    fixture.detectChanges();
    vi.spyOn(
      csAgentAuthService,
      'authorizeCustomerSupportAgentWhenUseCodeFlow'
    ).mockImplementation(() => {});
    component.loginCustomerSupportAgentWithAuthorizationCodeFlow();
    expect(
      csAgentAuthService.authorizeCustomerSupportAgentWhenUseCodeFlow
    ).toHaveBeenCalled();
  });

  it('should call logoutCustomerSupportAgentAndCustomer() on agent logout', () => {
    fixture.detectChanges();
    vi.spyOn(
      asmComponentService,
      'logoutCustomerSupportAgentAndCustomer'
    ).mockImplementation(() => {});

    component.logout();

    expect(
      asmComponentService.logoutCustomerSupportAgentAndCustomer
    ).toHaveBeenCalled();
  });

  it('should call authService.startCustomerEmulationSession() and asmService.createAsmSessionEvent() when startCustomerEmulationSession() is called', () => {
    vi.spyOn(csAgentAuthService, 'startCustomerEmulationSession').mockImplementation(() => {});
    vi.spyOn(asmService, 'createAsmSessionEvent').mockImplementation(() => {});
    asmConfig.asm = { asmSessionSupport: { enabled: true } };
    const testCustomerId = 'customerid1234567890';
    component.ngOnInit();
    component.startCustomerEmulationSession({ customerId: testCustomerId });

    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).toHaveBeenCalledWith(testCustomerId);
    expect(asmService.createAsmSessionEvent).toHaveBeenCalledWith({
      eventType: 'StartSession',
    });
  });

  it('should not call asmService.createAsmSessionEvent() when asmSessionSupport is false', () => {
    vi.spyOn(asmService, 'createAsmSessionEvent').mockImplementation(() => {});
    vi.spyOn(csAgentAuthService, 'startCustomerEmulationSession').mockImplementation(() => {});

    asmConfig.asm = { asmSessionSupport: { enabled: false } };
    const testCustomerId = 'customerid1234567890';
    component.ngOnInit();
    component.startCustomerEmulationSession({ customerId: testCustomerId });

    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).toHaveBeenCalledWith(testCustomerId);
    expect(asmService.createAsmSessionEvent).not.toHaveBeenCalled();
  });

  it('should not call authService.startCustomerEmulationSession() when customerId is undefined', () => {
    vi.spyOn(csAgentAuthService, 'startCustomerEmulationSession').mockImplementation(() => {});
    vi.spyOn(globalMessageService, 'add').mockImplementation(() => {});

    component.startCustomerEmulationSession({ customerId: undefined });

    expect(globalMessageService.add).toHaveBeenCalled();
    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).not.toHaveBeenCalled();
  });

  it('should display the login form by default and when the collapse state is false', () => {
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(false)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeTruthy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
  });

  it('should not display the login form by default and when the collapse state is true', () => {
    vi.spyOn(asmService, 'getAsmUiState').mockReturnValue(of({ collapsed: true }));
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(false)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
  });

  it('should display the customer selection state when an agent is signed in and when the collapse state is false', () => {
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeTruthy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeTruthy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
    expect(el.query(By.css('button[title="asm.logout"]'))).toBeTruthy();
  });

  it('should not display the customer selection state when an agent is signed in and when the collapse state is true', () => {
    vi.spyOn(asmService, 'getAsmUiState').mockReturnValue(of({ collapsed: true }));
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeTruthy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
    expect(el.query(By.css('button[title="asm.logout"]'))).toBeTruthy();
  });

  it('should display customer emulation state when a customer is signed in and when the collapse state is false', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('cx-customer-emulation'))).toBeTruthy();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeTruthy();
    expect(el.query(By.css('button[title="asm.logout"]'))).toBeTruthy();
  });

  it('should not display customer emulation state when a customer is signed in and when the collapse state is true', () => {
    vi.spyOn(asmService, 'getAsmUiState').mockReturnValue(of({ collapsed: true }));
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeTruthy();
    expect(el.query(By.css('button[title="asm.logout"]'))).toBeTruthy();
  });

  it('should redirect to home when starting a customer emulation session.', () => {
    component['startingCustomerSession'] = true;
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(
      asmComponentService,
      'isCustomerEmulationSessionInProgress'
    ).mockReturnValue(of(true));

    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    vi.spyOn(globalMessageService, 'remove').mockImplementation(() => {});
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect to home when not starting a customer emulation session.', () => {
    component['startingCustomerSession'] = false;
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(
      asmComponentService,
      'isCustomerEmulationSessionInProgress'
    ).mockReturnValue(of(true));

    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    vi.spyOn(globalMessageService, 'remove').mockImplementation(() => {});
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not redirect to home when not handling a customer emulation session token.', () => {
    component['startingCustomerSession'] = true;
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(
      asmComponentService,
      'isCustomerEmulationSessionInProgress'
    ).mockReturnValue(of(false));

    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    vi.spyOn(globalMessageService, 'remove').mockImplementation(() => {});
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should hide the UI when the Close Asm button is clicked', () => {
    component.ngOnInit();
    fixture.detectChanges();
    vi.spyOn(authService, 'updateIsUsingASMClient');
    const submitBtn = fixture.debugElement.query(
      By.css('button[title="asm.hideUi"]')
    );
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(component.disabled).toEqual(true);
    expect(authService.updateIsUsingASMClient).toHaveBeenCalledWith(false);
  });

  it('should unload ASM when the close button is clicked', () => {
    vi.spyOn(asmComponentService, 'unload').mockImplementation(() => {});
    component.ngOnInit();
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(
      By.css('button[title="asm.hideUi"]')
    );
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(asmComponentService.unload).toHaveBeenCalled();
  });

  it('should be able to open dialog', () => {
    fixture.detectChanges();
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');
    component.showCustomList();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.ASM_CUSTOMER_LIST,
      component.element
    );
  });

  it('should be able to navigate to Order history', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go');
    component.showCustomList();
    dialogClose$.next({
      selectedUser: {},
      actionType: CustomerListColumnActionType.ORDER_HISTORY,
    });
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'orders' });
  });

  it('should be able to open c360 dialog', () => {
    vi.spyOn(featureModulesService, 'isConfigured').mockReturnValue(true);
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(userAccountFacade, 'get').mockReturnValue(
      of({ customerId: 'testuser' })
    );
    component.ngOnInit();
    dialogClose$.next({
      selectedUser: {},
      actionType: CustomerListColumnActionType.CUSTOMER_360,
    });

    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.ASM_CUSTOMER_360,
      component.element,
      // any parameter is accept
      expect.any(Object)
    );
  });

  it('should be able to open create account dialog', () => {
    fixture.detectChanges();
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');
    component.createCustomer();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      component.addNewCustomerLink
    );
  });

  it('should not display confirm switch dialog customer when agent has logined and customerId in deeplink is same', () => {
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );

    vi.spyOn(userAccountFacade, 'get').mockReturnValue(
      of({ customerId: 'testuser' })
    );
    vi.spyOn(userAccountFacade, 'getById').mockReturnValue(
      of({ customerId: 'testuser' })
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(asmComponentService, 'setEmulatedByDeepLink').mockImplementation(() => {});
    vi.spyOn(asmComponentService, 'getSearchParameter').mockReturnValue(
      'testuser'
    );
    vi.spyOn(asmComponentService, 'getDeepLinkUrlParams').mockReturnValue({
      customerId: 'testuser',
    });

    component.ngOnInit();
    expect(asmComponentService.setEmulatedByDeepLink).toHaveBeenCalledWith(
      true
    );
  });

  it('should display confirm switch dialog customer when agent has logined and user is login if customerId shows in URL', () => {
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(true));
    vi.spyOn(asmComponentService, 'isEmulatedByDeepLink').mockReturnValue(
      new BehaviorSubject(false)
    );
    vi.spyOn(asmComponentService, 'getDeepLinkUrlParams').mockReturnValue({
      customerId: 'newuser',
    });

    const oldUser = { customerId: 'olduser', name: 'Test old User' } as User;
    const newUser = { customerId: 'newuser', name: 'Test new User' } as User;

    vi.spyOn(userAccountFacade, 'get').mockReturnValue(of(oldUser));
    vi.spyOn(userAccountFacade, 'getById').mockReturnValue(of(newUser));

    vi.spyOn(asmComponentService, 'logoutCustomer').mockImplementation(() => {});
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe').mockImplementation(() => {});
    vi.spyOn(asmComponentService, 'getSearchParameter').mockReturnValue('newuser');

    component.ngOnInit();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
  });

  it('should call startCustomerEmulationSession when agent has logined and user is not login if customerId shows in URL', async () => {
    vi.spyOn(csAgentAuthService, 'startCustomerEmulationSession').mockImplementation(() => {});
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));
    vi.spyOn(asmComponentService, 'logoutCustomer').mockImplementation(() => {});
    vi.spyOn(asmComponentService, 'getDeepLinkUrlParams').mockReturnValue({
      customerId: testCustomerId,
    });
    vi.spyOn(asmComponentService, 'getSearchParameter').mockReturnValue(
      testCustomerId
    );

    component.ngOnInit();
    expect(asmComponentService.logoutCustomer).not.toHaveBeenCalled();
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).toHaveBeenCalledWith(testCustomerId);
  });

  it('should not call startCustomerEmulationSession when agent has logined and user is not login if no customerId shows in URL', async () => {
    vi.spyOn(csAgentAuthService, 'startCustomerEmulationSession').mockImplementation(() => {});
    vi.spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').mockReturnValue(
      of(true)
    );
    vi.spyOn(authService, 'isUserLoggedIn').mockReturnValue(of(false));

    component.ngOnInit();
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).not.toHaveBeenCalled();
  });

  it('should call navigate to home page when isEmulatedByDeepLink return true', () => {
    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    dialogClose$.next({
      selectedUser: {},
      actionType: null,
    });

    vi.spyOn(asmComponentService, 'isEmulateInURL').mockReturnValue(true);
    vi.spyOn(asmEnablerService, 'isEmulateInURL').mockReturnValue(true);
    component.ngOnInit();
    expect(routingService.go).toHaveBeenCalledWith('/');
  });

  it('should not call navigate to home page when isEmulatedByDeepLink return false', () => {
    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    dialogClose$.next({
      selectedUser: {},
      actionType: null,
    });

    vi.spyOn(asmComponentService, 'isEmulateInURL').mockReturnValue(false);
    vi.spyOn(asmEnablerService, 'isEmulateInURL').mockReturnValue(false);
    component.ngOnInit();
    expect(routingService.go).not.toHaveBeenCalledWith('/');
  });

  it('should call navigate to order details when starting session with orderId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { orderId: '456' }
    );

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: { code: '456' },
    });
  });

  it('should call navigate to order details when starting session with orderId and ticketId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { orderId: '456', ticketId: '123' }
    );

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderDetails',
      params: { code: '456' },
    });
  });

  it('should call navigate to support ticket details when starting session with ticketId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { ticketId: '456' }
    );

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'supportTicketDetails',
      params: { ticketCode: '456' },
    });
  });

  it('should call navigate to saved cart when starting session with savedCartId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'saved' }
    );

    expect(routingService.go).toHaveBeenCalledWith('my-account/saved-cart/456');
  });

  it('should call navigate to saved cart when starting session with savedCartId and ticketId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'saved', ticketId: '123' }
    );

    expect(routingService.go).toHaveBeenCalledWith('my-account/saved-cart/456');
  });

  it('should call naviate when starting session with active cartId and ticketId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    vi.spyOn(asmComponentService, 'handleDeepLinkNavigation').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'active', ticketId: '123' }
    );

    expect(routingService.go).not.toHaveBeenCalled();
    expect(asmComponentService.handleDeepLinkNavigation).toHaveBeenCalled();
  });

  it('should call navigate when starting session with inactive cartId and ticketId in parameters', () => {
    fixture.detectChanges();
    vi.spyOn(routingService, 'go').mockImplementation(() => {});
    vi.spyOn(asmComponentService, 'handleDeepLinkNavigation').mockImplementation(() => {});

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'inactive', ticketId: '123' }
    );
    expect(routingService.go).not.toHaveBeenCalled();
    expect(asmComponentService.handleDeepLinkNavigation).toHaveBeenCalled();
  });

  it('should emit false when close inactive cart info', () => {
    fixture.detectChanges();
    vi.spyOn(asmComponentService, 'setShowDeeplinkCartInfoAlert').mockImplementation(() => {});
    component.closeDeeplinkCartInfoAlert();
    expect(
      asmComponentService.setShowDeeplinkCartInfoAlert
    ).toHaveBeenCalledWith(false);
  });

  it('should enable start customer emulation session meaasge and also can close the message', () => {
    fixture.detectChanges();
    component.showCustomerEmulationInfoAlert = false;

    vi.spyOn(csAgentAuthService, 'startCustomerEmulationSession').mockImplementation(() => {});
    const testCustomerId = 'customerid1234567890';
    component.startCustomerEmulationSession({ customerId: testCustomerId });
    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).toHaveBeenCalledWith(testCustomerId);

    expect(component.showCustomerEmulationInfoAlert).toBeTruthy;
    component.closeCustomerEmulationInfoAlert();
    expect(component.showCustomerEmulationInfoAlert).toBeFalsy;
  });
});
