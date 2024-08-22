import { TestBed } from '@angular/core/testing';
import { CancelServiceOrderService } from './cancel-service-order.service';
import { CancelServiceOrderConnector } from '../connector';
import { CancellationDetails } from '@spartacus/s4-service/root';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { UserIdService } from '@spartacus/core';
import { of, throwError } from 'rxjs';

describe('CancelServiceOrderService', () => {
  let service: CancelServiceOrderService;
  let connector: jasmine.SpyObj<CancelServiceOrderConnector>;
  let orderHistoryFacade: jasmine.SpyObj<OrderHistoryFacade>;
  let userIdService: jasmine.SpyObj<UserIdService>;

  beforeEach(() => {
    const connectorSpy = jasmine.createSpyObj('CancelServiceOrderConnector', [
      'cancelServiceOrder',
    ]);
    const orderHistoryFacadeSpy = jasmine.createSpyObj('OrderHistoryFacade', [
      'getOrderDetails',
    ]);
    const userIdServiceSpy = jasmine.createSpyObj('UserIdService', [
      'takeUserId',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CancelServiceOrderService,
        { provide: CancelServiceOrderConnector, useValue: connectorSpy },
        { provide: OrderHistoryFacade, useValue: orderHistoryFacadeSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
      ],
    });

    service = TestBed.inject(CancelServiceOrderService);
    connector = TestBed.inject(
      CancelServiceOrderConnector
    ) as jasmine.SpyObj<CancelServiceOrderConnector>;
    orderHistoryFacade = TestBed.inject(
      OrderHistoryFacade
    ) as jasmine.SpyObj<OrderHistoryFacade>;
    userIdService = TestBed.inject(
      UserIdService
    ) as jasmine.SpyObj<UserIdService>;
  });

  describe('cancelService', () => {
    it('should call cancelServiceOrder on the connector with the correct parameters', (done) => {
      const orderCode = 'order123';
      const cancellationDetails: CancellationDetails = {
        cancellationRequestEntryInputs: [],
      };
      const userId = 'user123';
      const expectedResponse = of({ success: true });

      userIdService.takeUserId.and.returnValue(of(userId));
      connector.cancelServiceOrder.and.returnValue(expectedResponse);

      service.cancelService(orderCode, cancellationDetails).subscribe({
        next: (response) => {
          expect(userIdService.takeUserId).toHaveBeenCalled();
          expect(connector.cancelServiceOrder).toHaveBeenCalledWith(
            userId,
            orderCode,
            cancellationDetails
          );
          expect(response).toEqual({ success: true });
          done();
        },
        error: (err) => {
          fail('Expected success, but got an error: ' + err);
        },
      });
    });

    it('should handle errors from cancelServiceOrderConnector', (done) => {
      const orderCode = 'order123';
      const cancellationDetails: CancellationDetails = {
        cancellationRequestEntryInputs: [],
      };
      const userId = 'user123';
      const errorResponse = throwError(() => new Error('Some error'));

      userIdService.takeUserId.and.returnValue(of(userId));
      connector.cancelServiceOrder.and.returnValue(errorResponse);
      service.cancelService(orderCode, cancellationDetails).subscribe({
        next: () => {
          fail('Expected an error, but got a result');
        },
        error: (error) => {
          expect(error).toEqual(new Error('Some error'));
          done();
        },
      });
    });
  });

  describe('loadOrderDetails', () => {
    it('should call getOrderDetails on the OrderHistoryFacade and return the result', () => {
      const expectedOrderDetails = of({});
      orderHistoryFacade.getOrderDetails.and.returnValue(expectedOrderDetails);

      const result = service.loadOrderDetails();
      expect(orderHistoryFacade.getOrderDetails).toHaveBeenCalled();
      result.subscribe({
        next: (details) => {
          expect(details).toEqual({});
        },
      });
    });
  });
});
