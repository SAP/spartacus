import { TestBed } from '@angular/core/testing';
import {
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable, of } from 'rxjs';
import { AsmCustomer360Adapter } from './asm-customer-360.adapter';
import { AsmCustomer360Connector } from './asm-customer-360.connector';

class MockCustomer360Adapter {
  getCustomer360Data(
    _request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response> {
    const response: AsmCustomer360Response = { value: [] };
    return of(response);
  }
}

describe('AsmCustomer360Connector', () => {
  let service: AsmCustomer360Connector;
  let customer360Adapter: AsmCustomer360Adapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AsmCustomer360Adapter, useClass: MockCustomer360Adapter },
      ],
    });

    service = TestBed.inject(AsmCustomer360Connector);

    customer360Adapter = TestBed.inject(AsmCustomer360Adapter);
    spyOn(customer360Adapter, 'getCustomer360Data').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomer360Data()', () => {
    it('should pass the request to the provided adapter', () => {
      const input: AsmCustomer360Request = {
        options: { userId: '' },
        queries: [],
      };

      service.getCustomer360Data(input).subscribe();

      expect(customer360Adapter.getCustomer360Data).toHaveBeenCalledWith(input);
    });
  });
});
