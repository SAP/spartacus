import { CartValidationGuard } from '@spartacus/cart/validation/components';
import { GlobalMessageService, SemanticPathService } from '@spartacus/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartValidationFacade } from '@spartacus/cart/validation/root';
import { BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

const cartModification = new BehaviorSubject({});

class MockCartValidationFacade implements Partial<CartValidationFacade> {
  getCartModificationList() {
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

describe(`CartValidationGuard`, () => {
  let guard: CartValidationGuard;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationGuard,
        { provide: CartValidationFacade, useClass: MockCartValidationFacade },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CartValidationGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);

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
    expect(result.toString()).toEqual('/cart');
  });
});
