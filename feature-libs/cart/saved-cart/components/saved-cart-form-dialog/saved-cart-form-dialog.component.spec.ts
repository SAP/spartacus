import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DeleteSavedCartEvent,
  DeleteSavedCartFailEvent,
  DeleteSavedCartSuccessEvent,
  SavedCartEventsService,
  SavedCartService,
} from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
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

const mockSuccessDeleteCloseReason = 'Succesfully deleted a saved cart';
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
  go(): void {}
}

class MockSavedCartService implements Partial<SavedCartService> {
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
  deleteSavedCart(_cartId: string): void {}
  clearSaveCart(): void {}
  clearRestoreSavedCart(): void {}
  getSaveCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  getSaveCartProcessLoading(): Observable<boolean> {
    return of();
  }
}

class MockSavedCartEventsService implements Partial<SavedCartEventsService> {
  getDeleteSavedCartEvent(): Observable<DeleteSavedCartEvent> {
    return of();
  }

  getDeleteSavedCartSuccessEvent(): Observable<DeleteSavedCartSuccessEvent> {
    return of();
  }
  getDeleteSavedCartFailEvent(): Observable<DeleteSavedCartFailEvent> {
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

class MockClearCheckoutService implements Partial<ClearCheckoutService> {
  resetCheckoutProcesses(): void {}
}

describe('SavedCartFormDialogComponent', () => {
  let component: SavedCartFormDialogComponent;
  let fixture: ComponentFixture<SavedCartFormDialogComponent>;
  let globalMessageService: GlobalMessageService;
  let savedCartService: SavedCartService;
  let savedCartEventsService: SavedCartEventsService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;
  let clearCheckoutService: ClearCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [SavedCartFormDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartService, useClass: MockSavedCartService },
        {
          provide: SavedCartEventsService,
          useClass: MockSavedCartEventsService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: ClearCheckoutService,
          useClass: MockClearCheckoutService,
        },
      ],
    }).compileComponents();

    globalMessageService = TestBed.inject(GlobalMessageService);
    savedCartService = TestBed.inject(SavedCartService);
    savedCartEventsService = TestBed.inject(SavedCartEventsService);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    clearCheckoutService = TestBed.inject(ClearCheckoutService);

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

  it('should close dialog on close method', () => {
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockSuccessDeleteCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockSuccessDeleteCloseReason
    );
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

  describe('should trigger onSuccess from ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'onSuccess').and.stub();
    });

    it('should trigger onSuccess when there was a successful saved cart', () => {
      spyOn(savedCartService, 'getSaveCartProcessSuccess').and.returnValue(
        of(true)
      );

      component.ngOnInit();
      expect(component.onSuccess).toHaveBeenCalled();
    });

    it('should trigger onSuccess when there was a successful delete saved cart event', () => {
      spyOn(
        savedCartEventsService,
        'getDeleteSavedCartSuccessEvent'
      ).and.returnValue(of(mockDeleteSavedCartEvent));
      component.ngOnInit();
      expect(component.onSuccess).toHaveBeenCalled();
    });
  });

  describe('should perform actions from onSuccess', () => {
    beforeEach(() => {
      spyOn(component, 'close');
      spyOn(globalMessageService, 'add');
    });

    it('when successfully saving a cart', () => {
      spyOn(savedCartService, 'clearSaveCart');
      spyOn(clearCheckoutService, 'resetCheckoutProcesses').and.stub();

      mockDialogData$.next(mockFilledDialogData);

      component.onSuccess(true);

      expect(component.close).toHaveBeenCalledWith('Succesfully saved cart');
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
      expect(clearCheckoutService.resetCheckoutProcesses).toHaveBeenCalled();
    });

    it('when succesfully deleting a cart', () => {
      spyOn(routingService, 'go');

      mockDialogData$.next({ ...mockFilledDialogData, layoutOption: 'delete' });

      component.onSuccess(true);

      expect(component.close).toHaveBeenCalledWith(
        'Succesfully deleted a saved cart'
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'savedCarts',
      });
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'savedCartDialog.deleteCartSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('when succesfully editting a cart', () => {
      spyOn(savedCartService, 'clearSaveCart');

      mockDialogData$.next({ ...mockFilledDialogData, layoutOption: 'edit' });

      component.onSuccess(true);

      expect(component.close).toHaveBeenCalledWith(
        'Succesfully edited saved cart'
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
  });

  describe('disabling and enabling delete button using events', () => {
    it('should return true when the trigger event fired', () => {
      spyOn(savedCartEventsService, 'getDeleteSavedCartEvent').and.returnValue(
        of(mockDeleteSavedCartEvent)
      );

      component.ngOnInit();

      let result: boolean | undefined;

      component.isDisableDeleteButton$
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return false when the fail event fired', () => {
      spyOn(
        savedCartEventsService,
        'getDeleteSavedCartFailEvent'
      ).and.returnValue(of(mockDeleteSavedCartEvent));

      component.ngOnInit();

      let result: boolean | undefined;

      component.isDisableDeleteButton$
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });
  });
});
