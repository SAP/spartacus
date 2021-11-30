import { TestBed } from '@angular/core/testing';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { of } from 'rxjs';
import { ReplenishmentOrderDetailsService } from '../replenishment-order-details/replenishment-order-details.service';
import { ReplenishmentOrderDetailsOrderDetailsContext } from './replenishment-order-details-order-details.context';
import createSpy = jasmine.createSpy;

const mockOrder = { code: 'testReplenishmentOrder' };

class MockReplenishmentOrderDetailsService {
  getOrderDetails = createSpy().and.returnValue(of(mockOrder));
}

describe('ReplenishmentOrderDetailsOrderDetailsContext', () => {
  let service: ReplenishmentOrderDetailsOrderDetailsContext;
  let replenishmentOrderDetailsService: ReplenishmentOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useClass: MockReplenishmentOrderDetailsService,
          provide: ReplenishmentOrderDetailsService,
        },
      ],
    });
    service = TestBed.inject(ReplenishmentOrderDetailsOrderDetailsContext);
    replenishmentOrderDetailsService = TestBed.inject(
      ReplenishmentOrderDetailsService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrderDetails', () => {
    it('should be able to get replenishment order', () => {
      let order: ReplenishmentOrder;
      service
        .getOrderDetails()
        .subscribe((result) => {
          order = result;
        })
        .unsubscribe();

      expect(
        replenishmentOrderDetailsService.getOrderDetails
      ).toHaveBeenCalledWith();
      expect(order).toEqual(mockOrder);
    });
  });
});
