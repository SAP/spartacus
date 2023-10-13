import { OrderConsignmentsService } from './order-consignments.service';
import { TestBed } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';

describe('OrderConsignmentsService', () => {
    let orderConsignmentsService: OrderConsignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderConsignmentsService],
    });
    orderConsignmentsService = TestBed.inject(OrderConsignmentsService);
  });

  it('should be created', () => {
    expect(orderConsignmentsService).toBeTruthy();
  });

  it('should group consignments by status', () => {
    const order: Order = {
      consignments: [
        { status: 'SHIPPED' },
        { status: 'IN_TRANSIT' },
        { status: 'DELIVERY_COMPLETED' },
      ],
    };

    const groupedConsignments = orderConsignmentsService.getGroupedConsignments(order, false);

    expect(groupedConsignments).toEqual([
      { status: 'SHIPPED' },
      { status: 'IN_TRANSIT' },
      { status: 'DELIVERY_COMPLETED' },
    ]);
  });

  it('should return the unconsigned entries for pickup if the pickup parameter is true', () => {
    const order: Order = {
      unconsignedEntries: [
        {
          deliveryPointOfService: {
            address: {
                line1: '123',
                line2: 'Main Street'
            },
            name: 'xyz'
          },
        },
        {
          deliveryPointOfService: undefined,
        },
      ],
    };

    const unconsignedEntries = orderConsignmentsService.getUnconsignedEntries(order, true);

    expect(unconsignedEntries).toEqual([
      {
        deliveryPointOfService: {
            address: {
                line1: '123',
                line2: 'Main Street'
            },
            name: 'xyz'},
      },
    ]);
  });

  it('should return the unconsigned entries for delivery if the pickup parameter is false', () => {
    const order: Order = {
      unconsignedEntries: [
        {
          deliveryPointOfService: {
            address: {
                line1: '123',
                line2: 'Main Street'
            },
            name: 'xyz'
          },
        },
        {
          deliveryPointOfService: undefined,
        },
      ],
    };

    const unconsignedEntries = orderConsignmentsService.getUnconsignedEntries(order, false);

    expect(unconsignedEntries).toEqual([
      {
        deliveryPointOfService: undefined,
      },
    ]);
  });
});