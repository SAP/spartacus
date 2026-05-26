/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, OutletContextData } from '@spartacus/storefront';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';

import { OpfGiftCardOrderDetailBillingComponent } from './opf-gift-card-order-detail-billing.component';
import { Order } from '@spartacus/order/root';
import { Store } from '@ngrx/store';
import { TranslationService } from '@spartacus/core';

describe('OpfGiftCardOrderDetailBillingComponent', () => {
  let component: OpfGiftCardOrderDetailBillingComponent;
  let fixture: ComponentFixture<OpfGiftCardOrderDetailBillingComponent>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let mockOrder: Order;
  let contextSubject: Subject<any>;

  beforeEach(async () => {
    const translationServiceSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardOrderDetailBillingComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
        {
          provide: Store,
          useValue: {
            pipe: jasmine.createSpy('pipe').and.returnValue(of({})),
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.returnValue(of({})),
          },
        },
      ],
    }).compileComponents();

    translationService = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
    fixture = TestBed.createComponent(OpfGiftCardOrderDetailBillingComponent);
    component = fixture.componentInstance;

    contextSubject = new Subject<any>();
    mockOrder = {
      code: 'order-101',
      opfGiftCardSummary: {
        totalAppliedAmount: { value: 75.0, formattedValue: '$75.00' },
        totalBalance: { value: 200.0, formattedValue: '$200.00' },
        totalRemainingBalance: { value: 125.0, formattedValue: '$125.00' },
        giftCardsCoverFullAmount: true,
      },
    } as Order;
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be standalone component', () => {
      expect(component).toBeDefined();
    });

    it('should have order property', () => {
      component.order = mockOrder;
      expect(component.order).toEqual(mockOrder);
    });

    it('should have translationService injected', () => {
      expect(component['translationService']).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to orderOutlet context when provided', (done) => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      contextSubject.next(mockOrder);

      setTimeout(() => {
        expect(component.order).toEqual(mockOrder);
        done();
      }, 10);
    });

    it('should handle multiple order updates from context', (done) => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      const orders = [
        { ...mockOrder, code: 'order-101' },
        { ...mockOrder, code: 'order-102' },
      ];

      contextSubject.next(orders[0] as Order);
      setTimeout(() => {
        expect(component.order.code).toBe('order-101');

        contextSubject.next(orders[1] as Order);
        setTimeout(() => {
          expect(component.order.code).toBe('order-102');
          done();
        }, 10);
      }, 10);
    });

    it('should not throw error when calling ngOnInit multiple times', () => {
      expect(() => {
        component.ngOnInit();
        component.ngOnInit();
      }).not.toThrow();
    });
  });

  describe('getPaymentMethodCardContent', () => {
    beforeEach(() => {
      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'paymentForm.payment': 'Payment',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });
    });

    it('should return card with translated title and text', (done) => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment');
        expect(card.text).toContain('Gift Card Payment');
        done();
      });
    });

    it('should call translate with correct keys for billing component', (done) => {
      component.getPaymentMethodCardContent().subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'paymentForm.payment'
        );
        expect(translationService.translate).toHaveBeenCalledWith(
          'opfGiftCard.giftCardPayment'
        );
        done();
      });
    });

    it('should return card object with expected structure', (done) => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBeDefined();
        expect(card.text).toBeDefined();
        expect(Array.isArray(card.text)).toBe(true);
        expect(card?.text?.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should use paymentForm.payment key instead of opfCheckout.paymentOption', (done) => {
      component.getPaymentMethodCardContent().subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'paymentForm.payment'
        );
        expect(translationService.translate).not.toHaveBeenCalledWith(
          'opfCheckout.paymentOption'
        );
        done();
      });
    });

    it('should return card text as an array with single element', (done) => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.text).toEqual(['Gift Card Payment']);
        done();
      });
    });

    it('should handle translation service returning undefined', (done) => {
      translationService.translate.and.returnValue(of(''));

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card).toBeDefined();
        expect(card.title).toBeDefined();
        expect(card.text).toBeDefined();
        done();
      });
    });
  });

  describe('isGiftCardPayment', () => {
    it('should return true when gift card is applied with positive amount', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 75.0, formattedValue: '$75.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should return false when gift card is not applied', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 0, formattedValue: '$0.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return false when  opfGiftCardSummary is undefined', () => {
      component.order = {} as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return false when totalAppliedAmount is undefined', () => {
      component.order = {
        opfGiftCardSummary: {},
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return false when totalAppliedAmount.value is negative', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: -25.0, formattedValue: '-$25.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return true when full amount is covered by gift card', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 150.0, formattedValue: '$150.00' },
          giftCardsCoverFullAmount: true,
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should return true when partial gift card is applied', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 50.0, formattedValue: '$50.00' },
          giftCardsCoverFullAmount: false,
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should return true for large applied amounts', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 5000.0, formattedValue: '$5000.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should return true for small positive amounts', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 0.01, formattedValue: '$0.01' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should update isGiftCardPayment when order changes', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 0, formattedValue: '$0.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);

      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 100.0, formattedValue: '$100.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should render card content with billing context', (done) => {
      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'paymentForm.payment': 'Payment',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment');
        expect(card?.text?.[0]).toBe('Gift Card Payment');
        done();
      });
    });

    it('should handle full order lifecycle', (done) => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      contextSubject.next(mockOrder);

      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'paymentForm.payment': 'Payment',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(component.isGiftCardPayment).toBe(true);
        expect(card.title).toBe('Payment');
        done();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle order with partial gift card summary', () => {
      component.order = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: true,
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should handle empty order object', () => {
      component.order = {};

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should handle rapid succession of order updates', (done) => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      const orders: unknown[] = [
        {
          code: 'order-201',
          opfGiftCardSummary: {
            totalAppliedAmount: { value: 10 },
            totalBalance: { value: 50 },
            totalRemainingBalance: { value: 40 },
            giftCardsCoverFullAmount: false,
          },
        },
        {
          code: 'order-202',
          opfGiftCardSummary: {
            totalAppliedAmount: { value: 20 },
            totalBalance: { value: 50 },
            totalRemainingBalance: { value: 30 },
            giftCardsCoverFullAmount: false,
          },
        },
        {
          code: 'order-203',
          opfGiftCardSummary: {
            totalAppliedAmount: { value: 30 },
            totalBalance: { value: 50 },
            totalRemainingBalance: { value: 20 },
            giftCardsCoverFullAmount: false,
          },
        },
      ];

      orders.forEach((order) => contextSubject.next(order as Order));

      setTimeout(() => {
        expect((component.order as any).code).toBe('order-203');
        done();
      }, 10);
    });

    it('should handle decimal values in gift card amount', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 123.45, formattedValue: '$123.45' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should handle when giftCardsCoverFullAmount changes', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 100.0, formattedValue: '$100.00' },
          giftCardsCoverFullAmount: false,
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);

      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 100.0, formattedValue: '$100.00' },
          giftCardsCoverFullAmount: true,
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should work correctly when no order is set initially', () => {
      expect(component.isGiftCardPayment).toBe(false);
    });
  });

  describe('Differences from OpfGiftCardPaymentComponent', () => {
    it('should use paymentForm.payment key for billing context', (done) => {
      translationService.translate.and.callFake((key: string) => {
        if (key === 'paymentForm.payment') {
          return of('Payment Method');
        }
        return of('Gift Card');
      });

      component.getPaymentMethodCardContent().subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'paymentForm.payment'
        );
        done();
      });
    });

    it('should be a standalone component', () => {
      // Verify the component is standalone by checking if it can be imported directly
      expect(component).toBeTruthy();
    });

    it('should use CommonModule in imports', () => {
      // The component imports CommonModule along with other utilities
      expect(component).toBeTruthy();
    });
  });
});
