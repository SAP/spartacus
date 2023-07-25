import { TestBed } from '@angular/core/testing';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import { CxEvent, EventService, LoginEvent } from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subject } from 'rxjs';
import { OpfService } from '../services';
import { OpfEventListenerService } from './opf-event.listener';

import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockOpfService implements Partial<OpfService> {
  clearOpfMetadataState = createSpy();
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
}

describe(`OpfEventListenerService`, () => {
  let opfService: OpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfEventListenerService,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: OpfService,
          useClass: MockOpfService,
        },
      ],
    });

    TestBed.inject(OpfEventListenerService);
    opfService = TestBed.inject(OpfService);
  });

  describe(`onOpfPaymentMetadataResetConditionsMet`, () => {
    it(`LoginEvent should call clearOpfMetadataState() method`, () => {
      mockEventStream$.next(new LoginEvent());

      expect(opfService.clearOpfMetadataState).toHaveBeenCalled();
    });

    it(`OrderPlacedEvent should call clearOpfMetadataState() method`, () => {
      mockEventStream$.next(new OrderPlacedEvent());

      expect(opfService.clearOpfMetadataState).toHaveBeenCalled();
    });

    it(`CreateCartEvent should call clearOpfMetadataState() method`, () => {
      mockEventStream$.next(new CreateCartEvent());

      expect(opfService.clearOpfMetadataState).toHaveBeenCalled();
    });
  });
});
