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
  let giftCardService: GiftCardService;
  let globalMessageService: GlobalMessageService;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AppliedGiftCardComponent],
      providers: [
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: GiftCardService, useClass: MockGiftCardService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppliedGiftCardComponent);
    component = fixture.componentInstance;
    giftCardService = TestBed.inject(GiftCardService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeGiftCard', () => {
    const giftCardId = 'GC-123';

    it('should successfully remove gift card, reload cart, and show success message', () => {
      (giftCardService.removeGiftCard as jasmine.Spy).and.returnValue(of({}));

      component.removeGiftCard(giftCardId);

      expect(giftCardService.removeGiftCard).toHaveBeenCalledWith(giftCardId);
      expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'giftCard.removedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should handle error and show error message if removal fails', () => {
      const mockError = { message: 'Custom Error' };
      (giftCardService.removeGiftCard as jasmine.Spy).and.returnValue(
        throwError(() => mockError)
      );

      component.removeGiftCard(giftCardId);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'Custom Error' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should use default error key if error object has no message', () => {
      (giftCardService.removeGiftCard as jasmine.Spy).and.returnValue(
        throwError(() => ({}))
      );

      component.removeGiftCard(giftCardId);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'giftCard.errors.removeFailed' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
