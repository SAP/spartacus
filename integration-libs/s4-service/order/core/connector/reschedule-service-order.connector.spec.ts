import { TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderConnector } from './reschedule-service-order.connector';
import { RescheduleServiceOrderAdapter } from './reschedule-service-order.adapter';
import createSpy = jasmine.createSpy;
import { of, take } from 'rxjs';

class MockRescheduleServiceOrderAdapter
  implements Partial<RescheduleServiceOrderAdapter>
{
  rescheduleServiceOrder = createSpy().and.returnValue(of({}));
}

describe('ReschedleServiceOrderConnectorService', () => {
  let service: RescheduleServiceOrderConnector;
  let rescheduleServiceOrderAdapter: RescheduleServiceOrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RescheduleServiceOrderConnector,
        {
          provide: RescheduleServiceOrderAdapter,
          useClass: MockRescheduleServiceOrderAdapter,
        },
      ],
    });
    service = TestBed.inject(RescheduleServiceOrderConnector);
    rescheduleServiceOrderAdapter = TestBed.inject(
      RescheduleServiceOrderAdapter
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('rescheduleServiceOrder should call rescheduleServiceOrderAdapter', () => {
    service
      .rescheduleServiceOrder('userId', 'code', { scheduledAt: 'dd/mm/yyyy' })
      .pipe(take(1))
      .subscribe();
    expect(
      rescheduleServiceOrderAdapter.rescheduleServiceOrder
    ).toHaveBeenCalledWith('userId', 'code', { scheduledAt: 'dd/mm/yyyy' });
  });
});
