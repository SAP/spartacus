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
import { defaultStorefrontRoutesConfig } from '../../../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

const mockRouterState = {
  state: {
    context: {
      id: `/${
        MockRoutesConfig[MockCheckoutConfig.checkout.steps[0].routeName]
          .paths[0]
      }`,
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

describe('CheckoutProgressMobileBottomComponent', () => {
  let component: CheckoutProgressMobileBottomComponent;
  let fixture: ComponentFixture<CheckoutProgressMobileBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [
        CheckoutProgressMobileBottomComponent,
        MockTranslateUrlPipe,
      ],
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProgressMobileBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render next steps in checkout', () => {
    fixture.detectChanges();
    const steps = fixture.debugElement.query(By.css('.cx-media')).nativeElement;

    MockCheckoutConfig.checkout.steps.forEach((step, index) => {
      if (index > 0) {
        expect(steps.innerText).toContain(step.name && index + 1);
      }
    });
  });
});
