import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  BaseSite,
  BaseSiteService,
  FiscalIdMode,
  UserIdService,
  StateUtils,
} from '@spartacus/core';
import { BehaviorSubject, firstValueFrom, of, Subject, throwError } from 'rxjs';
import { CheckoutFiscalIdConnector } from '../connectors/checkout-fiscal-id/checkout-fiscal-id.connector';
import { CheckoutFiscalIdService } from './checkout-fiscal-id.service';

describe('CheckoutFiscalIdService', () => {
  let service: CheckoutFiscalIdService;
  let site: BehaviorSubject<BaseSite>;
  let activeId: BehaviorSubject<string>;
  let userId: BehaviorSubject<string>;
  let siteId: BehaviorSubject<string>;
  let cart: Cart;
  let entity: BehaviorSubject<
    StateUtils.ProcessesLoaderState<Cart | undefined>
  >;
  let connector: { setFiscalId: ReturnType<typeof vi.fn> };
  let multiCart: {
    isStable: ReturnType<typeof vi.fn>;
    getCartEntity: ReturnType<typeof vi.fn>;
    loadCart: ReturnType<typeof vi.fn>;
  };
  let store: { dispatch: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    cart = { code: 'cart', totalItems: 3 };
    site = new BehaviorSubject<BaseSite>({
      baseStore: {
        sapFiscalIdMode: FiscalIdMode.REQUIRED_STRICT,
        sapFiscalIdRules: [
          { sapCountry: 'PT', sapFiscalIdRuleEntries: [{ sapType: 'NIF' }] },
        ],
      },
    });
    activeId = new BehaviorSubject('cart');
    userId = new BehaviorSubject('current');
    siteId = new BehaviorSubject('electronics');
    entity = new BehaviorSubject<
      StateUtils.ProcessesLoaderState<Cart | undefined>
    >({
      value: cart,
      loading: false,
      error: false,
      success: true,
    });
    connector = { setFiscalId: vi.fn().mockReturnValue(of(undefined)) };
    multiCart = {
      isStable: vi.fn().mockReturnValue(of(true)),
      getCartEntity: vi.fn().mockReturnValue(entity),
      loadCart: vi.fn(() => {
        entity.next({
          value: cart,
          loading: true,
          error: false,
          success: false,
        });
        entity.next({
          value: cart,
          loading: false,
          error: false,
          success: true,
        });
      }),
    };
    store = {
      dispatch: vi.fn((action) => {
        cart = action.payload.cart;
      }),
    };
    TestBed.configureTestingModule({
      providers: [
        CheckoutFiscalIdService,
        {
          provide: BaseSiteService,
          useValue: { get: () => site, getActive: () => siteId },
        },
        {
          provide: UserIdService,
          useValue: { takeUserId: () => userId, getUserId: () => userId },
        },
        {
          provide: ActiveCartFacade,
          useValue: {
            takeActiveCartId: () => activeId,
            getActiveCartId: () => activeId,
            takeActive: () => of(cart),
          },
        },
        { provide: MultiCartFacade, useValue: multiCart },
        { provide: Store, useValue: store },
        { provide: CheckoutFiscalIdConnector, useValue: connector },
      ],
    });
    service = TestBed.inject(CheckoutFiscalIdService);
  });

  it.each([
    [FiscalIdMode.REQUIRED_STRICT, true, true],
    [FiscalIdMode.REQUIRED_UNCHECKED, true, true],
    [FiscalIdMode.OPTIONAL_STRICT, true, false],
    [FiscalIdMode.OPTIONAL_UNCHECKED, true, false],
    [FiscalIdMode.DISABLED, false, false],
    [undefined, false, false],
  ])('reads mode %s', async (mode, enabled, required) => {
    site.next({
      baseStore: {
        sapFiscalIdMode: mode,
        sapFiscalIdRules: [{ sapCountry: 'PT' }],
      },
    });
    expect(await firstValueFrom(service.getConfiguration())).toEqual({
      enabled,
      required,
      sapCountry: 'PT',
      sapType: undefined,
    });
  });

  it('hides an empty rules array', async () => {
    site.next({
      baseStore: {
        sapFiscalIdMode: FiscalIdMode.REQUIRED_STRICT,
        sapFiscalIdRules: [],
      },
    });
    expect((await firstValueFrom(service.getConfiguration())).enabled).toBe(
      false
    );
    await firstValueFrom(service.setFiscalId('123'));
    expect(connector.setFiscalId).not.toHaveBeenCalled();
  });

  it('uses the first country and first type and refreshes before completing', async () => {
    multiCart.loadCart.mockImplementation(() => {
      entity.next({ value: cart, loading: true });
    });
    let completed = false;
    const saved = firstValueFrom(service.setFiscalId('123456789')).then(() => {
      completed = true;
    });
    expect(connector.setFiscalId).toHaveBeenCalledWith('current', 'cart', {
      sapCountry: 'PT',
      sapFiscalIdEntries: [{ sapValue: '123456789', sapType: 'NIF' }],
    });
    expect(completed).toBe(false);
    entity.next({ value: cart, loading: false, success: true });
    await saved;
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('omits an absent type and supports a guest cart GUID', async () => {
    site.next({
      baseStore: {
        sapFiscalIdMode: FiscalIdMode.REQUIRED_UNCHECKED,
        sapFiscalIdRules: [
          { sapCountry: 'PT', sapFiscalIdRuleEntries: [] },
          { sapCountry: 'ES', sapFiscalIdRuleEntries: [{ sapType: 'VAT' }] },
        ],
      },
    });
    userId.next('anonymous');
    activeId.next('guest-guid');
    await firstValueFrom(service.setFiscalId('12345'));
    expect(connector.setFiscalId).toHaveBeenCalledWith(
      'anonymous',
      'guest-guid',
      { sapCountry: 'PT', sapFiscalIdEntries: [{ sapValue: '12345' }] }
    );
  });

  it('skips an unchanged value and preserves an existing optional value on empty input', async () => {
    cart.sapCustomerFiscalId = { sapFiscalIdEntries: [{ sapValue: '12345' }] };
    await firstValueFrom(service.setFiscalId('12345'));
    site.next({
      baseStore: {
        sapFiscalIdMode: FiscalIdMode.OPTIONAL_STRICT,
        sapFiscalIdRules: [{ sapCountry: 'PT' }],
      },
    });
    await firstValueFrom(service.setFiscalId(''));
    expect(connector.setFiscalId).not.toHaveBeenCalled();
    expect(cart.sapCustomerFiscalId.sapFiscalIdEntries?.[0].sapValue).toBe(
      '12345'
    );
  });

  it('rejects empty required input', async () => {
    await expect(firstValueFrom(service.setFiscalId(''))).rejects.toThrow();
    expect(connector.setFiscalId).not.toHaveBeenCalled();
  });

  it('keeps the input out of Cart after a failed PUT', async () => {
    connector.setFiscalId.mockReturnValue(throwError(() => ({ status: 400 })));
    await expect(firstValueFrom(service.setFiscalId('12345'))).rejects.toEqual({
      status: 400,
    });
    expect(multiCart.loadCart).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('merges the successfully submitted value into the latest Cart after reload failure', async () => {
    multiCart.loadCart.mockImplementation(() => {
      entity.next({ value: cart, loading: true });
      entity.next({
        value: { ...cart, totalItems: 8 },
        loading: false,
        error: true,
      });
    });
    await firstValueFrom(service.setFiscalId('12345'));
    expect(store.dispatch).toHaveBeenCalledWith(
      new CartActions.SetCartData({
        cartId: 'cart',
        cart: {
          code: 'cart',
          totalItems: 8,
          sapCustomerFiscalId: {
            sapCountry: 'PT',
            sapFiscalIdEntries: [{ sapValue: '12345', sapType: 'NIF' }],
          },
        },
      })
    );
    await firstValueFrom(service.setFiscalId('12345'));
    expect(connector.setFiscalId).toHaveBeenCalledTimes(1);
  });

  it('does not restore an invalidated cart', async () => {
    multiCart.loadCart.mockImplementation(() => {
      entity.next({ value: cart, loading: true });
      entity.next({ value: undefined, loading: false });
    });
    await expect(firstValueFrom(service.setFiscalId('12345'))).rejects.toThrow(
      'no longer available'
    );
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it.each(['cart', 'user', 'site'])(
    'cancels a pending request when %s changes',
    async (context) => {
      const request = new Subject<void>();
      connector.setFiscalId.mockReturnValue(request);
      const result = firstValueFrom(service.setFiscalId('12345'));
      if (context === 'cart') {
        activeId.next('another-cart');
      }
      if (context === 'user') {
        userId.next('anonymous');
      }
      if (context === 'site') {
        siteId.next('another-site');
      }
      await expect(result).rejects.toThrow('context changed');
      request.next();
      expect(multiCart.loadCart).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    }
  );
});
