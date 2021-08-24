import {
  ActiveCartService,
  GlobalMessageService,
  SemanticPathService,
  CartValidationService,
  RoutingService,
  CartModification,
} from '@spartacus/core';
import { CartValidationGuard } from '@spartacus/storefront';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of, Subject } from 'rxjs';
import createSpy = jasmine.createSpy;
import { CartValidationWarningsStateService } from '../cart-validation-warnings-state.service';

const cartModification = new BehaviorSubject({});
const mockCartId = 'cartTest';

class MockCartValidationService implements Partial<CartValidationService> {
  getCartValidationStatus() {
    return cartModification.asObservable();
  }
}
class MockSemanticPathService implements Partial<SemanticPathService> {
  get() {
    return '/cart';
  }
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.stub();
}
class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = () => of(mockCartId);
  reloadActiveCart = createSpy().and.stub();
}
class MockCartValidationWarningsStateService {
  cartValidationResult$ = new Subject<CartModification[]>();
  checkForValidationResultClear$ = of();
}

class MockRoutingService {
  getRouterState() {
    return of();
  }
}

describe(`CartValidationGuard`, () => {
  let guard: CartValidationGuard;
  let globalMessageService: GlobalMessageService;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationGuard,
        { provide: CartValidationService, useClass: MockCartValidationService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: CartValidationWarningsStateService,
          useClass: MockCartValidationWarningsStateService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CartValidationGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    activeCartService = TestBed.inject(ActiveCartService);

    cartModification.next({ cartModifications: [] });
  });

  it('should return true if cart modification list is empty / cart is valid', () => {
    let result;
    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(true);
  });

  it('should return cart route and call global message if cart got modified', () => {
    let result;
    cartModification.next({ cartModifications: [{ status: 'noStock' }] });

    guard
      .canActivate()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(globalMessageService.add).toHaveBeenCalled();
    expect(activeCartService.reloadActiveCart).toHaveBeenCalled();
    expect(result.toString()).toEqual('/cart');
  });
});
