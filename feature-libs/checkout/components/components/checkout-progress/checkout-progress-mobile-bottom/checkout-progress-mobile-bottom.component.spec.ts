import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/root';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../../services/checkout-step.service';
import { CheckoutProgressMobileBottomComponent } from './checkout-progress-mobile-bottom.component';

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_TYPE],
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
  activeStepIndex$: Observable<number> = of(0);
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          CheckoutProgressMobileBottomComponent,
          MockTranslateUrlPipe,
        ],
        providers: [
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        ],
      }).compileComponents();
    })
  );

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

    mockCheckoutSteps.forEach((step, index) => {
      if (index > 0) {
        expect(steps.innerText).toContain(step.name && index + 1);
      }
    });
  });
});
