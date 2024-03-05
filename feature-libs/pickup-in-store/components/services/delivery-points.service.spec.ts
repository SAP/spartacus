import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart, OrderEntryGroup } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import {
  DeliveryPointOfService,
  DeliveryPointOfServiceItems,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import { DeliveryPointsService } from './delivery-points.service';
import { HierarchyComponentService, HierarchyNode } from '@spartacus/storefront';

export const mockDeliveryPointOfService: Observable<DeliveryPointOfService[]> = of([
  {
    name: 'A Store',
    value: [
      { deliveryPointOfService: { name: 'A Store' } },
      { deliveryPointOfService: { name: 'A Store' } },
    ],
    storeDetails: {},
  },
  {
    name: 'B Store',
    value: [
      { deliveryPointOfService: { name: 'B Store' } },
      { deliveryPointOfService: { name: 'B Store' } },
    ],
    storeDetails: {},
  },
]);

class MockActiveCartFacade {
  getPickupEntries() {
    const entries = [
      { deliveryPointOfService: { name: 'A Store' }, entryNumber: 1 },
      { deliveryPointOfService: { name: 'B Store' }, entryNumber: 3 },
      {},
    ];
    return of(entries);
  }
  getActive(): Observable<Cart> {
    const CART: Cart = {
      entries: [
        { deliveryPointOfService: { name: 'A Store' } },
        { deliveryPointOfService: { name: 'B Store' } },
        {},
      ],
    };
    return of(CART);
  }
  updateEntry(
    _entryNumber: number,
    _quantity: number,
    _pickupInStore: string,
    _pickupLocation?: boolean
  ): void {}

  getPickupEntryGroups() {
    const entryGroups: OrderEntryGroup[] = [
      {
        type: 'CONFIGURABLEBUNDLE',
        entryGroups: [],
        entries: [{ entryNumber: 1 }, { entryNumber: 2 }],
      },
      {
        type: 'CONFIGURABLEBUNDLE',
        entryGroups: [],
        entries: [{ entryNumber: 3 }, { entryNumber: 4 }],
      },
    ];
    return of(entryGroups);
  }
}
class MockPickupLocationsSearchFacade {
  loadStoreDetails(): void {}
  getStoreDetails(): Observable<PointOfService> {
    const POINT_OF_SERVICE: PointOfService = {};
    return of(POINT_OF_SERVICE);
  }
}

class MockHierarchyComponentService {
  buildHierarchyTree(groups: OrderEntryGroup[], root: HierarchyNode): void {
    // Simulate the logic for building the hierarchy tree
    root.children.push(...groups.map(group => new HierarchyNode(group.type, {})));
  }
}

export class DeliveryPointsServiceMock {
  getDeliveryPointsOfServiceFromCart(): Observable<
    Array<DeliveryPointOfServiceItems>
  > {
    return of([]);
  }
  getDeliveryPointsOfServiceFromOrder() {}

  getDeliveryPointsOfServiceFromCartWithEntryGroups(): Observable<Array<DeliveryPointOfService>> {
    return mockDeliveryPointOfService;
  }
}

export class MockOrderFacade {
  getPickupEntries() {
    const entries = [
      { deliveryPointOfService: { name: 'A Store' } },
      { deliveryPointOfService: { name: 'B Store' } },
      {},
    ];
    return of(entries);
  }
  getOrderDetails(): Observable<Order> {
    const ORDER: Order = {
      entries: [
        { deliveryPointOfService: { name: 'A Store' } },
        { deliveryPointOfService: { name: 'B Store' } },
        {},
      ],
    };
    return of(ORDER);
  }
}

// Mock data with nested entryGroups to trigger recursive logic
const mockEntryGroups: OrderEntryGroup[] = [
  {
    type: 'CONFIGURABLEBUNDLE',
    entries: [
      { entryNumber: 1, deliveryPointOfService: { name: 'A Store' } },
    ],
    entryGroups: [
      {
        type: 'CONFIGURABLEBUNDLE',
        entries: [
          { entryNumber: 2, deliveryPointOfService: { name: 'A Store' } },
        ],
        entryGroups: [
          {
            type: 'CONFIGURABLEBUNDLE',
            entries: [
              { entryNumber: 3, deliveryPointOfService: { name: 'A Store' } },
            ],
          },
        ],
      },
    ],
  }
];

const mockPickupEntries = [
  { entryNumber: 1, deliveryPointOfService: { name: 'A Store' } },
  { entryNumber: 2, deliveryPointOfService: { name: 'A Store' } },
  { entryNumber: 3, deliveryPointOfService: { name: 'A Store' } },
];

describe('DeliveryPointsService', () => {
  let deliveryPointsService: DeliveryPointsService;
  let activeCartFacade: ActiveCartFacade;
  let pickupLocationsSearchService: PickupLocationsSearchFacade;
  let orderFacade: OrderFacade;
  let hierarchyService: HierarchyComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: OrderFacade, useClass: MockOrderFacade },
        {
          provide: PickupLocationsSearchFacade,
          useClass: MockPickupLocationsSearchFacade,
        },
        { provide: HierarchyComponentService,
          useClass: MockHierarchyComponentService
        },
      ],
    });

    deliveryPointsService = TestBed.inject(DeliveryPointsService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    pickupLocationsSearchService = TestBed.inject(PickupLocationsSearchFacade);
    orderFacade = TestBed.inject(OrderFacade);
    hierarchyService = TestBed.inject(HierarchyComponentService);

    spyOn(activeCartFacade, 'getPickupEntries').and.callThrough();
    spyOn(activeCartFacade, 'getPickupEntryGroups').and.callThrough();
    spyOn(pickupLocationsSearchService, 'loadStoreDetails').and.callThrough();
    spyOn(pickupLocationsSearchService, 'getStoreDetails').and.callThrough();
    spyOn(orderFacade, 'getPickupEntries').and.callThrough();
    spyOn(hierarchyService, 'buildHierarchyTree').and.callThrough();
  });

  it('should be created', () => {
    expect(deliveryPointsService).toBeDefined();
  });

  it('getDeliveryPointsOfServiceFromCart should return: Observable<Array<DeliveryPointOfServiceItems>> ', () => {
    deliveryPointsService.getDeliveryPointsOfServiceFromCart().subscribe();

    expect(activeCartFacade.getPickupEntries).toHaveBeenCalled();

    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledTimes(
      2
    );
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'A Store'
    );

    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'B Store'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledTimes(
      2
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'A Store'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'B Store'
    );
  });

  it('getDeliveryPointsOfServiceFromCart should return: Observable<Array<DeliveryPointOfServiceItems>> ', () => {
    deliveryPointsService.getDeliveryPointsOfServiceFromOrder().subscribe();

    expect(orderFacade.getPickupEntries).toHaveBeenCalled();

    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledTimes(
      2
    );
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'A Store'
    );

    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledWith(
      'B Store'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledTimes(
      2
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'A Store'
    );
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledWith(
      'B Store'
    );
  });

  it('getDeliveryPointsOfServiceFromCartWithEntryGroups should return Observable<Array<DeliveryPointOfService>>', () => {
    deliveryPointsService.getDeliveryPointsOfServiceFromCartWithEntryGroups().subscribe(result => {
      expect(result).toBeDefined();
      expect(result.length).toBe(2); // Two stores in the mock data

      result.forEach((deliveryPoint, index) => {
        expect(deliveryPoint.name).toBe(index === 0 ? 'A Store' : 'B Store');
        expect(deliveryPoint.entryGroups).toBeDefined();
        expect(deliveryPoint.hierachyTrees).toBeDefined();

        if (deliveryPoint.hierachyTrees) {
          deliveryPoint.hierachyTrees.forEach(tree => {
            expect(tree.children.length).toBeGreaterThan(0);
          });
        }
      });
    });

    expect(activeCartFacade.getPickupEntries).toHaveBeenCalled();
    expect(activeCartFacade.getPickupEntryGroups).toHaveBeenCalled();
    expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledTimes(2);
    expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledTimes(2);
  });

  it('should correctly handle recursive entryGroups logic', () => {
    // reset spy
    (activeCartFacade.getPickupEntries as jasmine.Spy).calls.reset();
    (activeCartFacade.getPickupEntryGroups as jasmine.Spy).calls.reset();

    // set return value
    (activeCartFacade.getPickupEntries as jasmine.Spy).and.returnValue(of(mockPickupEntries));
    (activeCartFacade.getPickupEntryGroups as jasmine.Spy).and.returnValue(of(mockEntryGroups));

    deliveryPointsService.getDeliveryPointsOfServiceFromCartWithEntryGroups().subscribe((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);

      const firstStore = result[0];
      expect(firstStore.name).toBe('A Store');
      expect(firstStore.entryGroups?.length).toBeGreaterThan(0);

      const firstEntryGroup = firstStore.entryGroups ? firstStore.entryGroups[0] : null;
      expect(firstEntryGroup).toBeDefined();

      if (firstEntryGroup?.entryGroups) {
        expect(firstEntryGroup.entryGroups.length).toBe(1);
      }
      });

      expect(activeCartFacade.getPickupEntries).toHaveBeenCalled();
      expect(activeCartFacade.getPickupEntryGroups).toHaveBeenCalled();
      expect(pickupLocationsSearchService.loadStoreDetails).toHaveBeenCalledTimes(1);
      expect(pickupLocationsSearchService.getStoreDetails).toHaveBeenCalledTimes(1);
  });

});
