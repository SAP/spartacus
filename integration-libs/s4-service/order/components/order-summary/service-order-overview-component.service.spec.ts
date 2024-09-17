import { TestBed } from '@angular/core/testing';
import { ServiceOrderOverviewComponentService } from './service-order-overview-component.service';
import { Order } from '@spartacus/order/root';
import { S4ServiceDeliveryModeConfig } from '@spartacus/s4-service/root';
const mockServiceDeliveryModeConfig: S4ServiceDeliveryModeConfig = {
  s4ServiceDeliveryMode: {
    code: 'd1',
  },
};
describe('ServiceOrderOverviewComponentService', () => {
  let service: ServiceOrderOverviewComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServiceOrderOverviewComponentService,
        {
          provide: S4ServiceDeliveryModeConfig,
          useValue: mockServiceDeliveryModeConfig,
        },
      ],
    });
    service = TestBed.inject(ServiceOrderOverviewComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return true if delivery mode is not same as service delivery mode', () => {
    const order1: Order = {
      deliveryMode: { code: 'd2' },
    };
    expect(service.shouldShowDeliveryMode(order1.deliveryMode)).toEqual(true);
    const order2: Order = {
      deliveryMode: { name: 'fast-delivery' },
    };
    expect(service.shouldShowDeliveryMode(order2.deliveryMode)).toEqual(true);
  });
  it('should return false if delivery mode is not defined', () => {
    const order: Order = {
      deliveryMode: { code: 'd1', name: 'service-delivery' },
    };
    expect(service.shouldShowDeliveryMode(order?.deliveryMode)).toEqual(false);
  });
});
