/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
import { OpfTokenisationDeletePaymentDialogComponent } from './opf-tokenisation-delete-payment-dialog/opf-tokenisation-delete-payment-dialog.component';

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

@Component({
  selector: 'cx-opf-tokenisation-delete-payment-dialog',
  template: '',
})
class MockDeletePaymentDialogComponent {
  @Input() showDialog = false;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();
}

describe('OpfTokenisationAccountPaymentMethodsComponent', () => {
  let component: OpfTokenisationAccountPaymentMethodsComponent;
  let fixture: ComponentFixture<OpfTokenisationAccountPaymentMethodsComponent>;
  let tokenisationFacade: any;
  let translationService: any;

  const mockPaymentMethod1: PaymentDetails = {
    id: 'card-1',
    cardNumber: '1234567812345678',
    expiryMonth: '03',
    expiryYear: '30',
    cardType: { code: '8764', name: 'VISA' },
  };

  const mockPaymentMethod2: PaymentDetails = {
    id: 'card-2',
    cardNumber: '8765432187654321',
    expiryMonth: '03',
    expiryYear: '30',
    cardType: { code: '8764', name: 'MASTERCARD' },
  };

  beforeEach(async () => {
    const facadeSpy = {
      getPaymentMethods: vi.fn(),
      getPaymentMethodsLoading: vi.fn(),
      loadPaymentMethods: vi.fn(),
      deletePaymentMethod: vi.fn(),
      setPaymentMethodAsDefault: vi.fn(),
    };

    const translationSpy = { translate: vi.fn() };

    const globalMessageSpy = { add: vi.fn() };

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
          imports: [
            CardComponent,
            SpinnerComponent,
            TranslatePipe,
            OpfTokenisationDeletePaymentDialogComponent,
          ],
        },
        add: {
          imports: [
            MockCardComponent,
            MockSpinnerComponent,
            MockTranslatePipe,
            MockDeletePaymentDialogComponent,
          ],
        },
      })
      .compileComponents();

    tokenisationFacade = TestBed.inject(OpfTokenisationFacade) as any;
    translationService = TestBed.inject(TranslationService) as any;
  });

  beforeEach(() => {
    tokenisationFacade.getPaymentMethods.mockReturnValue(of([]));
    tokenisationFacade.getPaymentMethodsLoading.mockReturnValue(of(false));
    translationService.translate.mockReturnValue(of('translated'));

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
    it('should emit payment methods from facade', async () => {
      tokenisationFacade.getPaymentMethods.mockReturnValue(
        of([mockPaymentMethod1, mockPaymentMethod2])
      );

      component.ngOnInit();

      component.paymentMethods$.subscribe((result) => {
        expect(result).toEqual([mockPaymentMethod1, mockPaymentMethod2]);
      });
    });

    it('should emit empty array when no payment methods', async () => {
      tokenisationFacade.getPaymentMethods.mockReturnValue(of([]));

      component.ngOnInit();

      component.paymentMethods$.subscribe((result) => {
        expect(result).toEqual([]);
      });
    });

    it('should set first payment method as default when none is marked as default', async () => {
      tokenisationFacade.getPaymentMethods.mockReturnValue(
        of([mockPaymentMethod1, mockPaymentMethod2])
      );

      component.ngOnInit();

      component.paymentMethods$.subscribe(() => {
        expect(
          tokenisationFacade.setPaymentMethodAsDefault
        ).toHaveBeenCalledWith('card-1');
      });
    });

    it('should request auto-default only once across multiple emissions', async () => {
      tokenisationFacade.getPaymentMethods.mockReturnValue(
        of([mockPaymentMethod1, mockPaymentMethod2], [mockPaymentMethod1])
      );

      component.ngOnInit();

      component.paymentMethods$.subscribe({
        complete: () => {
          expect(
            tokenisationFacade.setPaymentMethodAsDefault
          ).toHaveBeenCalledTimes(1);
        },
      });
    });
  });

  describe('loading$', () => {
    it('should emit true when loading', async () => {
      tokenisationFacade.getPaymentMethodsLoading.mockReturnValue(of(true));

      component.ngOnInit();

      component.loading$.subscribe((isLoading) => {
        expect(isLoading).toBe(true);
      });
    });

    it('should emit false when not loading', async () => {
      tokenisationFacade.getPaymentMethodsLoading.mockReturnValue(of(false));

      component.ngOnInit();

      component.loading$.subscribe((isLoading) => {
        expect(isLoading).toBe(false);
      });
    });
  });

  describe('getCardContent', () => {
    it('should call translate for common.delete', async () => {
      component.getCardContent(mockPaymentMethod1).subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'common.delete'
        );
      });
    });

    it('should call translate for paymentCard.expires with month and year', async () => {
      component.getCardContent(mockPaymentMethod1).subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'paymentCard.expires',
          {
            month: mockPaymentMethod1.expiryMonth,
            year: mockPaymentMethod1.expiryYear,
          }
        );
      });
    });

    it('should include cardNumber in card text', async () => {
      component.getCardContent(mockPaymentMethod1).subscribe((card) => {
        expect(card.text?.[0]).toBe(mockPaymentMethod1.cardNumber);
      });
    });

    it('should include cardType name as textBold', async () => {
      component.getCardContent(mockPaymentMethod1).subscribe((card) => {
        expect(card.textBold).toBe(mockPaymentMethod1.cardType?.name);
      });
    });

    it('should set role to application', async () => {
      component.getCardContent(mockPaymentMethod1).subscribe((card) => {
        expect(card.role).toBe('application');
      });
    });
  });

  describe('deletePaymentMethod', () => {
    it('should call facade.deletePaymentMethod via confirmDeletePaymentMethod', () => {
      component.deletePaymentMethod(mockPaymentMethod1);
      component.confirmDeletePaymentMethod();

      expect(tokenisationFacade.deletePaymentMethod).toHaveBeenCalledWith(
        'card-1'
      );
    });

    it('should set showDeleteDialog to true and store paymentMethodToDelete', () => {
      component.deletePaymentMethod(mockPaymentMethod1);

      expect(component.showDeleteDialog).toBe(true);
      expect(component.paymentMethodToDelete).toBe(mockPaymentMethod1);
    });

    it('should set editCard to undefined after deletion', () => {
      component.editCard = 'card-1';

      component.deletePaymentMethod(mockPaymentMethod1);

      expect(component.editCard).toBeUndefined();
    });

    it('should not open dialog if id is undefined', () => {
      const paymentMethod: PaymentDetails = {
        ...mockPaymentMethod1,
        id: undefined,
      };

      component.deletePaymentMethod(paymentMethod);

      expect(component.showDeleteDialog).toBe(false);
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
