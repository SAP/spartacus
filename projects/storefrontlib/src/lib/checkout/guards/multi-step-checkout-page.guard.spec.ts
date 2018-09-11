import { TestBed } from '@angular/core/testing';

import { MultiStepCheckoutPageGuard } from './multi-step-checkout-page.guard';
import { Store } from '@ngrx/store';
import * as fromStore from './../../cart/store';
import { CartService } from '../../cart/services';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const mockRouter = { navigate: () => {} };
const mockCartService = {
  isCartCreated: () => {},
  isCartEmpty: () => {}
};
const MAIN_PAGE_ROUTE = [''];

export class MockStore<T> extends BehaviorSubject<T> {
  constructor(private initialState: T) {
    super(initialState);
  }
  select = () => this;
}

describe('MultiStepCheckoutPageGuard', () => {
  let multiStepCheckoutPageGuard: MultiStepCheckoutPageGuard;
  let cartService: CartService;
  let router;
  let store: Store<fromStore.CartState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MultiStepCheckoutPageGuard,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: CartService,
          useValue: mockCartService
        },
        {
          provide: Store,
          useValue: new MockStore({})
        }
      ],
      imports: [RouterTestingModule]
    });
    store = TestBed.get(Store);
    cartService = TestBed.get(CartService);
    multiStepCheckoutPageGuard = TestBed.get(MultiStepCheckoutPageGuard);
    router = TestBed.get(Router);
  });

  describe('canActivate:', () => {
    let canActivate$;

    beforeEach(() => {
      spyOn(router, 'navigate');
      canActivate$ = multiStepCheckoutPageGuard.canActivate();
    });

    describe('when cart is created', () => {
      beforeEach(() => {
        spyOn(cartService, 'isCartCreated').and.returnValue(true);
      });

      describe('and when cart is empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(true);
        });

        it('then Router should navigate to main page', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).toHaveBeenCalledWith(MAIN_PAGE_ROUTE);
        });

        it('then returned observable should emit false', () => {
          canActivate$
            .subscribe(result => {
              expect(result).toBe(false);
            })
            .unsubscribe();
        });
      });

      describe('and when cart is NOT empty', () => {
        beforeEach(() => {
          spyOn(cartService, 'isCartEmpty').and.returnValue(false);
        });

        it('then returned observable should emit true', () => {
          canActivate$
            .subscribe(result => {
              expect(result).toBe(true);
            })
            .unsubscribe();
        });

        it('then Router should NOT navigate anywhere else', () => {
          canActivate$.subscribe().unsubscribe();
          expect(router.navigate).not.toHaveBeenCalled();
        });
      });
    });
    describe('when cart is NOT created', () => {
      beforeEach(() => {
        spyOn(cartService, 'isCartCreated').and.returnValue(false);
      });

      it('then returned observable should emit false', () => {
        canActivate$
          .subscribe(result => {
            expect(result).toBe(false);
          })
          .unsubscribe();
      });

      it('then Router should NOT navigate anywhere else', () => {
        canActivate$.subscribe().unsubscribe();
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });
  });
});
