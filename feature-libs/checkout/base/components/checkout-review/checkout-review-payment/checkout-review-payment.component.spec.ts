import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  PaymentDetails,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/src/features-config/feature-toggles/testing';
import {
  Card,
  CardComponent,
  FocusConfig,
  FocusDirective,
} from '@spartacus/storefront';
import { IconTestingModule } from 'core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module';
import { of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { CheckoutReviewPaymentComponent } from './checkout-review-payment.component';
import createSpy = jasmine.createSpy;

const mockPaymentDetails: PaymentDetails = {
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: { code: 'Visa', name: 'Visa' },
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123',
  billingAddress: {
    firstName: 'John',
    lastName: 'Smith',
    line1: '2343 test address',
    town: 'Montreal',
    region: {
      isocode: 'QC',
    },
    country: {
      isocode: 'CAN',
    },
    postalCode: 'H2N 1E3',
  },
};

const mockCheckoutStep: CheckoutStep = {
  id: 'step',
  name: 'name',
  routeName: '/route',
  type: [CheckoutStepType.PAYMENT_DETAILS],
};

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  getPaymentDetailsState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: mockPaymentDetails })
  );
}

class MockCheckoutStepService {
  steps$ = of([
    {
      id: 'step1',
      name: 'step1',
      routeName: 'route1',
      type: [CheckoutStepType.PAYMENT_DETAILS],
    },
  ]);
  getCheckoutStepRoute = createSpy().and.returnValue(
    mockCheckoutStep.routeName
  );
}

@Component({
  selector: 'cx-card',
  template: '',
  imports: [I18nTestingModule, IconTestingModule],
})
class MockCardComponent {
  @Input()
  content: Card;
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Directive({ selector: '[cxFocus]' })
class MockFocusDirective {
  @Input() cxFocus: FocusConfig | undefined;
}

describe('CheckoutReviewPaymentComponent', () => {
  let component: CheckoutReviewPaymentComponent;
  let fixture: ComponentFixture<CheckoutReviewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        IconTestingModule,
        CheckoutReviewPaymentComponent,
      ],
      providers: [
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
      ],
    })
      .overrideComponent(CheckoutReviewPaymentComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, CardComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockCardComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutReviewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get paymentDetails', () => {
    let paymentDetails: PaymentDetails | undefined;
    component.paymentDetails$.subscribe((data) => {
      paymentDetails = data;
    });

    expect(paymentDetails).toEqual(mockPaymentDetails);
  });

  it('should call getPaymentMethodCard(paymentDetails) to get payment card data', () => {
    component.getPaymentMethodCard(mockPaymentDetails).subscribe((card) => {
      expect(card.title).toEqual('paymentForm.payment');
      expect(card.text).toEqual([
        mockPaymentDetails.cardType?.name,
        mockPaymentDetails.accountHolderName,
        mockPaymentDetails.cardNumber,
        `paymentCard.expires month:${mockPaymentDetails.expiryMonth} year:${mockPaymentDetails.expiryYear}`,
      ]);
    });
  });

  it('should call getBillingAddressCard to get billing address card data', () => {
    component.getBillingAddressCard(mockPaymentDetails).subscribe((card) => {
      expect(card.title).toEqual('paymentForm.billingAddress');
      expect(card.text).toEqual([
        'addressCard.billTo',
        mockPaymentDetails.billingAddress?.firstName +
          ' ' +
          mockPaymentDetails.billingAddress?.lastName,
        mockPaymentDetails.billingAddress?.line1,
        mockPaymentDetails.billingAddress?.town +
          ', ' +
          mockPaymentDetails.billingAddress?.region?.isocode +
          ', ' +
          mockPaymentDetails.billingAddress?.country?.isocode,
        mockPaymentDetails.billingAddress?.postalCode,
      ]);
    });
  });

  it('should get checkout step route', () => {
    expect(component.paymentDetailsStepRoute).toEqual(
      mockCheckoutStep.routeName
    );
  });
});

describe('CheckoutReviewPaymentComponent - a11yImproveCheckoutFocus', () => {
  let fixture: ComponentFixture<CheckoutReviewPaymentComponent>;

  function configure(featureToggle: boolean) {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        IconTestingModule,
        CheckoutReviewPaymentComponent,
      ],
      providers: [
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        provideMockFeatureToggles({
          a11yImproveCheckoutFocus: featureToggle,
        }),
      ],
    })
      .overrideComponent(CheckoutReviewPaymentComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            CardComponent,
            FocusDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockCardComponent,
            MockFocusDirective,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutReviewPaymentComponent);
    fixture.detectChanges();
  }

  it('should render the review summary with autofocus when the feature is enabled', () => {
    configure(true);

    const summary = fixture.debugElement.query(By.css('.cx-review-summary'));
    expect(summary).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.cx-review-summary-edit-step'))
    ).toBeTruthy();

    const directive = summary.injector.get(MockFocusDirective);
    expect(directive.cxFocus).toEqual(
      jasmine.objectContaining({ autofocus: true })
    );
  });

  it('should render the review summary without autofocus when the feature is disabled', () => {
    configure(false);

    const summary = fixture.debugElement.query(By.css('.cx-review-summary'));
    expect(summary).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.cx-review-summary-edit-step'))
    ).toBeTruthy();

    expect(() => summary.injector.get(MockFocusDirective)).toThrow();
  });
});
