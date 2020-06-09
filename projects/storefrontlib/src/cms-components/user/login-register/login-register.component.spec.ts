import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponent } from './login-register.component';
import { I18nTestingModule } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CheckoutConfigService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform() {}
  }

  class MockCheckoutConfigService {
    isGuestCheckout() {
      return false;
    }
  }

  class MockActivatedRoute {
    snapshot = {
      queryParams: {
        forced: false,
      },
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [LoginRegisterComponent, MockUrlPipe],
      providers: [
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('guest checkout', () => {
    it('should show "Register" when forced flag is false', () => {
      const registerLinkElement: HTMLElement = fixture.debugElement.query(
        By.css('.btn-register')
      ).nativeElement;
      const guestLink = fixture.debugElement.query(By.css('.btn-guest'));

      expect(guestLink).toBeFalsy();
      expect(registerLinkElement).toBeTruthy();
    });

    it('should show "Guest checkout" when forced flag is true', () => {
      component.loginAsGuest = true;
      fixture.detectChanges();

      const guestLinkElement: HTMLElement = fixture.debugElement.query(
        By.css('.btn-guest')
      ).nativeElement;
      const registerLink = fixture.debugElement.query(By.css('.btn-register'));

      expect(registerLink).toBeFalsy();
      expect(guestLinkElement).toBeTruthy();
    });
  });
});
