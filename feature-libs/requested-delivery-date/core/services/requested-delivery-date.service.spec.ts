import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestedDeliveryDateConnector } from '../connectors/requested-delivery-date.connector';
import { RequestedDeliveryDateService } from './requested-delivery-date.service';

import createSpy = jasmine.createSpy;

const mockUserId = 'userId1';
const mockCartId = '00012345';
const mockRequestedDate = '15-09-2023';

class MockRequestedDeliveryDateConnector
  implements Partial<RequestedDeliveryDateConnector>
{
  setRequestedDeliveryDate = createSpy().and.callFake(() => of());
}

describe('RequestedDeliveryDateService', () => {
  let service: RequestedDeliveryDateService;
  let connector: RequestedDeliveryDateConnector;

  describe('Current user', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RequestedDeliveryDateService,
          {
            provide: RequestedDeliveryDateConnector,
            useClass: MockRequestedDeliveryDateConnector,
          },
        ],
      });

      service = TestBed.inject(RequestedDeliveryDateService);
      connector = TestBed.inject(RequestedDeliveryDateConnector);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should set requested delivery date', () => {
      let result;
      service
        .setRequestedDeliveryDate(mockUserId, mockCartId, mockRequestedDate)
        .subscribe((data) => {
          result = data;
        })
        .unsubscribe();
      expect(result).toBeUndefined();
    });

    it('should call connector', () => {
      service
        .setRequestedDeliveryDate(mockUserId, mockCartId, mockRequestedDate)
        .subscribe(() => {})
        .unsubscribe();
      expect(connector.setRequestedDeliveryDate).toHaveBeenCalled();
    });
  });
});
