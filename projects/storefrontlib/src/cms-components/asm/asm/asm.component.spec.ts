import { Component, DebugElement, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService, I18nTestingModule, User, UserService, UserToken } from '@spartacus/core';
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

fdescribe('AsmComponent', () => {
  let component: AsmComponent;
  let fixture: ComponentFixture<AsmComponent>;
  let authService: AuthService;
  let userService: UserService;
  let el: DebugElement;

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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmComponent);
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
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

  it('should call authService.startCustomerEmulationSession() startCustomerEmulationSession() is called', () => {
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

  it('should call authService.logout() when stopCustomerSession() is called', () => {
    spyOn(authService, 'logout').and.stub();
    component.stopCustomerEmulationSession();
    expect(authService.logout).toHaveBeenCalled();
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

  it('should display stop customer session button during a customer session.', () => {
    spyOn(authService, 'getCustomerSupportAgentToken').and.returnValue(
      of(mockToken)
    );
    spyOn(authService, 'getUserToken').and.returnValue(of(mockToken));
    spyOn(userService, 'get').and.returnValue(
      of({ uid: 'testUser', name: 'test' } as User)
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.query(By.css('cx-csagent-login-form'))).toBeFalsy();
    expect(el.query(By.css('cx-customer-selection'))).toBeFalsy();
    expect(el.query(By.css('button'))).toBeTruthy();
  });
});
