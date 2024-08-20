import { TestBed } from '@angular/core/testing';

import { RescheduleServiceOrderService } from './reschedule-service-order.service';
import { RescheduleServiceOrderConnector } from '../connector';
import { of, take } from 'rxjs';
import { OCC_USER_ID_CURRENT, UserIdService } from '@spartacus/core';
import { ServiceDateTime } from '@spartacus/s4-service/root';
import createSpy = jasmine.createSpy;

const mockDateTime: ServiceDateTime = `2222-90-89T67:89:00-04:00`;
const mockUserId = OCC_USER_ID_CURRENT;
const mockOrderCode = '12345';

class MockRescheduleServiceOrderConnector
  implements Partial<RescheduleServiceOrderConnector>
{
  rescheduleServiceOrder = createSpy().and.returnValue(of('service-details'));
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId = createSpy().and.returnValue(of(mockUserId));
}

describe('RescheduleServiceOrderService', () => {
  let service: RescheduleServiceOrderService;
  let rescheduleServiceOrderConnector: RescheduleServiceOrderConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RescheduleServiceOrderService,
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: RescheduleServiceOrderConnector,
          useClass: MockRescheduleServiceOrderConnector,
        },
      ],
    });
    service = TestBed.inject(RescheduleServiceOrderService);
    rescheduleServiceOrderConnector = TestBed.inject(
      RescheduleServiceOrderConnector
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should call rescheduleServiceOrderConnector.rescheduleServiceOrder`, (done) => {
    service
      .rescheduleService(mockOrderCode, mockDateTime)
      .pipe(take(1))
      .subscribe(() => {
        expect(
          rescheduleServiceOrderConnector.rescheduleServiceOrder
        ).toHaveBeenCalledWith(mockUserId, mockOrderCode, {
          scheduledAt: mockDateTime,
        });
        done();
      });
  });
});
