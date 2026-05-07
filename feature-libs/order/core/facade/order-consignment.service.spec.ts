import { TestBed } from '@angular/core/testing';
import { OrderConsignmentService } from './order-consignment.service';
import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import { Consignment, Order } from '@spartacus/order/root';
import { HierarchyComponentService } from '@spartacus/storefront';

describe('OrderConsignmentService', () => {
  let service: OrderConsignmentService;
  let mockHierarchyService: jasmine.SpyObj<HierarchyComponentService>;

  beforeEach(() => {
    mockHierarchyService = jasmine.createSpyObj('HierarchyComponentService', [
      'buildHierarchyTree',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OrderConsignmentService,
        { provide: HierarchyComponentService, useValue: mockHierarchyService },
      ],
    });

    service = TestBed.inject(OrderConsignmentService);
  });

  describe('assignEntryGroupsToConsignments', () => {
    it('should assign entry groups to consignments correctly', () => {
      const order: Order = {
        entryGroups: [
          {
            type: 'CONFIGURABLEBUNDLE',
            entries: [{ entryNumber: 1 }, { entryNumber: 2 }],
            entryGroups: [],
          },
        ],
      } as Order;

      const consignments: Consignment[] = [
        {
          entries: [{ orderEntry: { entryNumber: 1 } }],
        },
      ] as Consignment[];

      const result = service.assignEntryGroupsToConsignments(
        order,
        consignments
      );

      expect(result[0].entryGroups).toEqual(order.entryGroups);
      expect(mockHierarchyService.buildHierarchyTree).toHaveBeenCalled();
    });

    it('should return an empty entryGroups if no match is found', () => {
      const order: Order = { entryGroups: [] } as Order;
      const consignments: Consignment[] = [{ entries: [] }] as Consignment[];

      const result = service.assignEntryGroupsToConsignments(
        order,
        consignments
      );

      expect(result[0].entryGroups).toEqual([]);
    });
  });

  describe('processUnconsignedEntries', () => {
    it('should process unconsigned entries and return filtered entries and hierarchy trees', () => {
      const order: Order = {
        entryGroups: [
          {
            type: 'CONFIGURABLEBUNDLE',
            entries: [{ entryNumber: 1 }, { entryNumber: 2 }],
            entryGroups: [],
          },
        ],
      } as Order;

      const unconsignedEntries = {
        pickup: [{ entryNumber: 1 }],
        delivery: [{ entryNumber: 2 }],
      };

      const result = service.processUnconsignedEntries(
        order,
        unconsignedEntries
      );

      expect(result.pickup.filteredEntries).toEqual(unconsignedEntries.pickup);
      expect(result.delivery.filteredEntries).toEqual(
        unconsignedEntries.delivery
      );
      expect(mockHierarchyService.buildHierarchyTree).toHaveBeenCalledTimes(2);
    });

    it('should return empty filteredEntries and hierarchyTrees if no matching entries are found', () => {
      const order: Order = { entryGroups: [] } as Order;

      const unconsignedEntries = {
        pickup: [{ entryNumber: 1 }],
        delivery: [{ entryNumber: 2 }],
      };

      const result = service.processUnconsignedEntries(
        order,
        unconsignedEntries
      );

      expect(result.pickup.filteredEntries).toEqual([]);
      expect(result.delivery.filteredEntries).toEqual([]);
      expect(result.pickup.hierarchyTrees).toEqual([]);
      expect(result.delivery.hierarchyTrees).toEqual([]);
    });
  });

  describe('Private Methods', () => {
    it('filterEntries should correctly filter matching entries', () => {
      const entries = [{ entryNumber: 1 }, { entryNumber: 2 }] as OrderEntry[];
      const order: Order = {
        entryGroups: [
          {
            entries: [{ entryNumber: 1 }],
          },
        ],
      } as Order;

      const result = (service as any).filterEntries(
        entries,
        order,
        (entry: OrderEntry) => entry.entryNumber
      );

      expect(result).toEqual([{ entryNumber: 1 }]);
    });

    it('getEntryNumbers should extract entry numbers correctly', () => {
      const entries = [{ entryNumber: 1 }, { entryNumber: 2 }] as OrderEntry[];

      const result = (service as any).getEntryNumbers(
        entries,
        (entry: OrderEntry) => entry.entryNumber
      );

      expect(result).toEqual([1, 2]);
    });

    it('findMatchingEntryGroups should recursively find matching entry groups', () => {
      const group: OrderEntryGroup = {
        entries: [{ entryNumber: 1 }],
        entryGroups: [
          {
            entries: [{ entryNumber: 2 }],
          },
        ],
      } as OrderEntryGroup;

      const result = (service as any).findMatchingEntryGroups(group, [2]);

      expect(result?.entryGroups?.length).toBe(1);
      expect(result?.entryGroups?.[0].entries?.[0].entryNumber).toBe(2);
    });

    it('generateHierarchyTrees should call buildHierarchyTree for each entry group', () => {
      const entryGroups = [
        {
          type: 'CONFIGURABLEBUNDLE',
          entries: [],
        },
      ] as OrderEntryGroup[];

      const result = (service as any).generateHierarchyTrees(entryGroups);

      expect(mockHierarchyService.buildHierarchyTree).toHaveBeenCalled();
      expect(result.length).toBe(1);
    });
  });

  it('filterEntries should use extractEntryNumber when provided', () => {
    const entries = [{ entryNumber: 1 }, { entryNumber: 2 }] as OrderEntry[];
    const order: Order = {
      entryGroups: [
        {
          entries: [{ entryNumber: 1 }],
        },
      ],
    } as Order;

    const result = (service as any).filterEntries(
      entries,
      order,
      (entry: OrderEntry) => entry.entryNumber
    );

    expect(result).toEqual([{ entryNumber: 1 }]);
  });

  it('filterEntries should use (entry as any).orderEntry?.entryNumber when extractEntryNumber is not provided', () => {
    const entries = [
      { orderEntry: { entryNumber: 1 } },
      { orderEntry: { entryNumber: 2 } },
    ] as any[];
    const order: Order = {
      entryGroups: [
        {
          entries: [{ entryNumber: 1 }],
        },
      ],
    } as Order;

    const result = (service as any).filterEntries(entries, order);

    expect(result).toEqual([{ orderEntry: { entryNumber: 1 } }]);
  });

  it('getEntryNumbers should use extractEntryNumber when provided', () => {
    const entries = [{ entryNumber: 1 }, { entryNumber: 2 }] as OrderEntry[];

    const result = (service as any).getEntryNumbers(
      entries,
      (entry: OrderEntry) => entry.entryNumber // 使用 extractEntryNumber
    );

    expect(result).toEqual([1, 2]);
  });

  it('getEntryNumbers should use (entry as any).orderEntry?.entryNumber when extractEntryNumber is not provided', () => {
    const entries = [
      { orderEntry: { entryNumber: 1 } },
      { orderEntry: { entryNumber: 2 } },
    ] as any[];

    const result = (service as any).getEntryNumbers(entries);

    expect(result).toEqual([1, 2]);
  });
});
