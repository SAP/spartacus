/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGiftCardAppliedComponent } from './opf-gift-card-applied.component';
import { OpfGiftCardFacade } from '@spartacus/opf/gift-card/root';

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

class MockOpfGiftCardFacade {
  removeGiftCard = jasmine.createSpy('removeGiftCard');
}

class MockActiveCartFacade {
  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
}

describe('OpfGiftCardAppliedComponent', () => {
  let component: OpfGiftCardAppliedComponent;
  let fixture: ComponentFixture<OpfGiftCardAppliedComponent>;
  let giftCardFacade: jasmine.SpyObj<OpfGiftCardFacade>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpfGiftCardAppliedComponent, I18nTestingModule],
      providers: [
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: OpfGiftCardFacade, useClass: MockOpfGiftCardFacade },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfGiftCardAppliedComponent);
    component = fixture.componentInstance;

    giftCardFacade = TestBed.inject(
      OpfGiftCardFacade
    ) as jasmine.SpyObj<OpfGiftCardFacade>;
    globalMessageService = TestBed.inject(
      GlobalMessageService
    ) as jasmine.SpyObj<GlobalMessageService>;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as jasmine.SpyObj<ActiveCartFacade>;
    component.giftCards = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should inject dependencies', () => {
    expect((component as any).globalMessageService).toBeTruthy();
    expect((component as any).giftCardFacade).toBeTruthy();
    expect((component as any).activeCartFacade).toBeTruthy();
  });
  describe('removeGiftCard', () => {
    const giftCardId = 'GC-123';

    it('should remove gift card, reload cart and show success message', () => {
      giftCardFacade.removeGiftCard.and.returnValue(of(void 0));

      component.removeGiftCard(giftCardId);

      expect(giftCardFacade.removeGiftCard).toHaveBeenCalledWith(giftCardId);
      expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'giftCard.removedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should show error message when removal fails', () => {
      const mockError = { message: 'Custom Error' };
      giftCardFacade.removeGiftCard.and.returnValue(
        throwError(() => mockError)
      );

      component.removeGiftCard(giftCardId);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'Custom Error' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should use default error key when error has no message', () => {
      giftCardFacade.removeGiftCard.and.returnValue(throwError(() => ({})));

      component.removeGiftCard(giftCardId);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'giftCard.errors.removeFailed' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
