import { TestBed } from '@angular/core/testing';
import { CancelServiceOrderConnector } from './cancel-service-order.connector';
import { CancelServiceOrderAdapter } from './cancel-service-order.adapter';
import { of, throwError } from 'rxjs';
import { CancellationDetails } from '@spartacus/s4-service/root';

describe('CancelServiceOrderConnector', () => {
  let connector: CancelServiceOrderConnector;
  let adapter: jasmine.SpyObj<CancelServiceOrderAdapter>;

  beforeEach(() => {
    const adapterSpy = jasmine.createSpyObj('CancelServiceOrderAdapter', [
      'cancelServiceOrder',
    ]);
    TestBed.configureTestingModule({
      providers: [
        CancelServiceOrderConnector,
        { provide: CancelServiceOrderAdapter, useValue: adapterSpy },
      ],
    });

    connector = TestBed.inject(CancelServiceOrderConnector);
    adapter = TestBed.inject(
      CancelServiceOrderAdapter
    ) as jasmine.SpyObj<CancelServiceOrderAdapter>;
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('cancelServiceOrder', () => {
    it('should call cancelServiceOrder on the adapter and return the result', () => {
      const userId = 'user123';
      const code = 'codeABC';

      const cancellationDetails: CancellationDetails = {
        cancellationRequestEntryInputs: [],
      };
      const expectedResponse = of({ success: true });
      adapter.cancelServiceOrder.and.returnValue(expectedResponse);
      const result = connector.cancelServiceOrder(
        userId,
        code,
        cancellationDetails
      );
      expect(adapter.cancelServiceOrder).toHaveBeenCalledWith(
        userId,
        code,
        cancellationDetails
      );
      expect(result).toBe(expectedResponse);
    });

    it('should handle errors from the adapter', () => {
      const userId = 'user123';
      const code = 'codeABC';
      const cancellationDetails: CancellationDetails = {
        cancellationRequestEntryInputs: [],
      };
      const errorResponse = throwError(() => new Error('Some error'));
      adapter.cancelServiceOrder.and.returnValue(errorResponse);
      connector
        .cancelServiceOrder(userId, code, cancellationDetails)
        .subscribe({
          error: (error) => {
            expect(error).toEqual(new Error('Some error'));
          },
        });
    });
  });
});
