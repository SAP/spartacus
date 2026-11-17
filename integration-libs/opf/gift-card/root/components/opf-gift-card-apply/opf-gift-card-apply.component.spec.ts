/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BehaviorSubject, of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { LaunchRenderStrategy, OutletContextData } from '@spartacus/storefront';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGiftCardApplyComponent } from './opf-gift-card-apply.component';
import { OpfGiftCardFacade } from '@spartacus/opf/gift-card/root';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';

class MockTranslationService {
  translate(): any {
    return of('');
  }
}

describe('OpfGiftCardApplyComponent', () => {
  let component: OpfGiftCardApplyComponent;
  let fixture: ComponentFixture<OpfGiftCardApplyComponent>;

  let mockActiveCartFacade: any;
  let mockGiftCardFacade: any;
  let mockGlobalMessageService: any;
  let mockPaymentEventsService: any;

  const cartSubject = new BehaviorSubject<any>({
    opfGiftCards: [],
    _availableOperations: [
      { key: 'applyGiftCard', value: { available: true } },
    ],
  });

  const mockGiftCard = {
    id: 'GC1',
    maskedNumber: '****1111',
    balance: { currencyIso: 'USD', formattedValue: '$100', value: 100 },
    appliedAmount: { currencyIso: 'USD', formattedValue: '$20', value: 20 },
    remainingBalance: {
      currencyIso: 'USD',
      formattedValue: '$80',
      value: 80,
    },
  };

  const isGiftCardCoveredSubject = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    mockActiveCartFacade = { getActive: vi.fn(), reloadActiveCart: vi.fn() };

    mockGiftCardFacade = { applyGiftCard: vi.fn(), isGiftCardEnabled: vi.fn(), isGiftCardCoveredTotalAmount: vi.fn() };

    mockGlobalMessageService = { add: vi.fn() };

    mockPaymentEventsService = { emitIsGiftCardCoveredTotalAmountEvent: vi.fn(), emitReinitiatePaymentEvent: vi.fn(), emitRefreshActiveConfigurationsEvent: vi.fn() };
    mockPaymentEventsService.isGiftCardCoveredTotalAmountEvent$ =
      isGiftCardCoveredSubject.asObservable();

    mockActiveCartFacade.getActive.mockReturnValue(cartSubject.asObservable());
    mockGiftCardFacade.isGiftCardEnabled.mockReturnValue(of(true));
    mockGiftCardFacade.isGiftCardCoveredTotalAmount.mockImplementation(() =>
      of(false)
    );

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardApplyComponent, I18nTestingModule],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: OpfGiftCardFacade, useValue: mockGiftCardFacade },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        {
          provide: OpfPaymentEventsService,
          useValue: mockPaymentEventsService,
        },
        {
          provide: OutletContextData,
          useValue: { context$: of({ disabled: false }) },
        },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: RoutingService, useValue: {} },
        {
          provide: LaunchRenderStrategy,
          useValue: {},
        },
        TranslatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form on init', () => {
    expect(component.giftCardForm).toBeTruthy();
    expect(component.giftCardForm.controls['cardNumber']).toBeDefined();
    expect(component.giftCardForm.controls['pin']).toBeDefined();
  });

  it('should mark form as touched if invalid on addGiftCard', () => {
    vi.spyOn(component.giftCardForm, 'markAllAsTouched');

    component.addGiftCard();

    expect(component.giftCardForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should apply gift card successfully', () => {
    component.giftCardForm.setValue({
      cardNumber: '12345678',
      pin: '123',
    });

    mockGiftCardFacade.applyGiftCard.mockReturnValue(of(void 0));

    component.addGiftCard();

    expect(mockGiftCardFacade.applyGiftCard).toHaveBeenCalled();
    expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'opfGiftCard.appliedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should emit reinitiatePaymentEvent after applying gift card', () => {
    component.giftCardForm.setValue({ cardNumber: '12345678', pin: '123' });
    mockGiftCardFacade.applyGiftCard.mockReturnValue(of(void 0));

    component.addGiftCard();

    expect(
      mockPaymentEventsService.emitReinitiatePaymentEvent
    ).toHaveBeenCalled();
  });

  it('should emit refreshActiveConfigurationsEvent after applying gift card', () => {
    component.giftCardForm.setValue({ cardNumber: '12345678', pin: '123' });
    mockGiftCardFacade.applyGiftCard.mockReturnValue(of(void 0));

    component.addGiftCard();

    expect(
      mockPaymentEventsService.emitRefreshActiveConfigurationsEvent
    ).toHaveBeenCalled();
  });

  it('should handle error when applying gift card fails', () => {
    component.giftCardForm.setValue({
      cardNumber: '12345678',
      pin: '123',
    });

    const error = {
      message: 'Apply failed',
      details: [{ message: 'Detailed error' }],
    };

    mockGiftCardFacade.applyGiftCard.mockReturnValue(throwError(() => error));

    component.addGiftCard();

    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { raw: 'Detailed error' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should toggle gift card form', () => {
    const initial = component['showGiftCardForm']();

    component.toggleGiftCardForm();

    expect(component['showGiftCardForm']()).toBe(!initial);
  });

  it('should reset form', () => {
    component.giftCardForm.setValue({
      cardNumber: '12345678',
      pin: '123',
    });

    component['resetForm']();

    expect(component.giftCardForm.value).toEqual({
      cardNumber: null,
      pin: null,
    });
  });

  it('should emit gift card coverage event on init', () => {
    expect(
      mockPaymentEventsService.emitIsGiftCardCoveredTotalAmountEvent
    ).toHaveBeenCalledWith(false);
  });

  it('should return applied gift cards from cart$', async () => {
    cartSubject.next({
      opfGiftCards: [mockGiftCard],
    });

    component['appliedGiftCards$'].subscribe((cards) => {
      expect(cards.length).toBe(1);
      expect(cards[0].id).toBe('GC1');    });
  });
});
