import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { RequestedDeliveryDateAdapter } from './requested-delivery-date.adapter';
import { RequestedDeliveryDateConnector } from './requested-delivery-date.connector';
import createSpy = jasmine.createSpy;

const mockUserId = 'userId1';
const mockCartId = '00012345';
const mockRequestedDate = '15-09-2023';

class MockRequestedDeliveryDateAdapter
  implements Partial<RequestedDeliveryDateAdapter>
{
  setRequestedDeliveryDate = createSpy(
    'RequestedDeliveryDateAdapter.setRequestedDeliveryDate'
  ).and.callFake((_userId: string, _cartId: string, _date: Date) => of());
}

describe('RequestedDeliveryDateConnector', () => {
  let service: RequestedDeliveryDateConnector;
  let adapter: RequestedDeliveryDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestedDeliveryDateConnector,
        {
          provide: RequestedDeliveryDateAdapter,
          useClass: MockRequestedDeliveryDateAdapter,
        },
      ],
    });

    service = TestBed.inject(RequestedDeliveryDateConnector);
    adapter = TestBed.inject(RequestedDeliveryDateAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setRequestedDeliveryDate should call adapter', () => {
    let result;
    service
      .setRequestedDeliveryDate(mockUserId, mockCartId, mockRequestedDate)
      .pipe(take(1))
      .subscribe((res) => (result = res));
    expect(result).toBeUndefined();
    expect(adapter.setRequestedDeliveryDate).toHaveBeenCalledWith(
      mockUserId,
      mockCartId,
      mockRequestedDate
    );
  });
});
