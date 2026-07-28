import {
  Component,
  Injectable,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsmBindCartFacade, CsAgentAuthService } from '@spartacus/asm/root';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  AuthService,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OCC_CART_ID_CURRENT,
  RoutingService,
  Translatable,
  TranslatePipe,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ProcessesLoaderState } from 'core-libs/core/src/state/utils/processes-loader';
import {
  BehaviorSubject,
  EMPTY,
  NEVER,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { SAVE_CART_DIALOG_ACTION } from '../asm-save-cart-dialog/asm-save-cart-dialog.component';
import { DotSpinnerComponent } from '../dot-spinner/dot-spinner.component';
import { AsmComponentService } from '../services/asm-component.service';
import { AsmBindCartComponent } from './asm-bind-cart.component';

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [FormsModule, ReactiveFormsModule],
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

class MockCsAgentAuthService implements Partial<CsAgentAuthService> {
  authorizeCustomerSupportAgent(): Promise<void> {
    return Promise.resolve();
  }
  isCustomerSupportAgentLoggedIn(): Observable<boolean> {
    return of(false);
  }
  getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    return of(false);
  }
  startCustomerEmulationSession(_customerId: string) {}
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActiveCartId(): Observable<string> {
    return EMPTY;
  }

  getActive(): Observable<Cart> {
    return of({});
  }
}

@Pipe({ name: 'cxTranslate' })
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
  loadCart = vi.fn();
  getCartEntity(): Observable<ProcessesLoaderState<Cart | undefined>> {
    return EMPTY;
  }
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
  getSaveCartProcessSuccess(): Observable<boolean> {
    return EMPTY;
  }
  getSaveCartProcessError(): Observable<boolean> {
    return EMPTY;
  }
}
@Injectable()
class MockAsmComponentService extends AsmComponentService {
  logoutCustomerSupportAgentAndCustomer(): void {}
  unload() {}
  isCustomerEmulationSessionInProgress() {
    return of(false);
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
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
  let asmComponentService: AsmComponentService;
  let routingService: RoutingService;

  const inactiveCartId = '00000002';
  const prevActiveCartId = '00001122';
  const prevActiveCart: Cart = {
    code: prevActiveCartId,
    deliveryItemsQuantity: 1,
  };
  const testCartId = '00001234';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AsmBindCartComponent,
        DotSpinnerComponent,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: CsAgentAuthService, useClass: MockCsAgentAuthService },
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: AsmBindCartFacade, useClass: MockAsmBindCartFacade },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: AsmComponentService, useClass: MockAsmComponentService },
      ],
    })
      .overrideComponent(AsmBindCartComponent, {
        remove: {
          imports: [TranslatePipe, IconComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockCxIconComponent],
        },
      })
      .compileComponents();
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
    asmComponentService = TestBed.inject(AsmComponentService);
    routingService = TestBed.inject(RoutingService);

    vi.spyOn(asmBindCartFacade, 'bindCart').mockReturnValue(of(undefined));
    vi.spyOn(multiCartFacade, 'reloadCart').mockImplementation(() => {});
    vi.spyOn(activeCartFacade, 'getActiveCartId').mockReturnValue(
      of(prevActiveCartId)
    );
    vi.spyOn(asmComponentService, 'setShowDeeplinkCartInfoAlert').mockImplementation(() => {});
    vi.spyOn(routingService, 'go');
    vi.spyOn(activeCartFacade, 'getActive').mockReturnValue(of(prevActiveCart));
    vi.spyOn(globalMessageService, 'add');
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');
    vi.spyOn(savedCartFacade, 'saveCart');
  });

  it('should leave the cart field blank when there is no current active cart for the customer', () => {
    (activeCartFacade.getActiveCartId as any).mockReturnValue(of(''));

    fixture.detectChanges();

    expect(component.cartId.value).toEqual('');
  });

  describe('assign cart to customer', () => {
    beforeEach(() => {
      fixture.detectChanges();

      component.cartId.setValue(testCartId);
    });

    it('should bind cart without saving the active cart when active cart is empty', () => {
      const emptyCart: Cart = { ...prevActiveCart, deliveryItemsQuantity: 0 };
      (activeCartFacade.getActive as any).mockReturnValue(
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
        expect.anything()
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
        (asmBindCartFacade.bindCart as any).mockReturnValue(
          throwError(() => ({
            details: [{ message: expectedErrorMessage }],
          }))
        );

        component.bindCartToCustomer();

        expect(globalMessageService.add).toHaveBeenCalledWith(
          expectedErrorMessage,
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });

      it('should not bind cart while loading a previous request', () => {
        (asmBindCartFacade.bindCart as any).mockReturnValue(NEVER);

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

  describe('subscribe deeplink cart id', () => {
    beforeEach(() => {
      vi.spyOn(component.displayBindCartBtn$, 'next').mockImplementation(() => {});
      vi.spyOn(component.displaySaveCartBtn$, 'next').mockImplementation(() => {});
      vi.spyOn(asmComponentService, 'isEmulatedByDeepLink').mockReturnValue(
        new BehaviorSubject(true)
      );
    });

    it('should subscribe deeplink inactive cart', () => {
      vi.spyOn(asmComponentService, 'getSearchParameter').mockReturnValue(
        'inactive'
      );

      component.ngOnInit();

      expect(
        asmComponentService.setShowDeeplinkCartInfoAlert
      ).toHaveBeenCalledWith(true);
      expect(component.displayBindCartBtn$.next).toHaveBeenCalledWith(false);
      expect(component.displaySaveCartBtn$.next).toHaveBeenCalledWith(true);
    });

    it('should subscribe deeplink active cart', () => {
      vi.spyOn(asmComponentService, 'getSearchParameter').mockReturnValue(
        'active'
      );
      vi.spyOn(asmComponentService, 'getDeepLinkUrlParams').mockReturnValue({
        cartType: 'active',
        customerId: '123',
      });
      component.ngOnInit();

      expect(component.displayBindCartBtn$.next).toHaveBeenCalledWith(false);
      expect(component.displaySaveCartBtn$.next).toHaveBeenCalledWith(false);
      expect(routingService.go).toHaveBeenCalled();
    });
  });

  describe('save inactive cart id as deeplink', () => {
    beforeEach(() => {
      fixture.detectChanges();
      component.deepLinkCartId = inactiveCartId;
      vi.spyOn(asmComponentService, 'getSearchParameter').mockReturnValue('anyId');
      vi.spyOn(multiCartFacade, 'getCartEntity').mockReturnValue(
        of({
          loading: false,
          success: true,
          value: {
            code: inactiveCartId,
          },
        })
      );
    });

    it('should close inactive cart info alert', () => {
      component.onSaveInactiveCart();
      expect(
        asmComponentService.setShowDeeplinkCartInfoAlert
      ).toHaveBeenCalledWith(false);
    });

    it('should open the save inactive cart dialog', () => {
      component.onSaveInactiveCart();

      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
        LAUNCH_CALLER.ASM_SAVE_CART,
        undefined,
        expect.anything()
      );
    });

    describe('save inactive cart', () => {
      beforeEach(() => {
        (
          (<unknown>launchDialogService) as MockLaunchDialogService
        ).dialogClose = of(SAVE_CART_DIALOG_ACTION.SAVE);
      });

      it('should navigate to saved cart detail page after save cart successed', () => {
        vi.spyOn(savedCartFacade, 'getSaveCartProcessSuccess').mockReturnValue(
          of(true)
        );
        vi.spyOn(component.displayBindCartBtn$, 'next').mockImplementation(() => {});
        vi.spyOn(component.displaySaveCartBtn$, 'next').mockImplementation(() => {});

        component.onSaveInactiveCart();
        expect(routingService.go).toHaveBeenCalled();
        expect(component.displaySaveCartBtn$.next).toHaveBeenCalledWith(false);
      });

      it('should not navigate to saved cart detail page after save cart failed', () => {
        vi.spyOn(savedCartFacade, 'getSaveCartProcessError').mockReturnValue(
          of(true)
        );
        vi.spyOn(component.displaySaveCartBtn$, 'next').mockImplementation(() => {});
        component.onSaveInactiveCart();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(component.displaySaveCartBtn$.next).not.toHaveBeenCalledWith(
          false
        );
      });
    });
  });
});
