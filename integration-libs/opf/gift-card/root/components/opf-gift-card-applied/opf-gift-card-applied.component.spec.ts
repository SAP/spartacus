/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGiftCardAppliedComponent } from './opf-gift-card-applied.component';
import { OpfGiftCardFacade } from '@spartacus/opf/gift-card/root';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';

class MockTranslationService {
  translate(): any {
    return of('');
  }
}

describe('OpfGiftCardAppliedComponent', () => {
  let component: OpfGiftCardAppliedComponent;
  let fixture: ComponentFixture<OpfGiftCardAppliedComponent>;

  let mockActiveCartFacade: any;
  let mockGiftCardFacade: any;
  let mockGlobalMessageService: any;
  let mockPaymentEventsService: any;

  beforeEach(async () => {
    mockActiveCartFacade = { reloadActiveCart: vi.fn() };

    mockGiftCardFacade = { removeGiftCard: vi.fn() };

    mockGlobalMessageService = { add: vi.fn() };

    mockPaymentEventsService = { emitReinitiatePaymentEvent: vi.fn(), emitRefreshActiveConfigurationsEvent: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [OpfGiftCardAppliedComponent, I18nTestingModule],
      providers: [
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: OpfGiftCardFacade, useValue: mockGiftCardFacade },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        {
          provide: OpfPaymentEventsService,
          useValue: mockPaymentEventsService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        TranslatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardAppliedComponent);
    component = fixture.componentInstance;
    component.opfGiftCards = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove gift card successfully', () => {
    mockGiftCardFacade.removeGiftCard.mockReturnValue(of(void 0));

    component.removeGiftCard('GC1');

    expect(mockGiftCardFacade.removeGiftCard).toHaveBeenCalledWith('GC1');
    expect(mockActiveCartFacade.reloadActiveCart).toHaveBeenCalled();
    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { key: 'opfGiftCard.removedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should emit reinitiatePaymentEvent after removing gift card', () => {
    mockGiftCardFacade.removeGiftCard.mockReturnValue(of(void 0));

    component.removeGiftCard('GC1');

    expect(
      mockPaymentEventsService.emitReinitiatePaymentEvent
    ).toHaveBeenCalled();
  });

  it('should emit refreshActiveConfigurationsEvent after removing gift card', () => {
    mockGiftCardFacade.removeGiftCard.mockReturnValue(of(void 0));

    component.removeGiftCard('GC1');

    expect(
      mockPaymentEventsService.emitRefreshActiveConfigurationsEvent
    ).toHaveBeenCalled();
  });

  it('should handle error when removing gift card fails', () => {
    const error = { details: [{ message: 'Remove failed' }] };
    mockGiftCardFacade.removeGiftCard.mockReturnValue(throwError(() => error));

    component.removeGiftCard('GC1');

    expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
      { raw: 'Remove failed' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
