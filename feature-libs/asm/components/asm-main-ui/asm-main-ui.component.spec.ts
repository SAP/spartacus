import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmService, AsmUi } from '@spartacus/asm/core';
import { CsAgentAuthService } from '@spartacus/asm/root';
import {
  AuthService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
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

class MockUserService implements Partial<UserService> {
  get(): Observable<User> {
    return of({});
  }
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

class MockAsmComponentService {
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
  let userService: UserService;
  let el: DebugElement;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;
  let asmComponentService: AsmComponentService;
  let asmService: AsmService;

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
          { provide: UserService, useClass: MockUserService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: AsmComponentService, useClass: MockAsmComponentService },
          { provide: AsmService, useClass: MockAsmService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmMainUiComponent);
    authService = TestBed.inject(AuthService);
    csAgentAuthService = TestBed.inject(CsAgentAuthService);
    userService = TestBed.inject(UserService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    routingService = TestBed.inject(RoutingService);
    asmComponentService = TestBed.inject(AsmComponentService);
    asmService = TestBed.inject(AsmService);
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
    spyOn(userService, 'get').and.returnValue(of({}));
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
    spyOn(userService, 'get').and.returnValue(of({}));
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
    spyOn(userService, 'get').and.returnValue(of(testUser));
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
    spyOn(userService, 'get').and.returnValue(of(testUser));
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
});
