import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';

import { GiftCardComponent } from './gift-card.component';
import { GiftCardService } from '../../core/services/gift-card.service';
import { SAPGiftCard } from '../../root/model';

const mockGiftCard: SAPGiftCard = {
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

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

class MockActiveCartFacade {
  cartSubject = new BehaviorSubject<Cart>({} as Cart);

  getActive = jasmine
    .createSpy('getActive')
    .and.callFake(() => this.cartSubject.asObservable());

  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
}

class MockGiftCardService {
  isGiftCardEnabled = jasmine
    .createSpy('isGiftCardEnabled')
    .and.returnValue(of(true));

  applyGiftCard = jasmine
    .createSpy('applyGiftCard')
    .and.returnValue(of(void 0));
}

describe('GiftCardComponent', () => {
  let component: GiftCardComponent;
  let fixture: ComponentFixture<GiftCardComponent>;
  let globalMessageService: jasmine.SpyObj<GlobalMessageService>;
  let activeCartFacade: MockActiveCartFacade;
  let giftCardService: jasmine.SpyObj<GiftCardService>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GiftCardComponent, I18nTestingModule],
      providers: [
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: GiftCardService, useClass: MockGiftCardService },
        { provide: RoutingService, useValue: {} },
      ],
    });

    // The real template uses `cxTranslate` (Spartacus TranslatePipe) which depends on
    // RoutingService -> NgRx Store. For this unit test we don't need template rendering,
    // so we override it to keep the testbed lightweight and avoid Store setup.
    TestBed.overrideComponent(GiftCardComponent, {
      set: { template: '' },
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(GiftCardComponent);
    component = fixture.componentInstance;

    globalMessageService = TestBed.inject(
      GlobalMessageService
    ) as jasmine.SpyObj<GlobalMessageService>;
    activeCartFacade = TestBed.inject(
      ActiveCartFacade
    ) as unknown as MockActiveCartFacade;
    giftCardService = TestBed.inject(
      GiftCardService
    ) as jasmine.SpyObj<GiftCardService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form on init with required + maxlength validators', () => {
    const cardNumber = component.giftCardForm.get('cardNumber');
    const pin = component.giftCardForm.get('pin');

    expect(cardNumber).toBeTruthy();
    expect(pin).toBeTruthy();

    cardNumber?.setValue('');
    cardNumber?.markAsTouched();
    cardNumber?.updateValueAndValidity();
    expect(cardNumber?.hasError('required')).toBeTruthy();

    cardNumber?.setValue('1'.repeat(57));
    cardNumber?.updateValueAndValidity();
    expect(cardNumber?.hasError('maxlength')).toBeTruthy();

    pin?.setValue('');
    pin?.markAsTouched();
    pin?.updateValueAndValidity();
    expect(pin?.hasError('required')).toBeTruthy();

    pin?.setValue('1'.repeat(17));
    pin?.updateValueAndValidity();
    expect(pin?.hasError('maxlength')).toBeTruthy();
  });

  it('should map appliedGiftCards$ from active cart', () => {
    activeCartFacade.cartSubject.next({ sapGiftCards: [mockGiftCard] } as any);

    let actual: SAPGiftCard[] | undefined;
    (component as any).appliedGiftCards$.subscribe((cards: SAPGiftCard[]) => {
      actual = cards;
    });

    expect(actual).toEqual([mockGiftCard]);
  });

  describe('toggleGiftCardForm', () => {
    it('should toggle showGiftCardForm', () => {
      expect((component as any).showGiftCardForm).toBeFalsy();

      component.toggleGiftCardForm();
      expect((component as any).showGiftCardForm).toBeTruthy();

      component.toggleGiftCardForm();
      expect((component as any).showGiftCardForm).toBeFalsy();
    });
  });

  describe('addGiftCard', () => {
    it('should mark all as touched and not call service when form is invalid', () => {
      component.giftCardForm.reset();
      const markAllAsTouchedSpy = spyOn(
        component.giftCardForm,
        'markAllAsTouched'
      ).and.callThrough();

      component.addGiftCard();

      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(giftCardService.applyGiftCard).not.toHaveBeenCalled();
    });

    it('should apply gift card, reload cart, show success message, reset form and stop loading', () => {
      giftCardService.applyGiftCard.and.returnValue(of(void 0));
      const loadingValues: boolean[] = [];
      (component as any).loading$.subscribe((v: boolean) =>
        loadingValues.push(v)
      );

      component.giftCardForm.setValue({ cardNumber: '411111', pin: '1234' });
      component.addGiftCard();

      expect(giftCardService.applyGiftCard).toHaveBeenCalledWith({
        number: '411111',
        securityCode: '1234',
      });
      expect(
        (TestBed.inject(ActiveCartFacade) as any).reloadActiveCart
      ).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'giftCard.addedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      expect(component.giftCardForm.value).toEqual({
        cardNumber: null,
        pin: null,
      });
      expect(loadingValues).toContain(true);
      expect(loadingValues[loadingValues.length - 1]).toBeFalsy();
    });

    it('should show error message from error.details[0].message and stop loading', () => {
      const error = {
        details: [{ message: 'Invalid gift card' }],
      } as any as HttpErrorModel;
      giftCardService.applyGiftCard.and.returnValue(throwError(() => error));

      const loadingValues: boolean[] = [];
      (component as any).loading$.subscribe((v: boolean) =>
        loadingValues.push(v)
      );

      component.giftCardForm.setValue({ cardNumber: '411111', pin: '1234' });
      component.addGiftCard();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'Invalid gift card' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(loadingValues).toContain(true);
      expect(loadingValues[loadingValues.length - 1]).toBeFalsy();
    });

    it('should fall back to default error key if no message is provided', () => {
      giftCardService.applyGiftCard.and.returnValue(
        throwError(() => ({}) as HttpErrorModel)
      );

      component.giftCardForm.setValue({ cardNumber: '411111', pin: '1234' });
      component.addGiftCard();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'giftCard.errors.applyFailed' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(
      (component as any).subscription,
      'unsubscribe'
    );
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
