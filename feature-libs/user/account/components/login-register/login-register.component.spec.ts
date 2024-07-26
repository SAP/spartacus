import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseSite, BaseSiteService, I18nTestingModule, RoutingService } from '@spartacus/core';
import { LoginRegisterComponent } from './login-register.component';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { Observable, of } from 'rxjs';
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let routingService: RoutingService;
  let baseSiteService: BaseSiteService;

  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform() {}
  }

  class MockActivatedRoute {
    snapshot = {
      queryParams: {
        forced: false,
      },
    };
  }

  class MockBaseSiteService {
    get(): Observable<BaseSite | undefined> {
      return of({
        registrationEnabled: true
      });
    }
  }

  const testBedDefaults = {
    imports: [RouterTestingModule, I18nTestingModule],
    declarations: [LoginRegisterComponent, MockUrlPipe, MockFeatureDirective],
    providers: [
      { provide: ActivatedRoute, useClass: MockActivatedRoute },
      { provide: RoutingService, useClass: MockRoutingService },
      { provide: BaseSiteService, useClass: MockBaseSiteService},
    ],
  };

  function createComponent() {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService);
    baseSiteService = TestBed.inject(BaseSiteService);
  }

  function callNgInit() {
    component.ngOnInit();
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
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

  it('should show component', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.innerText).toContain(
      'loginForm.dontHaveAccount'
    );
  });

  it('should not show component when register disabled', () => {
    spyOn(baseSiteService, 'get').and.returnValue(of({
      registrationEnabled: false
    }));
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.innerText).not.toContain(
      'loginForm.dontHaveAccount'
    );
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

      callNgInit();

      const guestLinkElement: HTMLElement =
        getGuestCheckoutLink().nativeElement;
      const registerLink = getRegisterLink();

      expect(registerLink).toBeFalsy();
      expect(guestLinkElement).toBeTruthy();
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
