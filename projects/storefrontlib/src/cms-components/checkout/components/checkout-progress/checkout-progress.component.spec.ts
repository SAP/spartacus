import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { CheckoutStep, CheckoutStepType } from '../../model';
import { BehaviorSubject } from 'rxjs';

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_TYPES],
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.SHIPPING_ADDRESS],
  },
  {
    id: 'step2',
    name: 'step 2',
    routeName: 'route2',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
];

class MockCheckoutStepService {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
}

class MockRoutingConfigService {
  getRouteConfig(stepRoute) {
    if (stepRoute === 'route0') {
      return { paths: ['checkout/route0'] };
    } else if (stepRoute === 'route1') {
      return { paths: ['checkout/route1'] };
    } else if (stepRoute === 'route2') {
      return { paths: ['checkout/route2'] };
    }
    return null;
  }
}

const mockRouterState = {
  state: {
    context: {
      id: '/checkout/route0',
    },
  },
};

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(mockRouterState);
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
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [CheckoutProgressComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain steps with labels', () => {
    const steps = fixture.debugElement.query(By.css('.cx-nav')).nativeElement;

    mockCheckoutSteps.forEach((step, index) => {
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

    expect(steps.length).toBe(2);
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
