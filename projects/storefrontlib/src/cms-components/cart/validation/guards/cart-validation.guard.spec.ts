import {
  ActiveCartService,
  GlobalMessageService,
  MultiCartService,
  SemanticPathService,
  UserIdService,
  CartValidationService,
} from '@spartacus/core';
import { CartValidationGuard } from '@spartacus/storefront';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import createSpy = jasmine.createSpy;

const cartModification = new BehaviorSubject({});
const mockUserId = 'userTest';
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
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => of(mockUserId);
}
class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = () => of(mockCartId);
}
class MockMultiCartService implements Partial<MultiCartService> {
  loadCart = createSpy().and.stub();
}

describe(`CartValidationGuard`, () => {
  let guard: CartValidationGuard;
  let globalMessageService: GlobalMessageService;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationGuard,
        { provide: CartValidationService, useClass: MockCartValidationService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        { provide: MultiCartService, useClass: MockMultiCartService },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(CartValidationGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    multiCartService = TestBed.inject(MultiCartService);

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
    expect(multiCartService.loadCart).toHaveBeenCalledWith({
      cartId: mockCartId,
      userId: mockUserId,
    });
    expect(result.toString()).toEqual('/cart');
  });
});
