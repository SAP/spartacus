/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  EntitiesModel,
  FeatureToggles,
  provideMockFeatureToggles,
} from '@spartacus/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UnitItemService } from './unit-item.service';
import { UnitListService } from './unit-list.service';
import { TREE_TOGGLE } from './unit-tree.model';
import { UnitTreeService } from './unit-tree.service';

import createSpy = jasmine.createSpy;

function verifyExpandedAll({ values }: EntitiesModel<B2BUnitTreeNode>) {
  expect(values.length).toEqual(7);
  values.forEach((element) => {
    expect(element.expanded).toBeTrue();
  });
}

function verifyCollapsedAll({ values }: EntitiesModel<B2BUnitTreeNode>) {
  const root = values[0];

  expect(values.length).toEqual(1);
  expect(root.uid).toEqual(mockedTree.id);
  expect(root.expanded).toBeFalse();
  expect(root.depthLevel).toEqual(0);
  expect(root.count).toEqual(mockedTree.children.length);
}

const codeKey = 'uid';

const mockedTree = {
  id: 'Rustic',
  name: 'Rustic',
  active: true,
  children: [
    {
      id: 'Rustic Services',
      name: 'Rustic Services',
      parent: 'Rustic',
      active: true,
      children: [
        {
          active: true,
          children: [],
          id: 'Services West',
          name: 'Services West',
          parent: 'Rustic Services',
        },
        {
          active: true,
          children: [],
          id: 'Services East',
          name: 'Services East',
          parent: 'Rustic Services',
        },
      ],
    },
    {
      id: 'Rustic Retail',
      name: 'Rustic Retail',
      parent: 'Rustic',
      active: true,
      children: [
        {
          active: true,
          id: 'Custom Retail',
          name: 'Custom Retail',
          parent: 'Rustic Retail',
          children: [
            {
              active: true,
              children: [],
              id: 'Test',
              name: 'TestUnit',
              parent: 'Custom Retail',
            },
          ],
        },
      ],
    },
  ],
};

const mockedTreeBeforeConvert = {
  id: 'Rustic',
  name: 'Rustic',
  active: true,
  children: [
    {
      id: 'test3',
      name: 'test3',
      parent: 'Rustic',
      active: true,
      children: [],
    },
    {
      id: 'test1',
      name: 'test1',
      parent: 'Rustic',
      active: true,
      children: [],
    },
    {
      id: 'test2',
      name: 'test2',
      parent: 'Rustic',
      active: true,
      children: [
        {
          id: 'test6',
          name: 'test6',
          parent: 'test2',
          active: true,
          children: [],
        },
        {
          id: 'test5',
          name: 'test5',
          parent: 'test2',
          active: true,
          children: [],
        },
        {
          id: 'test4',
          name: 'test4',
          parent: 'test2',
          active: true,
          children: [],
        },
      ],
    },
  ],
};

const mockedTreeAfterConvert = {
  values: [
    {
      id: 'Rustic',
      name: 'Rustic',
      active: true,
      children: [
        {
          id: 'test1',
          name: 'test1',
          parent: 'Rustic',
          active: true,
          children: [],
        },
        {
          id: 'test2',
          name: 'test2',
          parent: 'Rustic',
          active: true,
          children: [
            {
              id: 'test6',
              name: 'test6',
              parent: 'test2',
              active: true,
              children: [],
            },
            {
              id: 'test5',
              name: 'test5',
              parent: 'test2',
              active: true,
              children: [],
            },
            {
              id: 'test4',
              name: 'test4',
              parent: 'test2',
              active: true,
              children: [],
            },
          ],
        },
        {
          id: 'test3',
          name: 'test3',
          parent: 'Rustic',
          active: true,
          children: [],
        },
      ],
      count: 3,
      expanded: true,
      depthLevel: 0,
      uid: 'Rustic',
    },
    {
      id: 'test1',
      name: 'test1',
      parent: 'Rustic',
      active: true,
      children: [],
      count: 0,
      expanded: true,
      depthLevel: 1,
      uid: 'test1',
    },
    {
      id: 'test2',
      name: 'test2',
      parent: 'Rustic',
      active: true,
      children: [
        {
          id: 'test4',
          name: 'test4',
          parent: 'test2',
          active: true,
          children: [],
        },
        {
          id: 'test5',
          name: 'test5',
          parent: 'test2',
          active: true,
          children: [],
        },
        {
          id: 'test6',
          name: 'test6',
          parent: 'test2',
          active: true,
          children: [],
        },
      ],
      count: 3,
      expanded: true,
      depthLevel: 1,
      uid: 'test2',
    },
    {
      id: 'test4',
      name: 'test4',
      parent: 'test2',
      active: true,
      children: [],
      count: 0,
      expanded: true,
      depthLevel: 2,
      uid: 'test4',
    },
    {
      id: 'test5',
      name: 'test5',
      parent: 'test2',
      active: true,
      children: [],
      count: 0,
      expanded: true,
      depthLevel: 2,
      uid: 'test5',
    },
    {
      id: 'test6',
      name: 'test6',
      parent: 'test2',
      active: true,
      children: [],
      count: 0,
      expanded: true,
      depthLevel: 2,
      uid: 'test6',
    },
    {
      id: 'test3',
      name: 'test3',
      parent: 'Rustic',
      active: true,
      children: [],
      count: 0,
      expanded: true,
      depthLevel: 1,
      uid: 'test3',
    },
  ],
  pagination: { totalResults: 7 },
};

const treeToggle$ = new BehaviorSubject(
  new Map().set(mockedTree.id, TREE_TOGGLE.EXPANDED)
);

const mockTree$ = new BehaviorSubject(mockedTree);

class MockUnitService {
  getTree(): Observable<B2BUnitNode> {
    return mockTree$.asObservable();
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

export class MockUnitTreeService {
  treeToggle$ = treeToggle$.asObservable();
  initialize = createSpy('initialize');
  isExpanded = createSpy('isExpanded').and.returnValue(false);
}

const mockFeatureToggles: FeatureToggles = {
  enableB2BUnitSearch: false,
};

describe('UnitListService', () => {
  let service: UnitListService;
  let treeService: UnitTreeService;
  let featureToggles: FeatureToggles;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UnitListService,
          {
            provide: UnitTreeService,
            useClass: MockUnitTreeService,
          },
          {
            provide: OrgUnitService,
            useClass: MockUnitService,
          },
          {
            provide: TableService,
            useClass: MockTableService,
          },
          {
            provide: UnitItemService,
            useValue: {
              key$: of(mockedTree.id),
            },
          },
          provideMockFeatureToggles({ ...mockFeatureToggles }),
        ],
      });
      service = TestBed.inject(UnitListService);
      treeService = TestBed.inject(UnitTreeService);
      featureToggles = TestBed.inject(FeatureToggles);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "code" key', () => {
      expect(service.key()).toEqual(codeKey);
    });

    it('should get collapsed all items structure', () => {
      let result: EntitiesModel<B2BUnitTreeNode>;
      mockTree$.next(mockedTree);
      service.getData().subscribe((table) => (result = table));
      verifyCollapsedAll(result);
    });

    it('should get expanded all items structure', () => {
      let result: EntitiesModel<B2BUnitTreeNode>;
      mockTree$.next(mockedTree);
      treeService.isExpanded = createSpy().and.returnValue(true);

      service.getData().subscribe((table) => (result = table));

      verifyExpandedAll(result);
    });

    it('should automatically sort unit tree by name', () => {
      let result: EntitiesModel<B2BUnitTreeNode>;
      mockTree$.next(mockedTreeBeforeConvert);
      treeService.isExpanded = createSpy().and.returnValue(true);

      service.getData().subscribe((table) => (result = table));

      expect(result).toEqual(mockedTreeAfterConvert);
    });

    describe('isSearchEnabled', () => {
      it('should return true when enableB2BUnitSearch toggle is enabled', () => {
        featureToggles.enableB2BUnitSearch = true;
        expect(service.isSearchEnabled()).toBeTrue();
      });

      it('should return false when enableB2BUnitSearch toggle is disabled', () => {
        featureToggles.enableB2BUnitSearch = false;
        expect(service.isSearchEnabled()).toBeFalse();
      });
    });

    describe('getSearchPlaceholderKey', () => {
      it('should return orgUnit-specific search placeholder key', () => {
        expect(service.getSearchPlaceholderKey()).toBe(
          'orgUnit.search.placeholder'
        );
      });
    });

    describe('filterTree', () => {
      it('should keep all children when parent matches', () => {
        const forceExpandIds = new Set<string>();
        // 'rustic services' matches 'Rustic Services' node (child of root).
        // Root 'Rustic' does NOT match (since 'rustic'.includes('rustic services') = false).
        // So root is ancestor -> added to forceExpandIds. 'Rustic Services' self-matches -> all children kept.
        const result = (service as any).filterTree(
          mockedTree,
          'rustic services',
          forceExpandIds
        );

        expect(result).toBeDefined();
        // Result is root node (ancestor of match)
        expect(result.id).toEqual('Rustic');
        // Root is in forceExpandIds as ancestor
        expect(forceExpandIds.has('Rustic')).toBeTrue();
        // 'Rustic Services' is NOT in forceExpandIds (it matched itself)
        expect(forceExpandIds.has('Rustic Services')).toBeFalse();
        // Only matching branch kept under root
        expect(result.children.length).toEqual(1);
        expect(result.children[0].id).toEqual('Rustic Services');
        // All children of 'Rustic Services' preserved (self-match keeps all children)
        expect(result.children[0].children.length).toEqual(2);
      });

      it('should keep root with all children when root matches', () => {
        const forceExpandIds = new Set<string>();
        // 'rustic' matches root node name 'Rustic'
        const result = (service as any).filterTree(
          mockedTree,
          'rustic',
          forceExpandIds
        );

        expect(result).toBeDefined();
        expect(result.id).toEqual('Rustic');
        expect(result.children.length).toEqual(2);
        // Root matches directly, no force-expand needed
        expect(forceExpandIds.size).toEqual(0);
      });

      it('should keep only matching branch and force-expand ancestors for child-only match', () => {
        const forceExpandIds = new Set<string>();
        // 'services west' matches leaf: Rustic -> Rustic Services -> Services West
        const result = (service as any).filterTree(
          mockedTree,
          'services west',
          forceExpandIds
        );

        expect(result).toBeDefined();
        expect(result.id).toEqual('Rustic');

        // Ancestors should be in forceExpandIds
        expect(forceExpandIds.has('Rustic')).toBeTrue();
        expect(forceExpandIds.has('Rustic Services')).toBeTrue();

        // Only the matching branch remains
        expect(result.children.length).toEqual(1);
        expect(result.children[0].id).toEqual('Rustic Services');
        expect(result.children[0].children.length).toEqual(1);
        expect(result.children[0].children[0].id).toEqual('Services West');
      });

      it('should return undefined when no match found', () => {
        const forceExpandIds = new Set<string>();
        const result = (service as any).filterTree(
          mockedTree,
          'nonexistent',
          forceExpandIds
        );

        expect(result).toBeUndefined();
        expect(forceExpandIds.size).toEqual(0);
      });

      it('should return undefined for undefined input', () => {
        const forceExpandIds = new Set<string>();
        const result = (service as any).filterTree(
          undefined,
          'test',
          forceExpandIds
        );

        expect(result).toBeUndefined();
      });

      it('should match case-insensitively with lowercase query', () => {
        const forceExpandIds = new Set<string>();
        // Query is already lowercased by load(); filterTree compares node.id/name.toLowerCase()
        const result = (service as any).filterTree(
          mockedTree,
          'services west',
          forceExpandIds
        );

        expect(result).toBeDefined();
        expect(forceExpandIds.has('Rustic')).toBeTrue();
        expect(forceExpandIds.has('Rustic Services')).toBeTrue();
      });

      it('should match by node id', () => {
        const forceExpandIds = new Set<string>();
        // 'test' matches the id of the deepest leaf (id: 'Test', name: 'TestUnit')
        // Also matches 'TestUnit' name. Path: Rustic -> Rustic Retail -> Custom Retail -> Test
        const result = (service as any).filterTree(
          mockedTree,
          'test',
          forceExpandIds
        );

        expect(result).toBeDefined();
        // Ancestors should be force-expanded
        expect(forceExpandIds.has('Rustic')).toBeTrue();
        expect(forceExpandIds.has('Rustic Retail')).toBeTrue();
        expect(forceExpandIds.has('Custom Retail')).toBeTrue();
      });
    });

    describe('convertListItem with forceExpandIds', () => {
      it('should force-expand nodes in forceExpandIds', () => {
        const forceExpandIds = new Set<string>(['Rustic', 'Rustic Services']);
        treeService.isExpanded = createSpy().and.returnValue(false);

        const result = (service as any).convertListItem(
          mockedTree,
          0,
          { totalResults: 0 },
          forceExpandIds
        );

        expect(result).toBeDefined();
        // Root 'Rustic' should be expanded via forceExpandIds
        const root = result.values[0];
        expect(root.uid).toEqual('Rustic');
        expect(root.expanded).toBeTrue();

        // 'Rustic Services' should also be expanded via forceExpandIds
        const rusticServices = result.values.find(
          (v: B2BUnitTreeNode) => v.uid === 'Rustic Services'
        );
        expect(rusticServices).toBeDefined();
        expect(rusticServices.expanded).toBeTrue();
      });

      it('should not force-expand nodes NOT in forceExpandIds', () => {
        const forceExpandIds = new Set<string>(['Rustic']);
        treeService.isExpanded = createSpy().and.returnValue(false);

        const result = (service as any).convertListItem(
          mockedTree,
          0,
          { totalResults: 0 },
          forceExpandIds
        );

        // Root should be expanded (in forceExpandIds)
        const root = result.values[0];
        expect(root.expanded).toBeTrue();

        // 'Rustic Retail' is NOT in forceExpandIds and isExpanded returns false
        const rusticRetail = result.values.find(
          (v: B2BUnitTreeNode) => v.uid === 'Rustic Retail'
        );
        expect(rusticRetail).toBeDefined();
        expect(rusticRetail.expanded).toBeFalse();
      });

      it('should fall back to unitTreeService.isExpanded when no forceExpandIds', () => {
        treeService.isExpanded = createSpy().and.returnValue(false);

        const result = (service as any).convertListItem(mockedTree);

        expect(result).toBeDefined();
        // Without forceExpandIds, all nodes use isExpanded (returns false)
        const root = result.values[0];
        expect(root.expanded).toBeFalse();
        expect(result.values.length).toEqual(1); // Only root since collapsed
      });
    });

    describe('load with search query', () => {
      it('should filter tree when query is non-empty', () => {
        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        // Trigger search via the service's search method
        service.search({} as any, 'services west');

        expect(result).toBeDefined();
        // 'Services West' matches; ancestors Rustic + Rustic Services auto-expanded
        // Visible: Rustic (expanded), Rustic Services (expanded), Services West
        expect(result.values.length).toEqual(3);
        expect(result.values[0].uid).toEqual('Rustic');
        expect(result.values[0].expanded).toBeTrue();
        expect(result.values[1].uid).toEqual('Rustic Services');
        expect(result.values[1].expanded).toBeTrue();
        expect(result.values[2].uid).toEqual('Services West');
        expect(result.pagination.totalResults).toEqual(3);
      });

      it('should filter when query is non-empty (min-char check is handled by component pipe)', () => {
        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        // Service receives 'ab' directly (bypassing component pipe); service filters on any non-empty query
        service.search({} as any, 'ab');

        // 'ab' matches nothing in the mocked tree -> empty result
        expect(result).toBeDefined();
        expect(result.values.length).toEqual(0);
      });

      it('should not filter when query is empty', () => {
        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        service.search({} as any, '');

        // Empty query -> full tree returned (collapsed)
        verifyCollapsedAll(result);
      });

      it('should not filter when query is only whitespace', () => {
        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        service.search({} as any, '   ');

        // Whitespace-only query -> trimmed to empty -> full tree returned (collapsed)
        verifyCollapsedAll(result);
      });

      it('should return empty result when no search results', () => {
        let result: EntitiesModel<B2BUnitTreeNode> | undefined;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        service.search({} as any, 'nonexistent');

        expect(result).toBeDefined();
        expect(result.values).toEqual([]);
        expect(result.pagination.totalResults).toEqual(0);
      });

      it('should show parent match with all children preserved', () => {
        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        // 'rustic services' matches 'Rustic Services' directly
        service.search({} as any, 'rustic services');

        expect(result).toBeDefined();
        // Rustic (ancestor, force-expanded) -> Rustic Services (self-match, NOT force-expanded, uses isExpanded=false)
        expect(result.values[0].uid).toEqual('Rustic');
        expect(result.values[0].expanded).toBeTrue(); // forceExpandIds
        expect(result.values[1].uid).toEqual('Rustic Services');
        expect(result.values[1].expanded).toBeFalse(); // self-match, isExpanded returns false
        // Total: 2 visible nodes (Rustic Services collapsed, its children hidden)
        expect(result.values.length).toEqual(2);
        // But Rustic Services still has children count
        expect(result.values[1].count).toEqual(2);
      });

      it('should trim and lowercase query before filtering', () => {
        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);
        treeService.isExpanded = createSpy().and.returnValue(false);

        service.getData().subscribe((table) => {
          result = table;
        });

        service.search({} as any, '  Services West  ');

        expect(result).toBeDefined();
        // Should find 'Services West' despite leading/trailing spaces and casing
        expect(
          result.values.some((v: B2BUnitTreeNode) => v.uid === 'Services West')
        ).toBeTrue();
      });

      it('should preserve expand state when search is cleared', () => {
        // Set manual expansion: only root expanded
        treeService.isExpanded = createSpy().and.callFake(
          (id: string, _level: number) => {
            return id === 'Rustic';
          }
        );

        let result: EntitiesModel<B2BUnitTreeNode>;
        mockTree$.next(mockedTree);

        service.getData().subscribe((table) => {
          result = table;
        });

        // Search with query -> filtered results
        service.search({} as any, 'services west');
        expect(result.values.length).toEqual(3);

        // Clear search -> should restore original expand state
        service.clearSearch({} as any);

        // Root is expanded (manual state), children visible but collapsed
        expect(result.values[0].uid).toEqual('Rustic');
        expect(result.values[0].expanded).toBeTrue();
        // Root's children should be visible since root is expanded
        expect(result.values.length).toEqual(3); // Rustic + 2 children (both collapsed)
        expect(result.values[1].expanded).toBeFalse();
        expect(result.values[2].expanded).toBeFalse();
      });
    });
  });
});
