import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { StoreModule } from '@ngrx/store';
import { CheckoutConfig } from '../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { of, Observable } from 'rxjs';
import { CartService } from '../../../../../../../core/src/cart/facade/cart.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutProgressMobileTopComponent } from './checkout-progress-mobile-top.component';

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;

const mockRouterState = {
  state: {
    context: {
      id: defaultCheckoutConfig.checkout.steps[0].url,
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

class MockCartService {
  getActive(): Observable<any> {
    return of(mockActiveCart);
  }
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
