import { Component, EventEmitter, Output, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, I18nTestingModule, UserToken } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmComponent } from './asm.component';

class MockAuthService {
  authorizeCustomerSupporAgent(): void {}
  logoutCustomerSupportAgent(): void {}
  getCustomerSupportAgentToken(): Observable<UserToken> {
    return of({} as UserToken);
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

describe('AsmComponent', () => {
  let component: AsmComponent;
  let fixture: ComponentFixture<AsmComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmComponent,
        MockCSAgentLoginFormComponent,
        MockCustomerSelectionComponent,
      ],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService as Type<AuthService>);
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
});
