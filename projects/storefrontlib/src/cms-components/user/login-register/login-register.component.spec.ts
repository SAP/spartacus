import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponent } from './login-register.component';
import {
  FeaturesConfig,
  FeaturesConfigModule,
  I18nTestingModule,
} from '@spartacus/core';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CheckoutConfigService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;

  let checkoutConfigService;

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

  const testBedDefaults = {
    imports: [I18nTestingModule, FeaturesConfigModule],
    declarations: [LoginRegisterComponent, MockUrlPipe],
    providers: [
      { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
      { provide: ActivatedRoute, useClass: MockActivatedRoute },
      {
        provide: FeaturesConfig,
        useValue: {
          features: { level: '2.1' },
        },
      },
    ],
  };

  function createComponent() {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
  }

  function callNgInit() {
    component.ngOnInit();
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedDefaults).compileComponents();
  }));

  beforeEach(() => {
    createComponent();
    callNgInit();
  });

  function getRegisterLink() {
    return fixture.debugElement.query(By.css('.btn-register'));
  }

  function getGuestCheckoutLink() {
    return fixture.debugElement.query(By.css('.btn-guest'));
  }

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('2.0 Feature level', () => {
    it('Should not render component with feature level 2.0', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule(testBedDefaults);
      TestBed.overrideProvider(FeaturesConfig, {
        useValue: {
          features: { level: '2.0' },
        },
      });
      TestBed.compileComponents();

      createComponent();
      callNgInit();

      const registerContainer = fixture.debugElement.query(By.css('.register'));

      expect(registerContainer).toBeFalsy();
    });
  });

  describe('Register/Guest checkout', () => {
    it('should show Register button when forced flag is false', () => {
      const registerLinkElement: HTMLElement = getRegisterLink().nativeElement;
      const guestLink: DebugElement = getGuestCheckoutLink();

      expect(guestLink).toBeFalsy();
      expect(registerLinkElement).toBeTruthy();
    });

    it('should show "Guest checkout" when forced flag is true', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule(testBedDefaults);
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
          snapshot: {
            queryParams: {
              forced: true,
            },
          },
        },
      });
      TestBed.compileComponents();

      createComponent();
      checkoutConfigService = TestBed.inject(CheckoutConfigService);

      spyOn(checkoutConfigService, 'isGuestCheckout').and.returnValue(true);

      callNgInit();

      const guestLinkElement: HTMLElement = getGuestCheckoutLink()
        .nativeElement;
      const registerLink = getRegisterLink();

      expect(registerLink).toBeFalsy();
      expect(guestLinkElement).toBeTruthy();
    });
  });
});
