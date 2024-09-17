import { TestBed } from '@angular/core/testing';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import { CxEvent, EventService, LoginEvent } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { OpfMetadataStoreService } from '../services';
import { OpfEventListenerService } from './opf-event.listener';

import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockOpfMetadataStoreService implements Partial<OpfMetadataStoreService> {
  clearOpfMetadata = createSpy();
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
}

describe(`OpfEventListenerService`, () => {
  let opfMetadataStoreService: OpfMetadataStoreService;
  let service: OpfEventListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfEventListenerService,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: OpfMetadataStoreService,
          useClass: MockOpfMetadataStoreService,
        },
      ],
    });

    service = TestBed.inject(OpfEventListenerService);
    opfMetadataStoreService = TestBed.inject(OpfMetadataStoreService);
  });

  describe(`onOpfPaymentMetadataResetConditionsMet`, () => {
    it(`LoginEvent should call clearOpfMetadata() method`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(opfMetadataStoreService.clearOpfMetadata).toHaveBeenCalled();
    });

    it(`OrderPlacedEvent should call clearOpfMetadata() method`, () => {
      mockEventStream$.next(new OrderPlacedEvent());

      expect(opfMetadataStoreService.clearOpfMetadata).toHaveBeenCalled();
    });

    it(`CreateCartEvent should call clearOpfMetadata() method`, () => {
      mockEventStream$.next(new CreateCartEvent());

      expect(opfMetadataStoreService.clearOpfMetadata).toHaveBeenCalled();
    });

    it('should unsubscribe from subscriptions on destroy', () => {
      spyOn(service['subscriptions'], 'unsubscribe');

      service.ngOnDestroy();

      expect(service['subscriptions'].unsubscribe).toHaveBeenCalled();
    });
  });
});
