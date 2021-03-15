import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartFormType } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';
import {
  SavedCartFormDialogComponent,
  SavedCartFormDialogOptions,
} from './saved-cart-form-dialog.component';

const mockDescriptionMaxLength = 250;
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
  layoutOption: 'edit',
};
const mockFilledDialogDataWithOutLayout: SavedCartFormDialogOptions = {
  cart: mockCart,
};
const mockEmptyDialogData = {} as SavedCartFormDialogOptions;
const mockDialogData$ = new BehaviorSubject<SavedCartFormDialogOptions>(
  mockEmptyDialogData
);

const mockSaveCartProcessData$ = new BehaviorSubject<boolean>(true);

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
    extraData?: { edit: boolean };
  }): void {}
  deleteSavedCart(_cartId: string): void {}
  clearSaveCart(): void {}
  clearRestoreSavedCart(): void {}
  getSaveCartProcessSuccess(): Observable<boolean> {
    return mockSaveCartProcessData$.asObservable();
  }
  getSaveCartProcessLoading(): Observable<boolean> {
    return of(false);
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
  let savedCartService: SavedCartService;
  let routingService: RoutingService;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [SavedCartFormDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartService, useClass: MockSavedCartService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    globalMessageService = TestBed.inject(GlobalMessageService);
    savedCartService = TestBed.inject(SavedCartService);
    routingService = TestBed.inject(RoutingService);
    launchDialogService = TestBed.inject(LaunchDialogService);
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
      mockDialogData$.next(mockFilledDialogData);
      fixture.detectChanges();

      expect(component.form?.get('name')?.value).toEqual(mockCart.name);
      expect(component.form?.get('description')?.value).toEqual(
        mockCart.description
      );
    });

    it('with fetched cart values from restored cart', () => {
      mockDialogData$.next(mockFilledDialogDataWithOutLayout);
      fixture.detectChanges();

      expect(component.form?.get('name')?.value).toEqual(mockCart.name);
      expect(component.form?.get('description')?.value).toEqual(
        mockCart.description
      );
    });

    it('with empty values', () => {
      mockDialogData$.next(mockEmptyDialogData);
      fixture.detectChanges();

      expect(component.form?.get('name')?.value).toEqual('');
      expect(component.form?.get('description')?.value).toEqual('');
    });
  });

  describe('should call service on save cart', () => {
    beforeEach(() => {
      spyOn(savedCartService, 'saveCart');
    });

    it('with filled values', () => {
      mockDialogData$.next(mockFilledDialogData);
      fixture.detectChanges();
      component.saveOrEditCart(mockCartId);

      expect(savedCartService.saveCart).toHaveBeenCalledWith({
        cartId: mockCartId,
        saveCartName: mockCart.name,
        saveCartDescription: mockCart.description,
        extraData: { edit: true },
      });
    });

    it('with empty values', () => {
      mockDialogData$.next(mockEmptyDialogData);
      fixture.detectChanges();
      component.saveOrEditCart(mockCartId);

      expect(savedCartService.saveCart).toHaveBeenCalledWith({
        cartId: mockCartId,
        saveCartName: '',
        saveCartDescription: '',
        extraData: { edit: false },
      });
    });
  });

  it('should apply multiple actions on delete cart', () => {
    spyOn(routingService, 'go');
    spyOn(globalMessageService, 'add');
    spyOn(savedCartService, 'deleteSavedCart');
    spyOn(component, 'close');

    component.deleteCart(mockCartId);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'savedCarts',
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'savedCartDialog.deleteCartSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    expect(savedCartService.deleteSavedCart).toHaveBeenCalledWith(mockCartId);
    expect(component.close).toHaveBeenCalledWith(mockSuccessDeleteCloseReason);
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

  it('should trigger onSuccess when there was a successful saved cart', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(savedCartService, 'getSaveCartProcessSuccess').and.returnValue(
      of(true)
    );

    component.ngOnInit();
    expect(component.onSuccess).toHaveBeenCalled();
  });

  it('should trigger close modal, clear actions and add global message on save', () => {
    spyOn(component, 'close');
    spyOn(savedCartService, 'clearRestoreSavedCart');
    spyOn(savedCartService, 'clearSaveCart');
    spyOn(globalMessageService, 'add');

    mockDialogData$.next(mockFilledDialogData);
    fixture.detectChanges();

    component.onSuccess(true, SavedCartFormType.EDIT);

    expect(component.close).toHaveBeenCalledWith('Succesfully saved cart');
    expect(savedCartService.clearSaveCart).toHaveBeenCalled();
    expect(savedCartService.clearRestoreSavedCart).toHaveBeenCalled();
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

  it('should NOT close modal, clear actions and add global message on save', () => {
    spyOn(component, 'close');
    spyOn(savedCartService, 'clearRestoreSavedCart');
    spyOn(savedCartService, 'clearSaveCart');

    component.onSuccess(false, SavedCartFormType.EDIT);

    expect(component.close).not.toHaveBeenCalled();
    expect(savedCartService.clearRestoreSavedCart).not.toHaveBeenCalled();
    expect(savedCartService.clearSaveCart).not.toHaveBeenCalled();
  });
});
