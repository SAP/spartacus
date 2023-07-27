import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { OpfOrderAdapter } from './opf-order.adapter';
import { OpfOrderConnector } from './opf-order.connector';

class MockOpfOrderAdapter implements OpfOrderAdapter {
  placeOpfOrder = createSpy('placeOpfOrder').and.callFake((userId, cartId, termsChecked) =>
    of(`load-${userId}-${cartId}-${termsChecked}`)
  );
}

describe('OpfOrderConnector', () => {
  let service: OpfOrderConnector;
  let adapter: OpfOrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfOrderConnector,
        { provide: OpfOrderAdapter, useClass: MockOpfOrderAdapter },
      ],
    });

    service = TestBed.inject(OpfOrderConnector);
    adapter = TestBed.inject(OpfOrderAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate should call adapter', () => {
    let result;
    service.placeOpfOrder('user1', 'cart1', true).subscribe((res) => (result = res));
    expect(result).toEqual('load-user1-cart1-true');
    expect(adapter.placeOpfOrder).toHaveBeenCalledWith('user1', 'cart1', true);
  });
});
