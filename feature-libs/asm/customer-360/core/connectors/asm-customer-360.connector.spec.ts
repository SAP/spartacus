import { TestBed } from '@angular/core/testing';
import {
  AsmCustomer360Request,
  AsmCustomer360Response,
} from '@spartacus/asm/customer-360/root';
import { Observable, of } from 'rxjs';
import { AsmCustomer360Adapter } from './asm-customer-360.adapter';
import { AsmCustomer360Connector } from './asm-customer-360.connector';

class MockAsmCustomer360Adapter {
  getAsmCustomer360Data(
    _request: AsmCustomer360Request
  ): Observable<AsmCustomer360Response> {
    const response: AsmCustomer360Response = { value: [] };
    return of(response);
  }
}

describe('AsmCustomer360Connector', () => {
  let service: AsmCustomer360Connector;
  let asmCustomer360Adapter: AsmCustomer360Adapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AsmCustomer360Adapter, useClass: MockAsmCustomer360Adapter },
      ],
    });

    service = TestBed.inject(AsmCustomer360Connector);

    asmCustomer360Adapter = TestBed.inject(AsmCustomer360Adapter);
    spyOn(asmCustomer360Adapter, 'getAsmCustomer360Data').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAsmCustomer360Data()', () => {
    it('should pass the request to the provided adapter', () => {
      const input: AsmCustomer360Request = {
        options: { userId: '' },
        queries: [],
      };

      service.getAsmCustomer360Data(input).subscribe();

      expect(asmCustomer360Adapter.getAsmCustomer360Data).toHaveBeenCalledWith(
        input
      );
    });
  });
});
