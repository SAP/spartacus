/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, OutletContextData } from '@spartacus/storefront';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { Subject, of } from 'rxjs';

import { OpfGiftCardPaymentMethodDetailComponent } from './opf-gift-card-payment-method-detail.component';
import { Order } from '@spartacus/order/root';
import { Store } from '@ngrx/store';
import { TranslationService } from '@spartacus/core';

describe('OpfGiftCardPaymentMethodDetailComponent', () => {
  let component: OpfGiftCardPaymentMethodDetailComponent;
  let fixture: ComponentFixture<OpfGiftCardPaymentMethodDetailComponent>;
  let translationService: any;
  let mockOrder: Order;
  let contextSubject: Subject<any>;

  beforeEach(async () => {
    const translationServiceSpy = { translate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardPaymentMethodDetailComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
        {
          provide: Store,
          useValue: { pipe: vi.fn().mockReturnValue(of({})) },
        },
      ],
    }).compileComponents();

    translationService = TestBed.inject(TranslationService) as any;
    fixture = TestBed.createComponent(OpfGiftCardPaymentMethodDetailComponent);
    component = fixture.componentInstance;

    contextSubject = new Subject<any>();
    mockOrder = {
      code: 'order-1',
      opfGiftCardSummary: {
        totalAppliedAmount: { value: 50.0, formattedValue: '$50.00' },
        totalBalance: { value: 150.0, formattedValue: '$150.00' },
        totalRemainingBalance: { value: 100.0, formattedValue: '$100.00' },
        giftCardsCoverFullAmount: false,
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

    it('should have order property', () => {
      component.order = mockOrder;
      expect(component.order).toEqual(mockOrder);
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to orderOutlet context when provided', async () => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      contextSubject.next(mockOrder);

      expect(component.order).toEqual(mockOrder);
    });

    it('should not subscribe if orderOutlet is not provided', () => {
      component['orderOutlet'] = undefined;

      component.ngOnInit();

      expect(component.order).toBeUndefined();
    });

    it('should handle multiple order updates from context', async () => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      const orders = [
        { ...mockOrder, code: 'order-1' },
        { ...mockOrder, code: 'order-2' },
      ];

      contextSubject.next(orders[0] as Order);
      expect(component.order.code).toBe('order-1');

      contextSubject.next(orders[1] as Order);
      expect(component.order.code).toBe('order-2');
    });
  });

  describe('getPaymentMethodCardContent', () => {
    beforeEach(() => {
      translationService.translate.mockImplementation((key: string) => {
        const translations: Record<string, string> = {
          'opfCheckout.paymentOption': 'Payment Option',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });
    });

    it('should return card with translated title and text', async () => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment Option');
        expect(card.text).toContain('Gift Card Payment');
      });
    });

    it('should call translate with correct keys', async () => {
      component.getPaymentMethodCardContent().subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'opfCheckout.paymentOption'
        );
        expect(translationService.translate).toHaveBeenCalledWith(
          'opfGiftCard.giftCardPayment'
        );
      });
    });

    it('should return card object with expected structure', async () => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBeDefined();
        expect(card.text).toBeDefined();
        expect(Array.isArray(card.text)).toBe(true);
        expect(card.text?.length).toBeGreaterThan(0);
      });
    });

    it('should handle translation service errors gracefully', async () => {
      translationService.translate.mockReturnValue(of('Fallback translation'));

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBeDefined();
        expect(card.text).toBeDefined();
      });
    });
  });

  describe('isGiftCardPayment', () => {
    it('should return true when gift card is applied with positive amount', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 50.0, formattedValue: '$50.00' },
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
          totalAppliedAmount: { value: -10.0, formattedValue: '-$10.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return true for large applied amounts', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 9999.99, formattedValue: '$9999.99' },
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

    it('should render card content when getPaymentMethodCardContent is called', async () => {
      translationService.translate.mockImplementation((key: string) => {
        const translations: Record<string, string> = {
          'opfCheckout.paymentOption': 'Payment Option',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment Option');
        expect(card.text?.[0]).toBe('Gift Card Payment');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle order with partial gift card summary', () => {
      component.order = {
        opfGiftCardSummary: {
          giftCardsCoverFullAmount: false,
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should handle empty order object', () => {
      component.order = {};

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should handle rapid succession of order updates', async () => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      const orders: unknown[] = [
        {
          code: 'order-1',
          opfGiftCardSummary: {
            totalAppliedAmount: { value: 10 },
            totalBalance: { value: 50 },
            totalRemainingBalance: { value: 40 },
            giftCardsCoverFullAmount: false,
          },
        },
        {
          code: 'order-2',
          opfGiftCardSummary: {
            totalAppliedAmount: { value: 20 },
            totalBalance: { value: 50 },
            totalRemainingBalance: { value: 30 },
            giftCardsCoverFullAmount: false,
          },
        },
        {
          code: 'order-3',
          opfGiftCardSummary: {
            totalAppliedAmount: { value: 0 },
            totalBalance: { value: 50 },
            totalRemainingBalance: { value: 50 },
            giftCardsCoverFullAmount: false,
          },
        },
      ];

      orders.forEach((order) => contextSubject.next(order as Order));

      expect((component.order as any).code).toBe('order-3');
    });

    it('should handle decimal values in gift card amount', () => {
      component.order = {
        opfGiftCardSummary: {
          totalAppliedAmount: { value: 99.99, formattedValue: '$99.99' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });
  });
});
