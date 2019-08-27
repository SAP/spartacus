import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  AsmService,
  AsmUi,
  AuthService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  User,
  UserService,
  UserToken,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmComponent } from './asm.component';

const mockToken = {
  access_token: 'asdfasf',
  userId: 'user@sap.com',
  refresh_token: 'foo',
} as UserToken;

class MockAuthService {
  authorizeCustomerSupporAgent(): void {}
  logoutCustomerSupportAgent(): void {}
  logout(): void {}
  getCustomerSupportAgentToken(): Observable<UserToken> {
    return of({} as UserToken);
  }
  getUserToken(): Observable<UserToken> {
    return of({} as UserToken);
  }
  startCustomerEmulationSession(
    _customerSupportAgentToken: UserToken,
    _customerId: string
  ) {}
  isCustomerEmulationToken() {}
}

class MockUserService {
  get(): Observable<User> {
    return of({});
  }
}

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
}
class MockGlobalMessageService {
  remove() {}
}
class MockAsmService {
  getAsmUiState(): Observable<AsmUi> {
    return of({ visible: true } as AsmUi);
  }
  updateAsmUiState(): void {}
}

const mockQueryParamMap = {
  get() {},
};
const activatedRouteMock = {
  queryParamMap: of(mockQueryParamMap),
};

class MockRoutingService {
  go() {}
}

describe('AsmComponent', () => {
  let component: AsmComponent;
  let fixture: ComponentFixture<AsmComponent>;
  let authService: AuthService;
  let userService: UserService;
  let el: DebugElement;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;
  let asmService: AsmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmComponent,
        MockCSAgentLoginFormComponent,
        MockCustomerSelectionComponent,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AsmService, useClass: MockAsmService },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmComponent);
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    globalMessageService = TestBed.get(GlobalMessageService);
    asmService = TestBed.get(AsmService);
    routingService = TestBed.get(RoutingService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authorizeCustomerSupporAgent() on agent login form submit', () => {
    spyOn(authService, 'authorizeCustomerSupporAgent').and.stub();

    const userId = 'asagent';
    const password = 'password';
    component.loginCustomerSupportAgent({ userId, password });
    expect(authService.authorizeCustomerSupporAgent).toHaveBeenCalledWith(
      userId,
      password
    );
  });

  it('should call logoutCustomerSupportAgent() on agent logout', () => {
    spyOn(authService, 'logoutCustomerSupportAgent').and.stub();
    component.logoutCustomerSupportAgent();
    expect(authService.logoutCustomerSupportAgent).toHaveBeenCalled();
  });

  it('should call authService.startCustomerEmulationSession() when startCustomerEmulationSession() is called', () => {
    spyOn(authService, 'startCustomerEmulationSession').and.stub();
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    const testCustomerId = 'customerid1234567890';
    component.startCustomerEmulationSession({ customerId: testCustomerId });
    expect(authService.startCustomerEmulationSession).toHaveBeenCalledWith(
      mockToken,
      testCustomerId
    );
  });

  it('should display the login form by default', () => {
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(of({}));
    spyOn(authService, 'getUserToken').and.returnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeTruthy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
  });

  it('should display the customer selection when an agent is signed in', () => {
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    spyOn(authService, 'getUserToken').and.returnValue(of({}));
    spyOn(userService, 'get').and.returnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeTruthy();
  });

  it('should display only user info during customer emulation.', () => {
    const testUser = { uid: 'user@test.com', name: 'Test User' } as User;
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
    spyOn(userService, 'get').and.returnValue(of(testUser));
    component.ngOnInit();
    fixture.detectChanges();

    expect(el.nativeElement.textContent).toContain(testUser.uid);
    expect(el.nativeElement.textContent).toContain(testUser.name);
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
  });

  it('should redirect to home when starting a customer emulation session.', () => {
    component['startingCustomerSession'] = true;
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
    spyOn(authService, 'isCustomerEmulationToken').and.returnValue(true);

    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'remove').and.stub();
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect to home when not starting a customer emulation session.', () => {
    component['startingCustomerSession'] = false;
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
    spyOn(authService, 'isCustomerEmulationToken').and.returnValue(true);

    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'remove').and.stub();
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not redirect to home when not handling a customer emulation session token.', () => {
    component['startingCustomerSession'] = true;
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
    spyOn(authService, 'isCustomerEmulationToken').and.returnValue(false);

    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'remove').and.stub();
    component.ngOnInit();
    fixture.detectChanges();

    expect(globalMessageService.remove).not.toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should not show UI if UI state is not visisble', () => {
    spyOn(asmService, 'getAsmUiState').and.returnValue(of({ visible: false }));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
  });

  it('should show UI if the activated route has query param ?asm=true', () => {
    spyOn(asmService, 'updateAsmUiState').and.stub();
    spyOn(mockQueryParamMap, 'get').and.returnValue('true');
    component.ngOnInit();
    fixture.detectChanges();
    expect(asmService.updateAsmUiState).toHaveBeenCalledWith({ visible: true });
  });

  it('should hide the UI when the Close Asm button is clicked', () => {
    spyOn(asmService, 'updateAsmUiState').and.stub();
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(of({}));
    spyOn(authService, 'getUserToken').and.returnValue(of({}));
    component.ngOnInit();
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(By.css('button'));
    submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(asmService.updateAsmUiState).toHaveBeenCalledWith({
      visible: false,
    });
  });
});
