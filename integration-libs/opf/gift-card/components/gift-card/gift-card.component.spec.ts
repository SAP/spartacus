import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
} from '@spartacus/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { GiftCardComponent } from './gift-card.component';
import { GiftCardService } from '../../core/services/gift-card.service';

class MockGlobalMessageService {
  add = jasmine.createSpy('add');
}

class MockGiftCardService {
  getGiftCardConfiguration = jasmine
    .createSpy('getGiftCardConfiguration')
    .and.returnValue(of({ id: 'config-123' }));
  applyGiftCard = jasmine.createSpy('applyGiftCard');
}

class MockActiveCartFacade {
  getActive = jasmine
    .createSpy('getActive')
    .and.returnValue(of({ code: 'cart-1', sapGiftCards: [] }));
  reloadActiveCart = jasmine.createSpy('reloadActiveCart');
}
// @Component({ selector: 'cx-applied-gift-card', template: '' })
// class MockAppliedGiftCardComponent {
//   @Input() giftCards: any;
// }

describe('GiftCardComponent', () => {
  let component: GiftCardComponent;
  let fixture: ComponentFixture<GiftCardComponent>;
  let giftCardService: GiftCardService;
  let globalMessageService: GlobalMessageService;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [GiftCardComponent],
      providers: [
        UntypedFormBuilder,
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: GiftCardService, useClass: MockGiftCardService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GiftCardComponent);
    component = fixture.componentInstance;
    giftCardService = TestBed.inject(GiftCardService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);

    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.giftCardForm.get('cardNumber')).toBeDefined();
    expect(component.giftCardForm.get('pin')).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should load configuration on init', () => {
      expect(giftCardService.getGiftCardConfiguration).toHaveBeenCalled();
      // Accessing protected property for verification
      expect((component as any).configurationId).toBe('config-123');
    });

    it('should show error message if configuration is missing', () => {
      (giftCardService.getGiftCardConfiguration as jasmine.Spy).and.returnValue(
        of(undefined)
      );
      component.ngOnInit();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'giftCard.errors.configurationNotFound' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('addGiftCard', () => {
    it('should not call service if form is invalid', () => {
      component.giftCardForm.controls['cardNumber'].setValue(''); // Required field
      component.addGiftCard();
      expect(giftCardService.applyGiftCard).not.toHaveBeenCalled();
    });

    it('should call applyGiftCard and handle success', () => {
      (giftCardService.applyGiftCard as jasmine.Spy).and.returnValue(of({}));
      component.giftCardForm.patchValue({ cardNumber: '1234', pin: '0000' });

      component.addGiftCard();

      expect(giftCardService.applyGiftCard).toHaveBeenCalledWith({
        configurationId: 'config-123',
        number: '1234',
        securityCode: '0000',
      });
      expect(activeCartFacade.reloadActiveCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'giftCard.addedSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      expect(component.giftCardForm.pristine).toBe(true); // Form reset
    });

    it('should handle errors using handleGiftCardError logic', () => {
      const mockError = { details: [{ message: 'Insufficient balance' }] };
      (giftCardService.applyGiftCard as jasmine.Spy).and.returnValue(
        throwError(() => mockError)
      );
      component.giftCardForm.patchValue({ cardNumber: '1234', pin: '0000' });

      component.addGiftCard();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'Insufficient balance' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  it('should toggle showGiftCardForm boolean', () => {
    expect((component as any).showGiftCardForm).toBe(false);
    component.toggleGiftCardForm();
    expect((component as any).showGiftCardForm).toBe(true);
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
