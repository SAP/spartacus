import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { LoginRegisterComponent } from './login-register.component';
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let routingService: RoutingService;

  class MockActivatedRoute {
    snapshot = {
      queryParams: {
        forced: false,
      },
    };
  }

  function createComponent() {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService);
  }

  function callNgInit() {
    component.ngOnInit();
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    })
      .overrideComponent(LoginRegisterComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, FeatureDirective],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockFeatureDirective],
        },
      })
      .compileComponents();
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

  describe('Register/Guest checkout', () => {
    it('should show Register button when forced flag is false', () => {
      const registerLinkElement: HTMLElement = getRegisterLink().nativeElement;
      const guestLink: DebugElement = getGuestCheckoutLink();

      expect(guestLink).toBeFalsy();
      expect(registerLinkElement).toBeTruthy();
    });

    it('should show "Guest checkout" when forced flag is true', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).overrideComponent(LoginRegisterComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, FeatureDirective],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockFeatureDirective],
        },
      });
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

      callNgInit();

      const guestLinkElement: HTMLElement =
        getGuestCheckoutLink().nativeElement;
      const registerLink = getRegisterLink();

      expect(registerLink).toBeFalsy();
      expect(guestLinkElement).toBeTruthy();
    });

    it('should provide accessible label association for Register button', () => {
      const registerLinkElement: HTMLElement = getRegisterLink().nativeElement;

      expect(registerLinkElement.getAttribute('aria-labelledby')).toBe(
        'register-section-label register-action-label'
      );
      expect(
        registerLinkElement.querySelector('#register-action-label')
      ).toBeTruthy();
    });

    it('should provide accessible label association for Guest checkout button', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).overrideComponent(LoginRegisterComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, FeatureDirective],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockFeatureDirective],
        },
      });
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
      callNgInit();

      const guestLinkElement: HTMLElement =
        getGuestCheckoutLink().nativeElement;

      expect(guestLinkElement.getAttribute('aria-labelledby')).toBe(
        'register-section-label register-action-label'
      );
      expect(
        guestLinkElement.querySelector('#register-action-label')
      ).toBeTruthy();
    });

    it('should navigate to register', () => {
      spyOn(routingService, 'go');
      const registerLink = getRegisterLink();

      registerLink.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'register',
      });
    });

    it('should navigate to checkout login for Guest Checkout', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).overrideComponent(LoginRegisterComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, FeatureDirective],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockFeatureDirective],
        },
      });
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
      callNgInit();
      spyOn(routingService, 'go');
      const guestLinkElement = getGuestCheckoutLink();

      guestLinkElement.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'checkoutLogin',
      });
    });
  });
});
