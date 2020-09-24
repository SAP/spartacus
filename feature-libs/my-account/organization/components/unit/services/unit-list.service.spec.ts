import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { B2BUnitNode } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UnitListService } from './unit-list.service';
import { UnitItemService } from './unit-item.service';
import createSpy = jasmine.createSpy;
import { UnitTreeService } from './unit-tree.service';
import { TREE_TOGGLE } from './unit-tree.model';

// function verifyExpandedAll({ data }) {
//   expect(data.length).toBe(7);
//   expect(data[0].uid).toEqual('Rustic');
//   expect(data[1].uid).toEqual('Rustic Services');
//   expect(data[2].uid).toEqual('Services West');
//   expect(data[3].uid).toEqual('Services East');
//   expect(data[4].uid).toEqual('Rustic Retail');
//   expect(data[5].uid).toEqual('Custom Retail');
//   expect(data[6].uid).toEqual('Test');
// }

function verifyCollapsed({ data }) {
  console.log(data);
  expect(data.length).toBe(3);
  expect(data[0].id).toEqual('Rustic');
  expect(data[1].id).toEqual('Rustic Services');
  expect(data[2].id).toEqual('Rustic Retail');
}

// function verifyExpandedOne({ data }) {
//   expect(data.length).toBe(5);
//   expect(data[0].uid).toEqual('Rustic');
//   expect(data[1].uid).toEqual('Rustic Services');
//   expect(data[2].uid).toEqual('Services West');
//   expect(data[3].uid).toEqual('Services East');
//   expect(data[4].uid).toEqual('Rustic Retail');
// }
//
// const toggledUnit = {
//   uid: 'Rustic Services',
//   id: 'Rustic Services',
//   name: 'Rustic Services',
//   parent: 'Rustic',
//   active: true,
//   depthLevel: 1,
//   count: 2,
// };

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

class MockUnitService {
  getTree(): Observable<B2BUnitNode> {
    return of(mockedTree);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const treeToggle$ = new BehaviorSubject(
  new Map().set('Rustic', TREE_TOGGLE.EXPANDED)
);

export class MockUnitTreeService {
  treeToggle$ = treeToggle$.asObservable();
  initialize = createSpy('initialize');
  getToggleState = createSpy('getToggleState')
    .withArgs('Rustic')
    .and.returnValue(treeToggle$.value?.get('Rustic'));
  isExpanded = createSpy('isExpanded')
    .and.returnValue(false)
    .withArgs('Rustic', 0, undefined)
    .and.returnValue(true);
}

describe('UnitListService', () => {
  let service: UnitListService;

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
              key$: of('Rustic'),
            },
          },
        ],
      });
      service = TestBed.inject(UnitListService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "code" key', () => {
      expect(service.key()).toEqual('uid');
    });

    it('should populate tree object to list', () => {
      let result;
      service.getTable().subscribe((table) => (result = table));
      verifyCollapsed(result);
    });

    // it('should toggle item', () => {
    //   let result;
    //   service.getTable().subscribe((table) => (result = table));
    //   service.toggle({ ...toggledUnit, expanded: false });
    //   verifyExpandedOne(result);
    //   service.toggle({ ...toggledUnit, expanded: true });
    //   verifyCollapsed(result);
    // });
    //
    // it('should expandAll and collapseAll', () => {
    //   let result;
    //   service.getTable().subscribe((table) => (result = table));
    //   service.expandAll();
    //   verifyExpandedAll(result);
    //   service.collapseAll();
    //   verifyCollapsed(result);
    // });
  });
});
