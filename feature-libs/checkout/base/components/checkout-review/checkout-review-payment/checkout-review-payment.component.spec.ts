import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CheckoutPaymentFacade,
  CheckoutStep,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import { I18nTestingModule, PaymentDetails } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
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
})
class MockCardComponent {
  @Input()
  content: Card;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutReviewPaymentComponent', () => {
  let component: CheckoutReviewPaymentComponent;
  let fixture: ComponentFixture<CheckoutReviewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, IconTestingModule],
      declarations: [
        CheckoutReviewPaymentComponent,
        MockUrlPipe,
        MockCardComponent,
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
    }).compileComponents();

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
