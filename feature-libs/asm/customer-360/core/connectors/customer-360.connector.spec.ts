import { TestBed } from '@angular/core/testing';
import {
  Customer360Request,
  Customer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable, of } from 'rxjs';
import { Customer360Adapter } from './customer-360.adapter';
import { Customer360Connector } from './customer-360.connector';

class MockCustomer360Adapter {
  getCustomer360Data(
    _request: Customer360Request
  ): Observable<Customer360Response> {
    const response: Customer360Response = { value: [] };
    return of(response);
  }
}

describe('Customer360Connector', () => {
  let service: Customer360Connector;
  let customer360Adapter: Customer360Adapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Customer360Adapter, useClass: MockCustomer360Adapter },
      ],
    });

    service = TestBed.inject(Customer360Connector);

    customer360Adapter = TestBed.inject(Customer360Adapter);
    spyOn(customer360Adapter, 'getCustomer360Data').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomer360Data()', () => {
    it('should pass the request to the provided adapter', () => {
      const input: Customer360Request = {
        options: { userId: '' },
        queries: [],
      };

      service.getCustomer360Data(input).subscribe();

      expect(customer360Adapter.getCustomer360Data).toHaveBeenCalledWith(input);
    });
  });
});
