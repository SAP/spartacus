import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartValidationService } from './cart-validation.service';
import createSpy = jasmine.createSpy;
import { CartValidationConnector } from '../connectors/cart-validation.connector';
import {
  ActiveCartService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';

const cartValidationResult = { cartModificationList: [] };
class MockCartValidationConnector implements Partial<CartValidationConnector> {
  get = createSpy().and.callFake(() => of(cartValidationResult));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(OCC_USER_ID_CURRENT));
}

class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = createSpy().and.returnValue(of('cartId'));
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
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
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
      .getCartModificationList()
      .subscribe((data) => {
        result = data;
      })
      .unsubscribe();

    expect(result).toEqual(cartValidationResult);
  });

  it('should call connector with passed params to validate cart', () => {
    service.getCartModificationList().subscribe().unsubscribe();
    expect(connector.get).toHaveBeenCalledWith('cartId', 'current');
  });
});
