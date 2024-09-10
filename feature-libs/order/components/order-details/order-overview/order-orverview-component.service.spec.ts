import { TestBed } from '@angular/core/testing';
import { OrderOverviewComponentService } from './order-overview-component.service';
import { Order } from '@spartacus/order/root';

describe('OrderOverviewComponentService', () => {
  let service: OrderOverviewComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderOverviewComponentService],
    });
    service = TestBed.inject(OrderOverviewComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return true if delivery mode is defined', () => {
    const order: Order = {
      deliveryMode: { code: 'd1' },
    };
    expect(service.shouldShowDeliveryMode(order?.deliveryMode)).toEqual(true);
  });
  it('should return false if delivery mode is not defined', () => {
    const order: Order = {};
    expect(service.shouldShowDeliveryMode(order?.deliveryMode)).toEqual(false);
  });
});
