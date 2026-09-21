import { TestBed } from '@angular/core/testing';
import { CancelServiceOrderService } from './cancel-service-order.service';
import { CancelServiceOrderConnector } from '../connector';
import { CancellationDetails } from '@spartacus/s4-service/root';
import { OrderHistoryFacade } from '@spartacus/order/root';
import { UserIdService } from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('CancelServiceOrderService', () => {
  let service: CancelServiceOrderService;
  let connector: any;
  let orderHistoryFacade: any;
  let userIdService: any;

  beforeEach(() => {
    const connectorSpy = { cancelServiceOrder: vi.fn() };
    const orderHistoryFacadeSpy = { getOrderDetails: vi.fn() };
    const userIdServiceSpy = { takeUserId: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        CancelServiceOrderService,
        { provide: CancelServiceOrderConnector, useValue: connectorSpy },
        { provide: OrderHistoryFacade, useValue: orderHistoryFacadeSpy },
        { provide: UserIdService, useValue: userIdServiceSpy },
      ],
    });

    service = TestBed.inject(CancelServiceOrderService);
    connector = TestBed.inject(CancelServiceOrderConnector) as any;
    orderHistoryFacade = TestBed.inject(OrderHistoryFacade) as any;
    userIdService = TestBed.inject(UserIdService) as any;
  });

  describe('cancelService', () => {
    it('should call cancelServiceOrder on the connector with the correct parameters', async () => {
      const orderCode = 'order123';
      const cancellationDetails: CancellationDetails = {
        cancellationRequestEntryInputs: [],
      };
      const userId = 'user123';

      userIdService.takeUserId.mockReturnValue(of(userId));
      connector.cancelServiceOrder.mockReturnValue(of({ success: true }));

      const response = await firstValueFrom(
        service.cancelService(orderCode, cancellationDetails)
      );
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(connector.cancelServiceOrder).toHaveBeenCalledWith(
        userId,
        orderCode,
        cancellationDetails
      );
      expect(response).toEqual({ success: true });
    });

    it('should handle errors from cancelServiceOrderConnector', async () => {
      const orderCode = 'order123';
      const cancellationDetails: CancellationDetails = {
        cancellationRequestEntryInputs: [],
      };
      const userId = 'user123';

      userIdService.takeUserId.mockReturnValue(of(userId));
      connector.cancelServiceOrder.mockReturnValue(
        throwError(() => new Error('Some error'))
      );

      await expect(
        firstValueFrom(service.cancelService(orderCode, cancellationDetails))
      ).rejects.toEqual(new Error('Some error'));
    });
  });

  describe('loadOrderDetails', () => {
    it('should call getOrderDetails on the OrderHistoryFacade and return the result', () => {
      const expectedOrderDetails = of({});
      orderHistoryFacade.getOrderDetails.mockReturnValue(expectedOrderDetails);

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
