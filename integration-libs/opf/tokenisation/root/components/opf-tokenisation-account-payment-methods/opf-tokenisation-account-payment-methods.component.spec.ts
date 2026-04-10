/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  MockTranslatePipe,
  PaymentDetails,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfTokenisationFacade } from '../../facade';
import { OpfTokenisationAccountPaymentMethodsComponent } from './opf-tokenisation-account-payment-methods.component';

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

describe('OpfTokenisationAccountPaymentMethodsComponent', () => {
  let component: OpfTokenisationAccountPaymentMethodsComponent;
  let fixture: ComponentFixture<OpfTokenisationAccountPaymentMethodsComponent>;
  let tokenisationFacade: jasmine.SpyObj<OpfTokenisationFacade>;
  let translationService: jasmine.SpyObj<TranslationService>;

  const mockPaymentMethod1: PaymentDetails = {
    id: 'card-1',
    cardNumber: '1234567812345678',
    expiryMonth: '12',
    expiryYear: '25',
    cardType: { code: '8764', name: 'VISA' },
  };

  const mockPaymentMethod2: PaymentDetails = {
    id: 'card-2',
    cardNumber: '8765432187654321',
    expiryMonth: '06',
    expiryYear: '26',
    cardType: { code: '8764', name: 'MASTERCARD' },
  };

  beforeEach(waitForAsync(() => {
    const facadeSpy = jasmine.createSpyObj('OpfTokenisationFacade', [
      'getPaymentMethods',
      'getPaymentMethodsLoading',
      'loadPaymentMethods',
      'deletePaymentMethod',
    ]);

    const translationSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);

    const globalMessageSpy = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);

    TestBed.configureTestingModule({
      imports: [
        OpfTokenisationAccountPaymentMethodsComponent,
        I18nTestingModule,
      ],
      providers: [
        { provide: OpfTokenisationFacade, useValue: facadeSpy },
        { provide: TranslationService, useValue: translationSpy },
        { provide: GlobalMessageService, useValue: globalMessageSpy },
      ],
    })
      .overrideComponent(OpfTokenisationAccountPaymentMethodsComponent, {
        remove: {
          imports: [CardComponent, SpinnerComponent, TranslatePipe],
        },
        add: {
          imports: [MockCardComponent, MockSpinnerComponent, MockTranslatePipe],
        },
      })
      .compileComponents();

    tokenisationFacade = TestBed.inject(
      OpfTokenisationFacade
    ) as jasmine.SpyObj<OpfTokenisationFacade>;
    translationService = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
  }));

  beforeEach(() => {
    tokenisationFacade.getPaymentMethods.and.returnValue(of([]));
    tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));
    translationService.translate.and.returnValue(of('translated'));

    fixture = TestBed.createComponent(
      OpfTokenisationAccountPaymentMethodsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call loadPaymentMethods on facade', () => {
      expect(tokenisationFacade.loadPaymentMethods).toHaveBeenCalled();
    });

    it('should set paymentMethods$ from facade', () => {
      expect(tokenisationFacade.getPaymentMethods).toHaveBeenCalled();
      expect(component.paymentMethods$).toBeDefined();
    });

    it('should set loading$ from facade', () => {
      expect(tokenisationFacade.getPaymentMethodsLoading).toHaveBeenCalled();
      expect(component.loading$).toBeDefined();
    });

    it('should set editCard to undefined on init', () => {
      expect(component.editCard).toBeUndefined();
    });
  });

  describe('paymentMethods$', () => {
    it('should emit payment methods from facade', (done) => {
      tokenisationFacade.getPaymentMethods.and.returnValue(
        of([mockPaymentMethod1, mockPaymentMethod2])
      );

      component.ngOnInit();

      component.paymentMethods$.subscribe((result) => {
        expect(result).toEqual([mockPaymentMethod1, mockPaymentMethod2]);
        done();
      });
    });

    it('should emit empty array when no payment methods', (done) => {
      tokenisationFacade.getPaymentMethods.and.returnValue(of([]));

      component.ngOnInit();

      component.paymentMethods$.subscribe((result) => {
        expect(result).toEqual([]);
        done();
      });
    });
  });

  describe('loading$', () => {
    it('should emit true when loading', (done) => {
      tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(true));

      component.ngOnInit();

      component.loading$.subscribe((isLoading) => {
        expect(isLoading).toBe(true);
        done();
      });
    });

    it('should emit false when not loading', (done) => {
      tokenisationFacade.getPaymentMethodsLoading.and.returnValue(of(false));

      component.ngOnInit();

      component.loading$.subscribe((isLoading) => {
        expect(isLoading).toBe(false);
        done();
      });
    });
  });

  describe('getCardContent', () => {
    it('should call translate for common.delete', (done) => {
      component.getCardContent(mockPaymentMethod1).subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'common.delete'
        );
        done();
      });
    });

    it('should call translate for paymentCard.deleteConfirmation', (done) => {
      component.getCardContent(mockPaymentMethod1).subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'paymentCard.deleteConfirmation'
        );
        done();
      });
    });

    it('should call translate for paymentCard.expires with month and year', (done) => {
      component.getCardContent(mockPaymentMethod1).subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'paymentCard.expires',
          {
            month: mockPaymentMethod1.expiryMonth,
            year: mockPaymentMethod1.expiryYear,
          }
        );
        done();
      });
    });

    it('should include cardNumber in card text', (done) => {
      component.getCardContent(mockPaymentMethod1).subscribe((card) => {
        expect(card.text?.[0]).toBe(mockPaymentMethod1.cardNumber);
        done();
      });
    });

    it('should set role to application', (done) => {
      component.getCardContent(mockPaymentMethod1).subscribe((card) => {
        expect(card.role).toBe('application');
        done();
      });
    });

    it('should set deleteMsg on card', (done) => {
      component.getCardContent(mockPaymentMethod1).subscribe((card) => {
        expect(card.deleteMsg).toBeDefined();
        done();
      });
    });
  });

  describe('deletePaymentMethod', () => {
    it('should call facade.deletePaymentMethod with payment method id', () => {
      component.deletePaymentMethod(mockPaymentMethod1);

      expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
        'card-1'
      );
    });

    it('should set editCard to undefined after deletion', () => {
      component.editCard = 'card-1';

      component.deletePaymentMethod(mockPaymentMethod1);

      expect(component.editCard).toBeUndefined();
    });

    it('should not call facade.deletePaymentMethod if id is undefined', () => {
      const paymentMethod: PaymentDetails = {
        ...mockPaymentMethod1,
        id: undefined,
      };

      component.deletePaymentMethod(paymentMethod);

      expect(tokenisationFacade.deletePaymentMethod).not.toHaveBeenCalled();
    });
  });

  describe('setEdit', () => {
    it('should set editCard to payment method id', () => {
      component.setEdit(mockPaymentMethod1);

      expect(component.editCard).toBe('card-1');
    });

    it('should update editCard when called with different payment method', () => {
      component.setEdit(mockPaymentMethod1);
      expect(component.editCard).toBe('card-1');

      component.setEdit(mockPaymentMethod2);
      expect(component.editCard).toBe('card-2');
    });
  });

  describe('cancelCard', () => {
    it('should set editCard to undefined', () => {
      component.editCard = 'card-1';
      component.cancelCard();
      expect(component.editCard).toBeUndefined();
    });

    it('should set editCard to undefined even if already undefined', () => {
      component.editCard = undefined;
      component.cancelCard();
      expect(component.editCard).toBeUndefined();
    });
  });
});
