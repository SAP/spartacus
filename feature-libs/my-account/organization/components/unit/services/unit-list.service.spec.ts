import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { B2BUnitNode } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitListService } from './unit-list.service';
import { UnitItemService } from './unit-item.service';

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
          children: [
            {
              active: true,
              children: [],
              id: 'Test',
              name: 'TestUnit',
              parent: 'Custom Retail',
            },
          ],
          id: 'Custom Retail',
          name: 'Custom Retail',
          parent: 'Rustic Retail',
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

fdescribe('UnitListService', () => {
  let service: UnitListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UnitListService,

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
      expect(result.data.length).toBe(3);
      expect(result.data[0].uid).toEqual('Rustic');
      expect(result.data[1].uid).toEqual('Rustic Services');
      expect(result.data[2].uid).toEqual('Rustic Retail');
    });
  });
});
