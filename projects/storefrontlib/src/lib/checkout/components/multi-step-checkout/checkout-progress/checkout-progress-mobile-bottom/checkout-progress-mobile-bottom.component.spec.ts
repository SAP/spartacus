import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { StoreModule } from '@ngrx/store';
import { CheckoutConfig } from '../../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../../config/default-checkout-config';
import { of, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

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

class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(mockRouterState);
  }
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
    const steps = fixture.debugElement.query(By.css('.cx-media')).nativeElement;

    MockCheckoutConfig.checkout.steps.forEach((step, index) => {
      if (index > 0) {
        expect(steps.innerText).toContain(step.name && index + 1);
      }
    });
  });
});
