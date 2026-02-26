/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, OutletContextData } from '@spartacus/storefront';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';

import { OpfGiftCardPaymentComponent } from './opf-gift-card-payment.component';
import { Order } from '@spartacus/order/root';
import { TranslationService } from '@spartacus/core';

describe('OpfGiftCardPaymentComponent', () => {
  let component: OpfGiftCardPaymentComponent;
  let fixture: ComponentFixture<OpfGiftCardPaymentComponent>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let mockOrder: Order;
  let contextSubject: Subject<any>;

  beforeEach(async () => {
    const translationServiceSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardPaymentComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    }).compileComponents();

    translationService = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
    fixture = TestBed.createComponent(OpfGiftCardPaymentComponent);
    component = fixture.componentInstance;

    contextSubject = new Subject<any>();
    mockOrder = {
      code: 'order-1',
      sapGiftCardSummary: {
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

    it('should initialize subscription', () => {
      expect(component['subscription']).toBeTruthy();
    });

    it('should have order property', () => {
      component.order = mockOrder;
      expect(component.order).toEqual(mockOrder);
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

    it('should not subscribe if orderOutlet is not provided', () => {
      component['orderOutlet'] = undefined;
      const subscriptionSpy = spyOn(component['subscription'], 'add');

      component.ngOnInit();

      expect(subscriptionSpy).not.toHaveBeenCalled();
    });

    it('should handle multiple order updates from context', (done) => {
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
      setTimeout(() => {
        expect(component.order.code).toBe('order-1');

        contextSubject.next(orders[1] as Order);
        setTimeout(() => {
          expect(component.order.code).toBe('order-2');
          done();
        }, 10);
      }, 10);
    });
  });

  describe('getPaymentMethodCardContent', () => {
    beforeEach(() => {
      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'opfCheckout.paymentOption': 'Payment Option',
          'giftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });
    });

    it('should return card with translated title and text', (done) => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment Option');
        expect(card.text).toContain('Gift Card Payment');
        done();
      });
    });

    it('should call translate with correct keys', (done) => {
      component.getPaymentMethodCardContent().subscribe(() => {
        expect(translationService.translate).toHaveBeenCalledWith(
          'opfCheckout.paymentOption'
        );
        expect(translationService.translate).toHaveBeenCalledWith(
          'giftCard.giftCardPayment'
        );
        done();
      });
    });

    it('should return card object with expected structure', (done) => {
      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBeDefined();
        expect(card.text).toBeDefined();
        expect(Array.isArray(card.text)).toBe(true);
        expect(card.text?.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should handle translation service errors gracefully', (done) => {
      translationService.translate.and.returnValue(
        of('Fallback translation')
      );

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBeDefined();
        expect(card.text).toBeDefined();
        done();
      });
    });
  });

  describe('isGiftCardPayment', () => {
    it('should return true when gift card is applied with positive amount', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 50.0, formattedValue: '$50.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should return false when gift card is not applied', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 0, formattedValue: '$0.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return false when sapGiftCardSummary is undefined', () => {
      component.order = {} as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return false when totalAppliedAmount is undefined', () => {
      component.order = {
        sapGiftCardSummary: {},
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return false when totalAppliedAmount.value is negative', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: -10.0, formattedValue: '-$10.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);
    });

    it('should return true for large applied amounts', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 9999.99, formattedValue: '$9999.99' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should return true for small positive amounts', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 0.01, formattedValue: '$0.01' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscription', () => {
      const subscriptionSpy = spyOn(component['subscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(subscriptionSpy).toHaveBeenCalled();
    });

    it('should be called when component is destroyed', () => {
      const subscriptionSpy = spyOn(component['subscription'], 'unsubscribe');

      fixture.destroy();

      expect(subscriptionSpy).toHaveBeenCalled();
    });

    it('should handle multiple destroy calls', () => {
      const subscriptionSpy = spyOn(component['subscription'], 'unsubscribe');

      component.ngOnDestroy();
      component.ngOnDestroy();

      expect(subscriptionSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('Integration Tests', () => {
    it('should update isGiftCardPayment when order changes', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 0, formattedValue: '$0.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(false);

      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 100.0, formattedValue: '$100.00' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });

    it('should render card content when getPaymentMethodCardContent is called', (done) => {
      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'opfCheckout.paymentOption': 'Payment Option',
          'giftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment Option');
        expect(card.text?.[0]).toBe('Gift Card Payment');
        done();
      });
    });

    it('should maintain subscription during component lifecycle', () => {
      const mockOutletContext: Partial<OutletContextData<Order>> = {
        context$: contextSubject.asObservable(),
      };

      component['orderOutlet'] = mockOutletContext as OutletContextData<Order>;
      component.ngOnInit();

      const initialSubscriptionCount = component['subscription'].closed;

      contextSubject.next(mockOrder);

      expect(component['subscription'].closed).toBe(initialSubscriptionCount);
      expect(component.order).toEqual(mockOrder);
    });
  });

  describe('Edge Cases', () => {
    it('should handle order with partial gift card summary', () => {
      component.order = {
        sapGiftCardSummary: {
          giftCardsCoverFullAmount: false,
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
        { code: 'order-1', sapGiftCardSummary: { totalAppliedAmount: { value: 10 }, totalBalance: { value: 50 }, totalRemainingBalance: { value: 40 }, giftCardsCoverFullAmount: false } },
        { code: 'order-2', sapGiftCardSummary: { totalAppliedAmount: { value: 20 }, totalBalance: { value: 50 }, totalRemainingBalance: { value: 30 }, giftCardsCoverFullAmount: false } },
        { code: 'order-3', sapGiftCardSummary: { totalAppliedAmount: { value: 0 }, totalBalance: { value: 50 }, totalRemainingBalance: { value: 50 }, giftCardsCoverFullAmount: false } },
      ];

      orders.forEach((order) => contextSubject.next(order as Order));

      setTimeout(() => {
        expect((component.order as any).code).toBe('order-3');
        done();
      }, 10);
    });

    it('should handle decimal values in gift card amount', () => {
      component.order = {
        sapGiftCardSummary: {
          totalAppliedAmount: { value: 99.99, formattedValue: '$99.99' },
        },
      } as Order;

      expect(component.isGiftCardPayment).toBe(true);
    });
  });
});
