import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AppliedGiftCardComponent } from './applied-gift-card.component';
import { GiftCardService } from '../../core/services';

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

class MockGiftCardService {
  removeGiftCard = jasmine.createSpy('removeGiftCard');
}

class MockActiveCartFacade {
  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
}

describe('AppliedGiftCardComponent', () => {
  let component: AppliedGiftCardComponent;
  let fixture: ComponentFixture<AppliedGiftCardComponent>;
  let giftCardService: jasmine.SpyObj<GiftCardService>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let activeCartFacade: jasmine.SpyObj<ActiveCartFacade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppliedGiftCardComponent, // ✅ standalone component must go in imports
        I18nTestingModule,
      ],
      providers: [
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: GiftCardService, useClass: MockGiftCardService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppliedGiftCardComponent);
    component = fixture.componentInstance;

    giftCardService = TestBed.inject(
      GiftCardService
    ) as jasmine.SpyObj<GiftCardService>;
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
  expect((component as any).giftCardService).toBeTruthy();
  expect((component as any).activeCartFacade).toBeTruthy();
});
  describe('removeGiftCard', () => {
    const giftCardId = 'GC-123';

    it('should remove gift card, reload cart and show success message', () => {
      giftCardService.removeGiftCard.and.returnValue(of(void 0));

      component.removeGiftCard(giftCardId);

      expect(giftCardService.removeGiftCard).toHaveBeenCalledWith(giftCardId);
      expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'giftCard.removedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should show error message when removal fails', () => {
      const mockError = { message: 'Custom Error' };
      giftCardService.removeGiftCard.and.returnValue(
        throwError(() => mockError)
      );

      component.removeGiftCard(giftCardId);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'Custom Error' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should use default error key when error has no message', () => {
      giftCardService.removeGiftCard.and.returnValue(throwError(() => ({})));

      component.removeGiftCard(giftCardId);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'giftCard.errors.removeFailed' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
