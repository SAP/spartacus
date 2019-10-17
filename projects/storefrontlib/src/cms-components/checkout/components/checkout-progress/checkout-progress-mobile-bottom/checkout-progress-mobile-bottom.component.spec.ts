import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutStep, CheckoutStepType } from '../../../model';
import { CheckoutConfigService } from '../../../services/checkout-config.service';
import { BehaviorSubject } from 'rxjs';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_TYPES],
    enabled: true,
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.SHIPPING_ADDRESS],
    enabled: true,
  },
  {
    id: 'step2',
    name: 'step 2',
    routeName: 'route2',
    type: [CheckoutStepType.DELIVERY_MODE],
    enabled: true,
  },
];

class MockCheckoutConfigService {
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

// current url point to the first step
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

describe('CheckoutProgressMobileBottomComponent', () => {
  let component: CheckoutProgressMobileBottomComponent;
  let fixture: ComponentFixture<CheckoutProgressMobileBottomComponent>;

  let checkoutConfigService: CheckoutConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        CheckoutProgressMobileBottomComponent,
        MockTranslateUrlPipe,
      ],
      providers: [
        { provide: CheckoutConfigService, useClass: MockCheckoutConfigService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    checkoutConfigService = TestBed.get(CheckoutConfigService as Type<
      CheckoutConfigService
    >);
    fixture = TestBed.createComponent(CheckoutProgressMobileBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render next steps in checkout', () => {
    const steps = fixture.debugElement.query(By.css('.cx-media')).nativeElement;

    component.steps.forEach((step, index) => {
      if (index > 0) {
        expect(steps.innerText).toContain(step.name && index + 1);
      }
    });
  });

  it('should contains steps which are enabled', () => {
    checkoutConfigService.steps$.next([
      {
        id: 'step1',
        name: 'step 1',
        routeName: 'route1',
        type: [CheckoutStepType.SHIPPING_ADDRESS],
        enabled: true,
      },
    ]);

    expect(component.steps.length).toEqual(1);
    const steps = fixture.debugElement.query(By.css('.cx-media')).nativeElement;
    expect(steps.innerText).toBe('');
  });
});
