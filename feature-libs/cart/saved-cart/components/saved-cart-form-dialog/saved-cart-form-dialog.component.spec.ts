import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DeleteSavedCartEvent,
  DeleteSavedCartFailEvent,
  SavedCartFacade,
} from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  IconTestingModule,
  KeyboardFocusTestingModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  SavedCartFormDialogComponent,
  SavedCartFormDialogOptions,
} from './saved-cart-form-dialog.component';

const mockDescriptionMaxLength = 250;
const mockUserId = 'test-user';
const mockCartId = '123456789';
const mockCart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
  saveTime: new Date(),
};

const mockSuccessDeleteCloseReason = 'Successfully deleted a saved cart';
const mockFilledDialogData: SavedCartFormDialogOptions = {
  cart: mockCart,
  layoutOption: 'save',
};

const mockDialogData$ = new BehaviorSubject<SavedCartFormDialogOptions>(
  mockFilledDialogData
);
const mockDeleteSavedCartEvent = {
  userId: mockUserId,
  cartId: mockCartId,
  cartCode: mockCartId,
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return mockDialogData$.asObservable();
  }

  closeDialog(_reason: string): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  saveCart({}: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
  }): void {}
  editSavedCart({}: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
  }): void {}
  restoreSavedCart(_cartId: string): void {}
  cloneSavedCart(_cartId: string): void {}
  deleteSavedCart(_cartId: string): void {}
  clearSaveCart(): void {}
  clearRestoreSavedCart(): void {}
  clearCloneSavedCart(): void {}
  getSaveCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  getSaveCartProcessLoading(): Observable<boolean> {
    return of();
  }
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  getCloneSavedCartProcessLoading(): Observable<boolean> {
    return of();
  }
  getRestoreSavedCartProcessLoading(): Observable<boolean> {
    return of();
  }
}

class MockEventService implements Partial<EventService> {
  get(_event: any): Observable<any> {
    return of();
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('SavedCartFormDialogComponent', () => {
  let component: SavedCartFormDialogComponent;
  let fixture: ComponentFixture<SavedCartFormDialogComponent>;
  let globalMessageService: GlobalMessageService;
  let savedCartService: SavedCartFacade;
  let eventService: EventService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        I18nTestingModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        KeyboardFocusTestingModule,
        IconTestingModule,
      ],
      declarations: [SavedCartFormDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
        {
          provide: EventService,
          useClass: MockEventService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    globalMessageService = TestBed.inject(GlobalMessageService);
    savedCartService = TestBed.inject(SavedCartFacade);
    eventService = TestBed.inject(EventService);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);

    mockDialogData$.next(mockFilledDialogData);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should build the form', () => {
    it('with fetched cart values', () => {
      fixture.detectChanges();

      expect(component.form?.get('name')?.value).toEqual(mockCart.name);
      expect(component.form?.get('description')?.value).toEqual(
        mockCart.description
      );
    });

    it('with empty values', () => {
      mockDialogData$.next({ cart: {} });
      fixture.detectChanges();

      expect(component.form?.get('name')?.value).toEqual('');
      expect(component.form?.get('description')?.value).toEqual('');
    });
  });

  it('should trigger save cart', () => {
    spyOn(savedCartService, 'saveCart');

    component.saveOrEditCart(mockCartId);

    expect(savedCartService.saveCart).toHaveBeenCalledWith({
      cartId: mockCartId,
      saveCartName: mockCart.name,
      saveCartDescription: mockCart.description,
    });
  });

  it('should trigger edit saved cart', () => {
    spyOn(savedCartService, 'editSavedCart');

    mockDialogData$.next({ ...mockFilledDialogData, layoutOption: 'edit' });

    component.saveOrEditCart(mockCartId);

    expect(savedCartService.editSavedCart).toHaveBeenCalledWith({
      cartId: mockCartId,
      saveCartName: mockCart.name,
      saveCartDescription: mockCart.description,
    });
  });

  it('should trigger delete cart', () => {
    spyOn(savedCartService, 'deleteSavedCart');

    component.deleteCart(mockCartId);

    expect(savedCartService.deleteSavedCart).toHaveBeenCalledWith(mockCartId);
  });

  it('should trigger restore saved cart with no cloning', () => {
    spyOn(savedCartService, 'restoreSavedCart');
    spyOn(savedCartService, 'cloneSavedCart');

    component.isCloneSavedCart = false;

    component.restoreSavedCart(mockCartId);
    expect(savedCartService.restoreSavedCart).toHaveBeenCalledWith(mockCartId);
    expect(savedCartService.cloneSavedCart).not.toHaveBeenCalled();
  });

  it('should trigger restore saved cart with cloning', () => {
    spyOn(savedCartService, 'restoreSavedCart');
    spyOn(savedCartService, 'cloneSavedCart');

    component?.form?.get('cloneName')?.setValue(mockCart.name);
    component.isCloneSavedCart = true;

    component.restoreSavedCart(mockCartId);
    expect(savedCartService.cloneSavedCart).toHaveBeenCalledWith(
      mockCartId,
      mockCart.name
    );
    expect(savedCartService.restoreSavedCart).not.toHaveBeenCalled();
  });

  it('should close dialog on close method', () => {
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockSuccessDeleteCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockSuccessDeleteCloseReason
    );
  });

  it('should trigger toggleIsCloneSavedCart()', () => {
    component.isCloneSavedCart = true;
    component.toggleIsCloneSavedCart();
    expect(component.isCloneSavedCart).toBeFalsy();
  });

  // TODO(#12660): Remove once backend is updated
  it('should provide default value to saveCartDescription when empty', () => {
    spyOn(savedCartService, 'editSavedCart');

    mockDialogData$.next({ cart: {}, layoutOption: 'edit' });

    component.saveOrEditCart(mockCartId);

    expect(savedCartService.editSavedCart).toHaveBeenCalledWith({
      cartId: mockCartId,
      saveCartName: '',
      saveCartDescription: '-',
    });
  });

  describe('should return actual characters left', () => {
    it('when form control has value', () => {
      component?.form?.get('description')?.setValue('test');

      expect(component.descriptionsCharacterLeft).toEqual(
        mockDescriptionMaxLength - 4
      );
    });

    it('when form control has null value', () => {
      component?.form?.get('description')?.setValue(null);

      expect(component.descriptionsCharacterLeft).toEqual(
        mockDescriptionMaxLength
      );
    });

    it('when form control has undefined value', () => {
      component?.form?.get('description')?.setValue(undefined);

      expect(component.descriptionsCharacterLeft).toEqual(
        mockDescriptionMaxLength
      );
    });
    it('when form control has empty value', () => {
      component?.form?.get('description')?.setValue('');

      expect(component.descriptionsCharacterLeft).toEqual(
        mockDescriptionMaxLength
      );
    });
  });

  describe('should trigger onComplete from ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'onComplete').and.stub();
    });

    it('should trigger onComplete when there was a successful saved cart', () => {
      spyOn(savedCartService, 'getSaveCartProcessSuccess').and.returnValue(
        of(true)
      );

      component.ngOnInit();
      expect(component.onComplete).toHaveBeenCalled();
    });

    it('should trigger onComplete when there was a successful delete saved cart event', () => {
      spyOn(eventService, 'get').and.returnValue(of(mockDeleteSavedCartEvent));
      component.ngOnInit();
      expect(component.onComplete).toHaveBeenCalled();
    });

    it('should trigger onComplete when there was a successful restore cart', () => {
      spyOn(
        savedCartService,
        'getRestoreSavedCartProcessSuccess'
      ).and.returnValue(of(true));

      component.ngOnInit();
      expect(component.onComplete).toHaveBeenCalled();
    });
  });

  describe('should perform actions from onComplete', () => {
    beforeEach(() => {
      spyOn(component, 'close');
      spyOn(globalMessageService, 'add');
    });

    it('when successfully saving a cart', () => {
      spyOn(savedCartService, 'clearSaveCart');

      mockDialogData$.next(mockFilledDialogData);

      component.onComplete(true);

      expect(component.close).toHaveBeenCalledWith('Successfully saved cart');
      expect(savedCartService.clearSaveCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'savedCartCartPage.messages.cartSaved',
          params: {
            cartName: mockCart.name,
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('when successfully deleting a cart', () => {
      spyOn(routingService, 'go');

      mockDialogData$.next({ ...mockFilledDialogData, layoutOption: 'delete' });

      component.onComplete(true);

      expect(component.close).toHaveBeenCalledWith(
        'Successfully deleted a saved cart'
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'savedCarts',
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'savedCartDialog.deleteCartSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('when successfully editing a cart', () => {
      spyOn(savedCartService, 'clearSaveCart');

      mockDialogData$.next({ ...mockFilledDialogData, layoutOption: 'edit' });

      component.onComplete(true);

      expect(component.close).toHaveBeenCalledWith(
        'Successfully edited saved cart'
      );
      expect(savedCartService.clearSaveCart).toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'savedCartDialog.editCartSuccess',
          params: {
            cartName: mockCart.name,
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('when successfully restoring a cart', () => {
      spyOn(routingService, 'go');
      spyOn(savedCartService, 'clearSaveCart');
      spyOn(savedCartService, 'clearCloneSavedCart');
      spyOn(savedCartService, 'clearRestoreSavedCart');

      mockDialogData$.next({
        ...mockFilledDialogData,
        layoutOption: 'restore',
      });

      component.onComplete(true);

      expect(component.close).toHaveBeenCalledWith(
        'Successfully restored saved cart'
      );
      expect(savedCartService.clearSaveCart).toHaveBeenCalled();
      expect(savedCartService.clearCloneSavedCart).toHaveBeenCalled();
      expect(savedCartService.clearRestoreSavedCart).toHaveBeenCalled();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'savedCarts',
      });
    });
  });

  describe('disabling and enabling delete button using events', () => {
    it('should return true when the trigger event fired', () => {
      spyOn(eventService, 'get').and.callFake((type) => {
        if ((type as any).type === 'DeleteSavedCartEvent') {
          return of(new DeleteSavedCartEvent() as any);
        } else {
          return of();
        }
      });

      component.ngOnInit();

      let result: boolean | undefined;

      component.isDisableDeleteButton$
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return false when the fail event fired', () => {
      spyOn(eventService, 'get').and.callFake((type) => {
        if ((type as any).type === 'DeleteSavedCartEvent') {
          return of(new DeleteSavedCartEvent() as any);
        } else {
          return of(new DeleteSavedCartFailEvent() as any);
        }
      });

      component.ngOnInit();

      let result: boolean | undefined;

      component.isDisableDeleteButton$
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });
});
