import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressService,
  CheckoutPaymentService,
} from '@spartacus/checkout/base/core';
import {
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { CheckoutPaymentFacade } from 'feature-libs/checkout/root';
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

class MockCheckoutDeliveryAddressService {
  getDeliveryAddress(): Observable<PaymentDetails> {
    return of({});
  }
}
class MockCheckoutPaymentService implements Partial<CheckoutPaymentService> {
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
  setPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return of();
  }
}
class MockCheckoutPaymentFacade implements Partial<CheckoutPaymentFacade> {}
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
          provide: CheckoutDeliveryAddressService,
          useClass: MockCheckoutDeliveryAddressService,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentFacade,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
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
