import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import {
  I18nTestingModule,
  RoutesConfig,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../../config/checkout-config';
import { defaultCheckoutConfig } from '../../config/default-checkout-config';
import { CheckoutProgressComponent } from './checkout-progress.component';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

const mockRouterState = {
  state: {
    context: {
      id: `/${MockRoutesConfig[MockCheckoutConfig.checkout.steps[0].routeName].paths[0]}`,
    },
  },
};
class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(mockRouterState);
  }
}

class MockRoutingConfigService {
  getRouteConfig(routeName: string) {
    return MockRoutesConfig[routeName];
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutProgressComponent', () => {
  let component: CheckoutProgressComponent;
  let fixture: ComponentFixture<CheckoutProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [CheckoutProgressComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
    component.steps = defaultCheckoutConfig.checkout.steps;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain steps with labels', () => {
    const steps = fixture.debugElement.query(By.css('.cx-nav')).nativeElement;

    MockCheckoutConfig.checkout.steps.forEach((step, index) => {
      expect(steps.innerText).toContain(step.name && index + 1);
    });
  });

  it('should contain link with "active" class', () => {
    const step = fixture.debugElement.query(
      By.css('.cx-item:nth-child(1) .cx-link')
    ).nativeElement;

    expect(step.getAttribute('class')).toContain('active');
  });

  it('should contain links with "disabled" class', () => {
    const steps = fixture.debugElement.queryAll(
      By.css('.cx-item .cx-link.disabled')
    );

    expect(steps.length).toBe(3);
  });

  describe('isActive()', () => {
    it('should return first step as active', () => {
      expect(component.isActive(0)).toBe(true);
    });

    it('should return second step as NOT active', () => {
      expect(component.isActive(1)).toBe(false);
    });
  });

  describe('isDisabled()', () => {
    it('should return first step as NOT disabled', () => {
      expect(component.isDisabled(0)).toBe(false);
    });

    it('should return second step as disabled', () => {
      expect(component.isDisabled(1)).toBe(true);
    });
  });

  describe('getTabIndex()', () => {
    beforeEach(() => {
      component.activeStepIndex = 1;
    });

    it('should return first step as focusable via tabindex', () => {
      expect(component.isActive(0)).toBe(false);
      expect(component.isDisabled(0)).toBe(false);
      expect(component.getTabIndex(0)).toBe(0);
    });

    it('should return second step as NOT focusable via tabindex', () => {
      expect(component.isActive(1)).toBe(true);
      expect(component.isDisabled(1)).toBe(false);
      expect(component.getTabIndex(1)).toBe(-1);
    });

    it('should return third step as NOT focusable via tabindex', () => {
      expect(component.isActive(2)).toBe(false);
      expect(component.isDisabled(2)).toBe(true);
      expect(component.getTabIndex(2)).toBe(-1);
    });
  });
});
