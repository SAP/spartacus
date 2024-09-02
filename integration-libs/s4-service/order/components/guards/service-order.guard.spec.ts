import { TestBed } from '@angular/core/testing';

import { ServiceOrderGuard } from './service-order.guard';
import { OrderDetailsService } from '@spartacus/order/components';
import { Order } from '@spartacus/order/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

const mockOrderReschedulable: Order = {
  serviceReschedulable: true,
};
const mockOrderNotReschedulable: Order = {
  serviceReschedulable: false,
};

class MockOrderDetailsService implements Partial<OrderDetailsService> {
  getOrderDetails(): Observable<Order> {
    return of(mockOrderReschedulable);
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
}

describe('ServiceOrderGuard', () => {
  let guard: ServiceOrderGuard;
  let globalMessageService: GlobalMessageService;
  let orderDetailsService: OrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OrderDetailsService,
          useClass: MockOrderDetailsService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    guard = TestBed.inject(ServiceOrderGuard);
    orderDetailsService = TestBed.inject(OrderDetailsService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add').and.callThrough();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow to proceed for an order which is reschedulable', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
      of(mockOrderReschedulable)
    );
    (guard as any).canActivate().subscribe((result: boolean) => {
      expect(result).toBeTruthy();
    });
  });

  it('should not allow to proceed for an order which is not reschedulable', () => {
    spyOn(orderDetailsService, 'getOrderDetails').and.returnValue(
      of(mockOrderNotReschedulable)
    );
    (guard as any).canActivate().subscribe((result: boolean) => {
      expect(result).toBeFalsy();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'rescheduleService.serviceNotReschedulable' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
