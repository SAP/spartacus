import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartValidationService } from './cart-validation.service';
import createSpy = jasmine.createSpy;
import { CartValidationConnector } from '../connectors/cart-validation.connector';

const cartValidationResult = { cartModificationList: [] };
class MockCartValidationConnector implements Partial<CartValidationConnector> {
  get = createSpy().and.callFake(() => of(cartValidationResult));
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
      .getCartValidationStatus('cartId', 'current')
      .subscribe((data) => {
        result = data;
      })
      .unsubscribe();

    expect(result).toEqual(cartValidationResult);
  });

  it('should call connector with passed params to validate cart', () => {
    service
      .getCartValidationStatus('cartId', 'current')
      .subscribe()
      .unsubscribe();
    expect(connector.get).toHaveBeenCalledWith('cartId', 'current');
  });
});
