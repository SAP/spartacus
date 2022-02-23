import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UnnamedAdapter } from './unnamed.adapter';
import { UnnamedConnector } from './unnamed.connector';

import createSpy = jasmine.createSpy;

class MockOrderAdapter implements Partial<UnnamedAdapter> {
  placeOrder = createSpy('UnnamedAdapter.placeOrder').and.callFake(
    (userId: string, cartId: string, termsChecked: boolean) =>
      of(`placedOrder-${userId}-${cartId}-${termsChecked}`)
  );
  getUnnamedDetails = createSpy(
    'UnnamedAdapter.loadUnnamedDetails'
  ).and.callFake((userId: string, cartId: string) =>
    of(`loadUnnamedDetails-${userId}-${cartId}`)
  );
}

describe('UnnamedConnector', () => {
  let service: UnnamedConnector;
  let adapter: UnnamedAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnnamedConnector,
        { provide: UnnamedAdapter, useClass: MockOrderAdapter },
      ],
    });

    service = TestBed.inject(UnnamedConnector);
    adapter = TestBed.inject(UnnamedAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('placeOrder should call adapter', () => {
    let result;
    service
      .placeOrder('user1', 'cart1', true)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBe('placedOrder-user1-cart1-true');
    expect(adapter.placeOrder).toHaveBeenCalledWith('user1', 'cart1', true);
  });
});
