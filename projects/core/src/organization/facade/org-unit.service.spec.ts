import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { B2BUnit, B2BUnitNode } from '../../model/org-unit.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { OrgUnitActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { OrgUnitService } from './org-unit.service';
import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  CostCenter,
} from '@spartacus/core';

const userId = 'current';
const orgUnitId = 'testOrgUnit';
const orgUnit: Partial<B2BUnit> = { uid: orgUnitId, costCenters: [] };

const mockedTree = {
  active: true,
  children: [
    {
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
      id: 'Rustic Services',
      name: 'Rustic Services',
      parent: 'Rustic',
    },
    {
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
      id: 'Rustic Retail',
      name: 'Rustic Retail',
      parent: 'Rustic',
    },
  ],
  id: 'Rustic',
  name: 'Rustic',
};

const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };

const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('OrgUnitService', () => {
  let service: OrgUnitService;
  let authService: AuthService;
  let store: Store<StateWithOrganization>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        OrgUnitService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should OrgUnitService is injected', inject(
    [OrgUnitService],
    (orgUnitService: OrgUnitService) => {
      expect(orgUnitService).toBeTruthy();
    }
  ));

  describe('get orgUnit', () => {
    it('get() should trigger load orgUnit details when they are not present in the store', () => {
      let orgUnitDetails: B2BUnitNode;
      service
        .get(orgUnitId)
        .subscribe((data) => {
          orgUnitDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(orgUnitDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId })
      );
    });

    it('get() should be able to get orgUnit details when they are present in the store', () => {
      store.dispatch(new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]));
      let orgUnitDetails: B2BUnitNode;
      service
        .get(orgUnitId)
        .subscribe((data) => {
          orgUnitDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orgUnitDetails).toEqual(orgUnit);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId })
      );
    });
  });

  describe('get CostCenters', () => {
    it('getCostCenters() should trigger get()', () => {
      store.dispatch(new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]));
      let costCenters: CostCenter[];
      service
        .getCostCenters(orgUnitId)
        .subscribe((data) => {
          costCenters = data;
        })
        .unsubscribe();

      expect(costCenters).toEqual(orgUnit.costCenters);
    });
  });

  describe('get orgUnits', () => {
    it('getList() should trigger load orgUnits when they are not present in the store', () => {
      let orgUnits: B2BUnitNode[];
      service
        .getList()
        .subscribe((data) => {
          orgUnits = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(orgUnits).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnitNodes({ userId })
      );
    });

    it('getList() should be able to get orgUnits when they are present in the store', () => {
      store.dispatch(
        new OrgUnitActions.LoadOrgUnitNodesSuccess([orgUnitNode, orgUnitNode2])
      );
      let orgUnits: B2BUnitNode[];
      service
        .getList()
        .subscribe((data) => {
          orgUnits = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orgUnits).toEqual(orgUnitList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnitNodes({ userId })
      );
    });
  });

  describe('get ChildUnits', () => {
    it('findUnitChildrenInTree', () => {
      expect(
        service['findUnitChildrenInTree'](mockedTree.id, mockedTree)
      ).toEqual(mockedTree.children);

      expect(
        service['findUnitChildrenInTree'](mockedTree.children[0].id, mockedTree)
      ).toEqual(mockedTree.children[0].children);

      expect(
        service['findUnitChildrenInTree'](
          mockedTree.children[0].children[0].id,
          mockedTree
        )
      ).toEqual(mockedTree.children[0].children[0].children);

      expect(
        service['findUnitChildrenInTree'](
          mockedTree.children[0].children[1].id,
          mockedTree
        )
      ).toEqual(mockedTree.children[0].children[1].children);

      expect(
        service['findUnitChildrenInTree'](mockedTree.children[1].id, mockedTree)
      ).toEqual(mockedTree.children[1].children);

      expect(
        service['findUnitChildrenInTree'](
          mockedTree.children[1].children[0].id,
          mockedTree
        )
      ).toEqual(mockedTree.children[1].children[0].children);

      expect(
        service['findUnitChildrenInTree'](
          mockedTree.children[1].children[0].children[0].id,
          mockedTree
        )
      ).toEqual(mockedTree.children[1].children[0].children[0].children);

      expect(service['findUnitChildrenInTree']('Fake ID', mockedTree)).toEqual(
        []
      );
    });
  });
});
