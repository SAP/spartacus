import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel } from '@spartacus/core';
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

describe('UnitListService', () => {
  let service: UnitListService;
  let treeService: UnitTreeService;
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
        ],
      });
      service = TestBed.inject(UnitListService);
      treeService = TestBed.inject(UnitTreeService);
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
  });
});
