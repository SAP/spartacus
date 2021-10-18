import { TestBed } from '@angular/core/testing';
import { ActiveCartService, UserIdService } from '@spartacus/core';
import { of } from 'rxjs';
import { CartValidationConnector } from '../connectors/validation/cart-validation.connector';
import { CartValidationService } from './cart-validation.service';
import createSpy = jasmine.createSpy;

const cartValidationResult = { cartModificationList: [] };
class MockCartValidationConnector implements Partial<CartValidationConnector> {
  validate = createSpy().and.callFake(() => of(cartValidationResult));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of('userId');
  }
}

class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId() {
    return of('current');
  }
  isStable() {
    return of(true);
  }
}

describe('CartValidationService', () => {
  let service: CartValidationService;
  let connector: CartValidationConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationService,
        {
          provide: CartValidationConnector,
          useClass: MockCartValidationConnector,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    });

    service = TestBed.inject(CartValidationService);
    connector = TestBed.inject(CartValidationConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute command for cart validation and return results', () => {
    let result;
    service
      .validateCart()
      .subscribe((data) => {
        result = data;
      })
      .unsubscribe();

    expect(result).toEqual(cartValidationResult);
  });

  it('should call connector with passed params to validate cart', () => {
    service.validateCart();
    expect(connector.validate).toHaveBeenCalled();
  });
});
