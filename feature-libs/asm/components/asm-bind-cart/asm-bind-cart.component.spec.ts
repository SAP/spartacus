import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OCC_CART_ID_CURRENT,
  Translatable,
} from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { EMPTY, NEVER, Observable, of, throwError } from 'rxjs';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { AsmBindCartComponent } from './asm-bind-cart.component';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActiveCartId(): Observable<string> {
    return EMPTY;
  }

  getActive(): Observable<Cart> {
    return of({});
  }
}

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  reloadCart(_: string, __?: { active: boolean } | undefined): void {}
}

class MockAsmBindCartFacade {
  bindCart(_cartId: string, _customerId: string): Observable<unknown> {
    return of(null);
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  dialogClose: Observable<any> = NEVER;

  openDialogAndSubscribe(): void {}
}

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  saveCart(): void {}
}

describe('AsmBindCartComponent', () => {
  let component: AsmBindCartComponent;
  let fixture: ComponentFixture<AsmBindCartComponent>;
  let asmBindCartFacade: AsmBindCartFacade;
  let multiCartFacade: MultiCartFacade;
  let activeCartFacade: ActiveCartFacade;
  let globalMessageService: GlobalMessageService;
  let launchDialogService: LaunchDialogService;
  let savedCartFacade: SavedCartFacade;

  const prevActiveCartId = '00001122';
  const prevActiveCart: Cart = {
    code: prevActiveCartId,
    deliveryItemsQuantity: 1,
  };
  const testCartId = '00001234';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmBindCartComponent, MockTranslatePipe],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AsmBindCartFacade, useClass: MockAsmBindCartFacade },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmBindCartComponent);
    component = fixture.componentInstance;

    asmBindCartFacade = TestBed.inject(AsmBindCartFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    savedCartFacade = TestBed.inject(SavedCartFacade);

    spyOn(asmBindCartFacade, 'bindCart').and.returnValue(of(undefined));
    spyOn(multiCartFacade, 'reloadCart').and.stub();
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(
      of(prevActiveCartId)
    );
    spyOn(activeCartFacade, 'getActive').and.returnValue(of(prevActiveCart));
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(launchDialogService, 'openDialogAndSubscribe').and.callThrough();
    spyOn(savedCartFacade, 'saveCart').and.callThrough();
  });

  it('should fill the cart field with the current active cart for the customer', () => {
    fixture.detectChanges();

    expect(component.cartId.value).toEqual(prevActiveCartId);
  });

  it('should leave the cart field blank when there is no current active cart for the customer', () => {
    (activeCartFacade.getActiveCartId as jasmine.Spy).and.returnValue(of(''));

    fixture.detectChanges();

    expect(component.cartId.value).toEqual('');
  });

  it('should reset the input with the active cart ID when left empty', () => {
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('input'));

    component.cartId.setValue('');
    input.triggerEventHandler('blur');

    expect(component.cartId.value).toEqual(prevActiveCartId);
  });

  it('should clear field when clear input is clicked', () => {
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.cx-asm-reset'));

    button.triggerEventHandler('click');

    expect(component.cartId.value).toEqual('');
  });

  describe('assign cart to customer', () => {
    beforeEach(() => {
      fixture.detectChanges();

      component.cartId.setValue(testCartId);
    });

    it('should bind cart without saving the active cart when active cart is empty', () => {
      const emptyCart: Cart = { ...prevActiveCart, deliveryItemsQuantity: 0 };
      (activeCartFacade.getActive as jasmine.Spy).and.returnValue(
        of(emptyCart)
      );

      component.bindCartToCustomer();

      expect(savedCartFacade.saveCart).not.toHaveBeenCalled();
      expect(asmBindCartFacade.bindCart).toHaveBeenCalledWith(testCartId);
    });

    it('should open the bind cart dialog', () => {
      component.bindCartToCustomer();

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
        LAUNCH_CALLER.ASM_BIND_CART,
        jasmine.anything()
      );
    });

    describe('replace cart', () => {
      beforeEach(() => {
        (
          (<unknown>launchDialogService) as MockLaunchDialogService
        ).dialogClose = of(BIND_CART_DIALOG_ACTION.REPLACE);
      });

      it('should save the current active cart', () => {
        component.bindCartToCustomer();

        expect(savedCartFacade.saveCart).toHaveBeenCalledWith({
          cartId: prevActiveCartId,
          saveCartName: prevActiveCartId,
          saveCartDescription: '-',
        });
      });

      it('should bind cart for assigned cart id', () => {
        component.bindCartToCustomer();

        expect(asmBindCartFacade.bindCart).toHaveBeenCalledWith(testCartId);
      });

      it('should retrieve newly bound cart as "current"', () => {
        component.bindCartToCustomer();

        expect(multiCartFacade.reloadCart).toHaveBeenCalledWith(
          OCC_CART_ID_CURRENT
        );
      });

      it('should alert that the cart sucessfully bound', () => {
        component.bindCartToCustomer();

        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'asm.bindCart.success' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('should not bind cart for empty value', () => {
        component.cartId.setValue('');

        component.bindCartToCustomer();

        expect(asmBindCartFacade.bindCart).not.toHaveBeenCalled();
      });

      it('should alert through global messsages when the bind cart fails', () => {
        const expectedErrorMessage = 'mock-error-message';
        (asmBindCartFacade.bindCart as jasmine.Spy).and.returnValue(
          throwError({ details: [{ message: expectedErrorMessage }] })
        );

        component.bindCartToCustomer();

        expect(globalMessageService.add).toHaveBeenCalledWith(
          expectedErrorMessage,
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });

      it('should not bind cart while loading a previous request', () => {
        (asmBindCartFacade.bindCart as jasmine.Spy).and.returnValue(NEVER);

        component.bindCartToCustomer();
        component.bindCartToCustomer();

        expect(asmBindCartFacade.bindCart).toHaveBeenCalledTimes(1);
      });
    });

    describe('cancel', () => {
      beforeEach(() => {
        (
          (<unknown>launchDialogService) as MockLaunchDialogService
        ).dialogClose = of(BIND_CART_DIALOG_ACTION.CANCEL);
      });

      it('should not try to bind cart', () => {
        component.bindCartToCustomer();

        expect(asmBindCartFacade.bindCart).not.toHaveBeenCalled();
      });
    });
  });
});
