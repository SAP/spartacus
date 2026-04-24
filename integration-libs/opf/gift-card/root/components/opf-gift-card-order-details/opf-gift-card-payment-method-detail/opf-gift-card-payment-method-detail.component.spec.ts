/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, OutletContextData } from '@spartacus/storefront';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Subject, of } from 'rxjs';

import { OpfGiftCardPaymentMethodDetailComponent } from './opf-gift-card-payment-method-detail.component';
import { Order } from '@spartacus/order/root';
import { Store } from '@ngrx/store';
import { TranslationService } from '@spartacus/core';

describe('OpfGiftCardPaymentMethodDetailComponent', () => {
  let component: OpfGiftCardPaymentMethodDetailComponent;
  let fixture: ComponentFixture<OpfGiftCardPaymentMethodDetailComponent>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let mockOrder: Order;
  let contextSubject: Subject<any>;

  beforeEach(async () => {
    const translationServiceSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);

    contextSubject = new Subject<any>();

    const mockOutletContext: Partial<OutletContextData<Order>> = {
      context$: contextSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardPaymentMethodDetailComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
        {
          provide: Store,
          useValue: { pipe: jasmine.createSpy('pipe').and.returnValue(of({})) },
        },
        {
          provide: OutletContextData,
          useValue: mockOutletContext,
        },
      ],
    }).compileComponents();

    translationService = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
    fixture = TestBed.createComponent(OpfGiftCardPaymentMethodDetailComponent);
    component = fixture.componentInstance;

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

    it('should initialize subscription', () => {
      expect(component['subscription']).toBeTruthy();
    });

    it('should have order property', () => {
      component.order = mockOrder;
      expect(component.order).toEqual(mockOrder);
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to orderOutlet context when provided', fakeAsync(() => {
      component.ngOnInit();

      contextSubject.next({ item: mockOrder } as any);
      tick();

      expect(component.order).toEqual(mockOrder);
    }));

    it('should not subscribe if orderOutlet is not provided', () => {
      const subscriptionSpy = spyOn(component['subscription'], 'add');
      component['orderOutlet'] = undefined;

      component.ngOnInit();

      expect(subscriptionSpy).not.toHaveBeenCalled();
    });

    it('should handle multiple order updates from context', fakeAsync(() => {
      component.ngOnInit();

      const orders = [
        { ...mockOrder, code: 'order-1' },
        { ...mockOrder, code: 'order-2' },
      ];

      contextSubject.next({ item: orders[0] } as any);
      tick();
      expect(component.order.code).toBe('order-1');

      contextSubject.next({ item: orders[1] } as any);
      tick();
      expect(component.order.code).toBe('order-2');
    }));
  });

  describe('getPaymentMethodCardContent', () => {
    beforeEach(() => {
      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'opfCheckout.paymentOption': 'Payment Option',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
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
        expect(card.text?.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should handle translation service errors gracefully', (done) => {
      translationService.translate.and.returnValue(of('Fallback translation'));

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

    it('should render card content when getPaymentMethodCardContent is called', (done) => {
      translationService.translate.and.callFake((key: string) => {
        const translations: Record<string, string> = {
          'opfCheckout.paymentOption': 'Payment Option',
          'opfGiftCard.giftCardPayment': 'Gift Card Payment',
        };
        return of(translations[key] || key);
      });

      component.getPaymentMethodCardContent().subscribe((card: Card) => {
        expect(card.title).toBe('Payment Option');
        expect(card.text?.[0]).toBe('Gift Card Payment');
        done();
      });
    });

    it('should maintain subscription during component lifecycle', fakeAsync(() => {
      component.ngOnInit();

      const initialSubscriptionCount = component['subscription'].closed;

      contextSubject.next({ item: mockOrder } as any);
      tick();

      expect(component['subscription'].closed).toBe(initialSubscriptionCount);
      expect(component.order).toEqual(mockOrder);
    }));
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

    it('should handle rapid succession of order updates', fakeAsync(() => {
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

      orders.forEach((order) => {
        contextSubject.next({ item: order as Order });
        tick();
      });

      expect((component.order as any).code).toBe('order-3');
    }));

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
