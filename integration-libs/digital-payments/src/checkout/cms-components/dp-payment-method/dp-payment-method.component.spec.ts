import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  PaymentDetails,
  QueryState,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { DpPaymentMethodComponent } from './dp-payment-method.component';

const mockPaymentDetails: PaymentDetails = {
  id: 'mock payment id',
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: {
    code: 'Visa',
    name: 'Visa',
  },
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123',
};
class MockTranslationService implements Partial<TranslationService> {
  translate(): Observable<string> {
    return of('');
  }
}
class MockUserPaymentService implements Partial<UserPaymentService> {
  loadPaymentMethods(): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of();
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
}
class MockCheckoutStepService implements Partial<CheckoutStepService> {
  next() {}
  getBackBntText(): string {
    return '';
  }
}

class MockCheckoutPaymentFacade implements Partial<CheckoutPaymentFacade> {
  setPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return of();
  }
  createPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return of();
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
  paymentProcessSuccess() {}

  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return of();
  }
}

class MockCheckoutDeliveryFacade
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return of({ loading: false, error: false, data: undefined });
  }
}

const mockActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    }),
  },
};

describe('DpPaymentMethodComponent', () => {
  let component: DpPaymentMethodComponent;
  let fixture: ComponentFixture<DpPaymentMethodComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DpPaymentMethodComponent],
      imports: [StoreModule.forRoot({}), RouterModule.forRoot([])],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: DpPaymentMethodComponent,
          useClass: DpPaymentMethodComponent,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentFacade,
        },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryFacade,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DpPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call isDpCallback', () => {
    var result = component.isDpCallback();
    expect(result).toEqual(true);
  });
  it('should call paymentDetailsAdded', () => {
    spyOn(component, 'selectPaymentMethod').and.callThrough();
    spyOn(component, 'next').and.callThrough();
    component.paymentDetailsAdded(mockPaymentDetails);
    expect(component.selectPaymentMethod).toHaveBeenCalledWith(
      mockPaymentDetails
    );
    expect(component.next).toHaveBeenCalled();
  });
  it('should call hideCallbackScreen', () => {
    component.hideCallbackScreen();
    expect(component.showCallbackScreen).toBe(false);
  });
});
