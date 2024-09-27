import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderEntryGroup } from '@spartacus/cart/base/root';
import { CollapsibleNode } from '../hierarchy-node-collapsible';
import { HierarchyComponentService } from './hierarchy.component.service';

describe('HierarchyComponentService', () => {
  let service: HierarchyComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HierarchyComponentService);
  });

  describe('getEntriesFromGroups', () => {
    it('should return order entries from entry groups without nested groups', (done) => {
      const mockEntryGroups: OrderEntryGroup[] = [
        {
          entries: [
            { orderCode: 'order1', quantity: 1, totalPrice: { value: 100 } },
            { orderCode: 'order2', quantity: 2, totalPrice: { value: 200 } },
          ],
          entryGroups: [],
        },
        {
          entries: [{ orderCode: 'order3', quantity: 3, totalPrice: { value: 300 } }],
          entryGroups: [],
        },
      ];

      service.getEntriesFromGroups(of(mockEntryGroups)).subscribe((entries) => {
        expect(entries.length).toBe(3);
        expect(entries).toEqual(mockEntryGroups.flatMap(group => group.entries));
        done();
      });
    });

    it('should filter out entry groups that have nested entry groups', (done) => {
      const mockEntryGroups: OrderEntryGroup[] = [
        {
          entries: [{ orderCode: 'order1', quantity: 1 }],
          entryGroups: [{ entries: [{ orderCode: 'order2' }], entryGroups: [] }],
        },
        {
          entries: [{ orderCode: 'order3', quantity: 3 }],
          entryGroups: [],
        },
      ];

      service.getEntriesFromGroups(of(mockEntryGroups)).subscribe((entries) => {
        expect(entries.length).toBe(1);  // 修正为 1
        expect(entries).toEqual([{ orderCode: 'order3', quantity: 3 }]);  // 修正为只保留 order3
        done();
      });
    });
  });

  describe('getBundlesFromGroups', () => {
    it('should return collapsible nodes for configurable bundles', (done) => {
      const mockEntryGroups: OrderEntryGroup[] = [
        { type: "CONFIGURABLEBUNDLE", label: 'Bundle 1', entryGroups: [] },
        { type: "STANDALONE", label: 'Bundle 2', entryGroups: [] },
      ];

      service.getBundlesFromGroups(of(mockEntryGroups)).subscribe((nodes) => {
        expect(nodes.length).toBe(1);
        expect(nodes[0] instanceof CollapsibleNode).toBeTrue();
        expect(nodes[0].name).toBe('ROOT');
        done();
      });
    });

    it('should not include non-configurable bundles', (done) => {
      const mockEntryGroups: OrderEntryGroup[] = [
        { type: "STANDALONE", label: 'Bundle 1', entryGroups: [] },
        { type: "STANDALONE", label: 'Bundle 2', entryGroups: [] },
      ];

      service.getBundlesFromGroups(of(mockEntryGroups)).subscribe((nodes) => {
        expect(nodes.length).toBe(0);
        done();
      });
    });
  });

  describe('buildHierarchyTree', () => {
    it('should build a hierarchy tree from entry groups', () => {
      const mockEntryGroups: OrderEntryGroup[] = [
        { label: 'Group 1', entryGroups: [] },
        {
          label: 'Group 2',
          entryGroups: [{ label: 'Sub Group 2.1', entryGroups: [] }],
        },
      ];

      const root = new CollapsibleNode('ROOT');
      service.buildHierarchyTree(mockEntryGroups, root);

      expect(root.children.length).toBe(2);
      expect(root.children[0].name).toBe('Group 1');
      expect(root.children[1].children.length).toBe(1);
      expect(root.children[1].children[0].name).toBe('Sub Group 2.1');
    });
  });
});
