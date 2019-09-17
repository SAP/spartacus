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
import { CartService } from '../../../../../../../core/src/cart/facade/cart.service';
import { defaultStorefrontRoutesConfig } from '../../../../../cms-structure/routing/default-routing-config';
import { CheckoutConfig } from '../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { CheckoutProgressMobileTopComponent } from './checkout-progress-mobile-top.component';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
const MockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;

const mockRouterState = {
  state: {
    context: {
      id: `/${MockRoutesConfig[MockCheckoutConfig.checkout.steps[0].routeName].paths[0]}`,
    },
  },
};

const mockActiveCart = {
  totalItems: 5,
  subTotal: {
    formattedValue: '148,98$',
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

class MockCartService {
  getActive(): Observable<any> {
    return of(mockActiveCart);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutProgressMobileTopComponent', () => {
  let component: CheckoutProgressMobileTopComponent;
  let fixture: ComponentFixture<CheckoutProgressMobileTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [CheckoutProgressMobileTopComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingConfigService, useClass: MockRoutingConfigService },
        { provide: CartService, useClass: MockCartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProgressMobileTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cart details and available steps', () => {
    const steps = fixture.debugElement.query(By.css('.cx-media')).nativeElement;

    expect(steps.innerText).toContain(
      `1. ${MockCheckoutConfig.checkout.steps[0].name}`
    );

    expect(steps.innerText).toContain(
      mockActiveCart.subTotal.formattedValue && mockActiveCart.totalItems
    );
  });
});
