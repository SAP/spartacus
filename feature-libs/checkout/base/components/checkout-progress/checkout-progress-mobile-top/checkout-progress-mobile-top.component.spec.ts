import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { CheckoutProgressMobileTopComponent } from './checkout-progress-mobile-top.component';
import createSpy = jasmine.createSpy;

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_DETAILS],
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.DELIVERY_ADDRESS],
  },
  {
    id: 'step2',
    name: 'step 2',
    routeName: 'route2',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
];

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
  activeStepIndex$: Observable<number> = of(0);
}

const mockActiveCart: Partial<Cart> = {
  totalItems: 5,
  subTotal: {
    formattedValue: '148,98$',
  },
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = createSpy().and.returnValue(of(mockActiveCart));
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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          CheckoutProgressMobileTopComponent,
          MockTranslateUrlPipe,
        ],
        providers: [
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
          { provide: ActiveCartFacade, useClass: MockActiveCartService },
        ],
      }).compileComponents();
    })
  );

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

    expect(steps.innerText).toContain('step 0');

    expect(steps.innerText).toContain(
      mockActiveCart.subTotal?.formattedValue && mockActiveCart.totalItems
    );
  });
});
