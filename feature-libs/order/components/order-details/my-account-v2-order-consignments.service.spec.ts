import { MyAccountV2OrderConsignmentsService } from './my-account-v2-order-consignments.service';
import { TestBed } from '@angular/core/testing';
import { Order } from '@spartacus/order/root';
const order: Order = {
  unconsignedEntries: [
    {
      deliveryPointOfService: {},
    },
    {},
    {},
  ],
};
const order2: Order = {
  consignments: [
    { status: 'SHIPPED', deliveryPointOfService: {} },
    { status: 'IN_TRANSIT' },
    { status: 'DELIVERY_COMPLETED', deliveryPointOfService: {} },
  ],
};
describe('MyAccountV2OrderConsignmentsService', () => {
  let service: MyAccountV2OrderConsignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAccountV2OrderConsignmentsService],
    });
    service = TestBed.inject(MyAccountV2OrderConsignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return group consignments with prickup false', () => {
    let groupedConsignments = service.getGroupedConsignments(order2, false);

    expect(groupedConsignments).toEqual([{ status: 'IN_TRANSIT' }]);
  });
  it('should return group consignments with prickup true', () => {
    let groupedConsignments = service.getGroupedConsignments(order2, true);

    expect(groupedConsignments).toEqual([
      { status: 'SHIPPED', deliveryPointOfService: {} },
      { status: 'DELIVERY_COMPLETED', deliveryPointOfService: {} },
    ]);
  });

  it('should return the unconsigned entries with pickup true', () => {
    let unconsignedEntries = service.getUnconsignedEntries(order, true);
    expect(unconsignedEntries).toEqual([
      {
        deliveryPointOfService: {},
      },
    ]);
  });

  it('should return the unconsigned entriess with pickup false', () => {
    let unconsignedEntries = service.getUnconsignedEntries(order, false);

    expect(unconsignedEntries).toEqual([{}, {}]);
  });
});
