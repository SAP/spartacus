import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartAccessCodeAdapter } from './cart-access-code.adapter';
import { CartAccessCodeConnector } from './cart-access-code.connector';
import createSpy = jasmine.createSpy;

class MockCartAccessCodeAdapter implements CartAccessCodeAdapter {
  getCartAccessCode = createSpy().and.returnValue(of({}));
}

describe('CartAccessCodeConnector', () => {
  let service: CartAccessCodeConnector;
  let adapter: CartAccessCodeAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartAccessCodeConnector,
        {
          provide: CartAccessCodeAdapter,
          useClass: MockCartAccessCodeAdapter,
        },
      ],
    });

    service = TestBed.inject(CartAccessCodeConnector);
    adapter = TestBed.inject(CartAccessCodeAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter', () => {
    service.getCartAccessCode('user1', 'cart1').pipe(take(1)).subscribe();
    expect(adapter.getCartAccessCode).toHaveBeenCalledWith('user1', 'cart1');
  });
});
