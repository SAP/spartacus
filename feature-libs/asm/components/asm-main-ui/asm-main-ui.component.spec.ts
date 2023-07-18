import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmService } from '@spartacus/asm/core';
import {
  AsmEnablerService,
  AsmUi,
  CsAgentAuthService,
  CustomerListColumnActionType,
} from '@spartacus/asm/root';
import {
  AuthService,
  FeatureConfigService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  User,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import { AsmMainUiComponent } from './asm-main-ui.component';

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
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
}

const mockAsmUi: AsmUi = {
  collapsed: false,
};

describe('AsmMainUiComponent', () => {
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
  let featureConfig: FeatureConfigService;
  let asmEnablerService: AsmEnablerService;
  const testCustomerId: string = 'test.customer@hybris.com';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          AsmMainUiComponent,
          MockAsmToggleUiComponent,
          MockCSAgentLoginFormComponent,
          MockCustomerSelectionComponent,
          MockAsmSessionTimerComponent,
          MockCustomerEmulationComponent,
        ],
        providers: [
          { provide: AuthService, useClass: MockAuthService },
          { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
          { provide: UserAccountFacade, useClass: MockUserAccountFacade },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: AsmComponentService, useClass: MockAsmComponentService },
          { provide: AsmService, useClass: MockAsmService },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

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
    featureConfig = TestBed.inject(FeatureConfigService);
    asmEnablerService = TestBed.inject(AsmEnablerService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authorizeCustomerSupportAgent() on agent login form submit', () => {
    spyOn(csAgentAuthService, 'authorizeCustomerSupportAgent').and.stub();

    const userId = 'asagent';
    const password = 'password';
    component.loginCustomerSupportAgent({ userId, password });
    expect(
      csAgentAuthService.authorizeCustomerSupportAgent
    ).toHaveBeenCalledWith(userId, password);
  });

  it('should call logoutCustomerSupportAgentAndCustomer() on agent logout', () => {
    spyOn(
      asmComponentService,
      'logoutCustomerSupportAgentAndCustomer'
    ).and.stub();

    component.logout();

    expect(
      asmComponentService.logoutCustomerSupportAgentAndCustomer
    ).toHaveBeenCalled();
  });

  it('should call authService.startCustomerEmulationSession() when startCustomerEmulationSession() is called', () => {
    spyOn(csAgentAuthService, 'startCustomerEmulationSession').and.stub();
    const testCustomerId = 'customerid1234567890';

    component.startCustomerEmulationSession({ customerId: testCustomerId });

    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).toHaveBeenCalledWith(testCustomerId);
  });

  it('should not call authService.startCustomerEmulationSession() when customerId is undefined', () => {
    spyOn(csAgentAuthService, 'startCustomerEmulationSession').and.stub();
    spyOn(globalMessageService, 'add').and.stub();

    component.startCustomerEmulationSession({ customerId: undefined });

    expect(globalMessageService.add).toHaveBeenCalled();
    expect(
      csAgentAuthService.startCustomerEmulationSession
    ).not.toHaveBeenCalled();
  });

  it('should display the login form by default and when the collapse state is false', () => {
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(false)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeTruthy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
  });

  it('should not display the login form by default and when the collapse state is true', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ collapsed: true }));
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(false)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
  });

  it('should display the customer selection state when an agent is signed in and when the collapse state is false', () => {
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(userAccountFacade, 'get').and.returnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeTruthy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeTruthy();
    expect(el.query(By.css('cx-customer-emulation'))).toBeFalsy();
    expect(el.query(By.css('button[title="asm.logout"]'))).toBeTruthy();
  });

  it('should not display the customer selection state when an agent is signed in and when the collapse state is true', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ collapsed: true }));
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(userAccountFacade, 'get').and.returnValue(of({}));
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
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(userAccountFacade, 'get').and.returnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('cx-customer-emulation'))).toBeTruthy();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('cx-asm-session-timer'))).toBeTruthy();
    expect(el.query(By.css('button[title="asm.logout"]'))).toBeTruthy();
  });

  it('should not display customer emulation state when a customer is signed in and when the collapse state is true', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ collapsed: true }));
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(userAccountFacade, 'get').and.returnValue(of(testUser));
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
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(
      asmComponentService,
      'isCustomerEmulationSessionInProgress'
    ).and.returnValue(of(true));

    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'remove').and.stub();
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect to home when not starting a customer emulation session.', () => {
    component['startingCustomerSession'] = false;
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(
      asmComponentService,
      'isCustomerEmulationSessionInProgress'
    ).and.returnValue(of(true));

    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'remove').and.stub();
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not redirect to home when not handling a customer emulation session token.', () => {
    component['startingCustomerSession'] = true;
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(
      asmComponentService,
      'isCustomerEmulationSessionInProgress'
    ).and.returnValue(of(false));

    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'remove').and.stub();
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should hide the UI when the Close Asm button is clicked', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(
      By.css('button[title="asm.hideUi"]')
    );
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(component.disabled).toEqual(true);
  });

  it('should unload ASM when the close button is clicked', () => {
    spyOn(asmComponentService, 'unload').and.stub();
    component.ngOnInit();
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(
      By.css('button[title="asm.hideUi"]')
    );
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(asmComponentService.unload).toHaveBeenCalled();
  });

  it('should be able to open dialog', () => {
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    component.showCustomList();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.ASM_CUSTOMER_LIST,
      component.element
    );
  });

  it('should be able to navigate to Order history', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.showCustomList();
    dialogClose$.next({
      selectedUser: {},
      actionType: CustomerListColumnActionType.ORDER_HISTORY,
    });
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'orders' });
  });

  it('should be able to open create account dialog', () => {
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    component.createCustomer();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      component.addNewCustomerLink
    );
  });

  it('should not display confirm switch dialog customer when agent has logined and customerId in deeplink is same', () => {
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );

    spyOn(userAccountFacade, 'get').and.returnValue(
      of({ customerId: 'testuser' })
    );
    spyOn(userAccountFacade, 'getById').and.returnValue(
      of({ customerId: 'testuser' })
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(asmComponentService, 'setEmulatedByDeepLink').and.stub();
    spyOn(asmComponentService, 'getSearchParameter').and.returnValue(
      'testuser'
    );
    spyOn(asmComponentService, 'getDeepLinkUrlParams').and.returnValue({
      customerId: 'testuser',
    });

    spyOn(featureConfig, 'isLevel').and.returnValue(true);

    component.ngOnInit();
    expect(asmComponentService.setEmulatedByDeepLink).toHaveBeenCalledWith(
      true
    );
  });

  it('should display confirm switch dialog customer when agent has logined and user is login if customerId shows in URL', () => {
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(true));
    spyOn(asmComponentService, 'isEmulatedByDeepLink').and.returnValue(
      new BehaviorSubject(false)
    );
    spyOn(asmComponentService, 'getDeepLinkUrlParams').and.returnValue({
      customerId: 'newuser',
    });

    const oldUser = { customerId: 'olduser', name: 'Test old User' } as User;
    const newUser = { customerId: 'newuser', name: 'Test new User' } as User;

    spyOn(userAccountFacade, 'get').and.returnValue(of(oldUser));
    spyOn(userAccountFacade, 'getById').and.returnValue(of(newUser));

    spyOn(asmComponentService, 'logoutCustomer').and.stub();
    spyOn(launchDialogService, 'openDialogAndSubscribe').and.stub();
    spyOn(asmComponentService, 'getSearchParameter').and.returnValue('newuser');

    spyOn(featureConfig, 'isLevel').and.returnValue(true);

    component.ngOnInit();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
  });

  it('should call startCustomerEmulationSession when agent has logined and user is not login if customerId shows in URL', (done) => {
    spyOn(csAgentAuthService, 'startCustomerEmulationSession').and.stub();
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(asmComponentService, 'logoutCustomer').and.stub();
    spyOn(asmComponentService, 'getDeepLinkUrlParams').and.returnValue({
      customerId: testCustomerId,
    });
    spyOn(asmComponentService, 'getSearchParameter').and.returnValue(
      testCustomerId
    );
    spyOn(featureConfig, 'isLevel').and.returnValue(true);

    component.ngOnInit();
    expect(asmComponentService.logoutCustomer).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(
        csAgentAuthService.startCustomerEmulationSession
      ).toHaveBeenCalledWith(testCustomerId);
      done();
    }, 200);
  });

  it('should not call startCustomerEmulationSession when agent has logined and user is not login if no customerId shows in URL', (done) => {
    spyOn(csAgentAuthService, 'startCustomerEmulationSession').and.stub();
    spyOn(csAgentAuthService, 'isCustomerSupportAgentLoggedIn').and.returnValue(
      of(true)
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(of(false));
    spyOn(featureConfig, 'isLevel').and.returnValue(true);

    component.ngOnInit();
    setTimeout(() => {
      expect(
        csAgentAuthService.startCustomerEmulationSession
      ).not.toHaveBeenCalled();
      done();
    }, 200);
  });

  it('should call navigate to home page when isEmulatedByDeepLink return true', () => {
    spyOn(routingService, 'go').and.stub();
    dialogClose$.next({
      selectedUser: {},
      actionType: null,
    });

    spyOn(asmComponentService, 'isEmulateInURL').and.returnValue(true);
    spyOn(featureConfig, 'isLevel').and.returnValue(true);
    spyOn(asmEnablerService, 'isEmulateInURL').and.returnValue(true);
    component.ngOnInit();
    expect(routingService.go).toHaveBeenCalledWith('/');
  });

  it('should not call navigate to home page when isEmulatedByDeepLink return false', () => {
    spyOn(routingService, 'go').and.stub();
    dialogClose$.next({
      selectedUser: {},
      actionType: null,
    });

    spyOn(asmComponentService, 'isEmulateInURL').and.returnValue(false);
    spyOn(featureConfig, 'isLevel').and.returnValue(true);
    spyOn(asmEnablerService, 'isEmulateInURL').and.returnValue(false);
    component.ngOnInit();
    expect(routingService.go).not.toHaveBeenCalledWith('/');
  });

  it('should call navigate to order details when starting session with orderId in parameters', () => {
    spyOn(routingService, 'go').and.stub();

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
    spyOn(routingService, 'go').and.stub();

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
    spyOn(routingService, 'go').and.stub();

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
    spyOn(routingService, 'go').and.stub();

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'saved' }
    );

    expect(routingService.go).toHaveBeenCalledWith('my-account/saved-cart/456');
  });

  it('should call navigate to saved cart when starting session with savedCartId and ticketId in parameters', () => {
    spyOn(routingService, 'go').and.stub();

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'saved', ticketId: '123' }
    );

    expect(routingService.go).toHaveBeenCalledWith('my-account/saved-cart/456');
  });

  it('should not call naviate when starting session with active cartId and ticketId in parameters', () => {
    spyOn(routingService, 'go').and.stub();

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'active', ticketId: '123' }
    );

    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not call navigate when starting session with inactive cartId and ticketId in parameters', () => {
    spyOn(routingService, 'go').and.stub();

    component.startCustomerEmulationSession(
      { customerId: '123' },
      { cartId: '456', cartType: 'inactive', ticketId: '123' }
    );

    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should emit false when close inactive cart info', () => {
    spyOn(asmComponentService, 'setShowDeeplinkCartInfoAlert').and.stub();
    component.closeDeeplinkCartInfoAlert();
    expect(
      asmComponentService.setShowDeeplinkCartInfoAlert
    ).toHaveBeenCalledWith(false);
  });
});
