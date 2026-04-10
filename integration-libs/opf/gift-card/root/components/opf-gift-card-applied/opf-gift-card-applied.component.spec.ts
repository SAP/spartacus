/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BehaviorSubject, of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { OpfGiftCardApplyComponent } from '../opf-gift-card-apply';
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

  let mockActiveCartFacade: jasmine.SpyObj<ActiveCartFacade>;
  let mockGiftCardFacade: jasmine.SpyObj<OpfGiftCardFacade>;
  let mockGlobalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let mockPaymentEventsService: jasmine.SpyObj<OpfPaymentEventsService>;

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

  beforeEach(async () => {
    mockActiveCartFacade = jasmine.createSpyObj('ActiveCartFacade', [
      'getActive',
      'reloadActiveCart',
    ]);

    mockGiftCardFacade = jasmine.createSpyObj('OpfGiftCardFacade', [
      'applyGiftCard',
      'isGiftCardEnabled',
      'isGiftCardCoveredTotalAmount',
    ]);

    mockGlobalMessageService = jasmine.createSpyObj('GlobalMessageService', [
      'add',
    ]);

    mockPaymentEventsService = jasmine.createSpyObj('OpfPaymentEventsService', [
      'emitIsGiftCardCoveredTotalAmountEvent',
    ]);

    mockActiveCartFacade.getActive.and.returnValue(cartSubject.asObservable());
    mockGiftCardFacade.isGiftCardEnabled.and.returnValue(of(true));
    mockGiftCardFacade.isGiftCardCoveredTotalAmount.and.returnValue(of(false));

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
    spyOn(component.giftCardForm, 'markAllAsTouched');

    component.addGiftCard();

    expect(component.giftCardForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should apply gift card successfully', () => {
    component.giftCardForm.setValue({
      cardNumber: '12345678',
      pin: '123',
    });

    mockGiftCardFacade.applyGiftCard.and.returnValue(of(void 0));

    component.addGiftCard();

    expect(mockGiftCardFacade.applyGiftCard).toHaveBeenCalled();
    expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'opfGiftCard.appliedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
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

    mockGiftCardFacade.applyGiftCard.and.returnValue(throwError(() => error));

    component.addGiftCard();

    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { raw: 'Detailed error' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should toggle gift card form', () => {
    const initial = component['showGiftCardForm'];

    component.toggleGiftCardForm();

    expect(component['showGiftCardForm']).toBe(!initial);
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

  it('should unsubscribe on destroy', () => {
    spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });

  it('should return applied gift cards from cart$', (done) => {
    cartSubject.next({
      opfGiftCards: [mockGiftCard],
    });

    component['appliedGiftCards$'].subscribe((cards) => {
      expect(cards.length).toBe(1);
      expect(cards[0].id).toBe('GC1');
      done();
    });
  });
});
