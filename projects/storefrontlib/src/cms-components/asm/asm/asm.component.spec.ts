import { Component, EventEmitter, Output } from '@angular/core';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AsmComponent, MockCSAgentLoginFormComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
