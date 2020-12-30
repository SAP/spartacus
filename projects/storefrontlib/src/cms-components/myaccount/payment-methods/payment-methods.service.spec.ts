import { waitForAsync, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { Card, PaymentMethodsService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon';

const mockPayment: PaymentDetails = {
  defaultPayment: true,
  accountHolderName: 'John Doe',
  cardNumber: '4111 1111 1111 1111',
  expiryMonth: '11',
  expiryYear: '2020',
  id: '2',
  cardType: {
    code: 'master',
  },
};
class MockTranslationService implements Partial<TranslationService> {
  translate(key) {
    return of(key);
  }
}
class MockUserPaymentService {
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of([mockPayment]);
  }
  loadPaymentMethods(): void {}
  deletePaymentMethod(_paymentMethodId: string): void {}
  setPaymentMethodAsDefault(_paymentMethodId: string): void {}
}

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;
  let userPaymentService: UserPaymentService;
  let translateService: TranslationService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [],
        providers: [
          PaymentMethodsService,
          { provide: UserPaymentService, useClass: MockUserPaymentService },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    service = TestBed.inject(PaymentMethodsService);
    userPaymentService = TestBed.inject(UserPaymentService);
    translateService = TestBed.inject(TranslationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should get all payment methods', () => {
    spyOn(userPaymentService, 'getPaymentMethods').and.returnValue(
      of([mockPayment, mockPayment])
    );

    service.get();
    expect(userPaymentService.getPaymentMethods).toHaveBeenCalled();
  });

  it('should get all payment methods and set default one', (done) => {
    const noDefaultPayment = { ...mockPayment, defaultPayment: false };
    spyOn(userPaymentService, 'getPaymentMethodsLoading').and.returnValue(
      of(false)
    );
    spyOn(service, 'setDefault').and.callThrough();
    spyOn(userPaymentService, 'getPaymentMethods').and.returnValue(
      of([noDefaultPayment, noDefaultPayment])
    );

    service.get();
    expect(userPaymentService.getPaymentMethods).toHaveBeenCalled();

    service.get().subscribe(() => {
      expect(service.setDefault).toHaveBeenCalledWith(noDefaultPayment);
      done();
    });
  });

  it('should delete', () => {
    spyOn(userPaymentService, 'deletePaymentMethod').and.callThrough();

    service.delete(mockPayment);

    expect(userPaymentService.deletePaymentMethod).toHaveBeenCalledWith(
      mockPayment.id
    );
    expect(service.editCard).toBeNull();
  });

  it('should set editable item', () => {
    service.setEdit(mockPayment);

    expect(service.editCard).toBe(mockPayment.id);
  });

  it('should get card content', () => {
    spyOn(translateService, 'translate').and.returnValue(of(''));
    service.getCardContent(mockPayment).subscribe((content: Card) => {
      expect(content).toEqual({
        header: '',
        textBold: 'John Doe',
        text: ['4111 1111 1111 1111', ''],
        actions: [{ name: '', event: 'edit' }],
        deleteMsg: '',
        img: 'MASTER_CARD',
      });
    });
  });

  it('should return the proper card icon based on its card type', () => {
    const otherCardType = 'MockCardType';

    expect(service.getCardIcon('visa')).toBe(ICON_TYPE.VISA);
    expect(service.getCardIcon('master')).toBe(ICON_TYPE.MASTER_CARD);
    expect(service.getCardIcon('mastercard_eurocard')).toBe(
      ICON_TYPE.MASTER_CARD
    );
    expect(service.getCardIcon('diners')).toBe(ICON_TYPE.DINERS_CLUB);
    expect(service.getCardIcon('amex')).toBe(ICON_TYPE.AMEX);
    expect(service.getCardIcon(otherCardType)).toBe(ICON_TYPE.CREDIT_CARD);
  });
});
