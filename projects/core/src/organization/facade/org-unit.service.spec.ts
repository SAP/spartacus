import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  B2BSearchConfig,
  CostCenter,
  EntitiesModel,
  ListModel,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '@spartacus/core';
import { of } from 'rxjs';
import {
  B2BAddress,
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
  B2BUser,
} from '../../model/org-unit.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { OrgUnitActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { OrgUnitService } from './org-unit.service';
import createSpy = jasmine.createSpy;

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

    it('getChildUnits()', () => {
      let unitNode: B2BUnitNode[];
      service
        .getChildUnits(orgUnitId)
        .subscribe((data) => {
          unitNode = data;
        })
        .unsubscribe();

      expect(unitNode).toEqual(undefined);
    });
  });

  describe('get Addresses', () => {
    it('getAddresses() should trigger loadAddresses when they are not present in the store', () => {
      let fetchedAddress: EntitiesModel<B2BAddress>;
      service
        .getAddresses(orgUnitId)
        .subscribe((data) => {
          fetchedAddress = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(fetchedAddress).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnit({
          userId,
          orgUnitId,
        })
      );
    });
  });

  describe('create, update & delete Address', () => {
    const address: B2BAddress = { id: 'adrId' };
    const addressId = 'testAddressId';

    it('should create address', () => {
      service.createAddress(orgUnitId, address);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.CreateAddress({ userId, orgUnitId, address })
      );
    });

    it('should update address', () => {
      service.updateAddress(orgUnitId, addressId, address);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.UpdateAddress({
          userId,
          orgUnitId,
          addressId,
          address,
        })
      );
    });

    it('should delete address', () => {
      service.deleteAddress(orgUnitId, addressId);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.DeleteAddress({
          userId,
          orgUnitId,
          addressId,
        })
      );
    });
  });

  describe('assign, unassign role', () => {
    const orgCustomerId = 'testOrgCustomerId';
    const roleId = 'testRoleId';

    it('should assign role', () => {
      service.assignRole(orgUnitId, orgCustomerId, roleId);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.AssignRole({
          userId,
          orgUnitId,
          orgCustomerId,
          roleId,
        })
      );
    });

    it('should unassign role', () => {
      service.unassignRole(orgUnitId, orgCustomerId, roleId);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.UnassignRole({
          userId,
          orgUnitId,
          orgCustomerId,
          roleId,
        })
      );
    });
  });

  describe('get approvalProcesses', () => {
    it('getApprovalProcesses() should trigger loadApprovalProcesses when they are not present in the store', () => {
      let approvalProcesses: B2BApprovalProcess[];
      service
        .getApprovalProcesses()
        .subscribe((data) => {
          approvalProcesses = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(approvalProcesses).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadApprovalProcesses({ userId })
      );
    });

    it('getApprovalProcesses() should be able to get approvalProcess when they are present in the store', () => {
      let b2bApprovalProcesses: B2BApprovalProcess[];
      const b2bMockApprovalProcesses: B2BApprovalProcess[] = [
        { code: 'testCode', name: 'testName' },
      ];

      store.dispatch(
        new OrgUnitActions.LoadApprovalProcessesSuccess(
          b2bMockApprovalProcesses
        )
      );

      service
        .getApprovalProcesses()
        .subscribe((data) => {
          b2bApprovalProcesses = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(b2bApprovalProcesses).toEqual(b2bMockApprovalProcesses);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitActions.LoadApprovalProcesses({ userId })
      );
    });
  });

  describe('create & update unit', () => {
    const unit: B2BUnit = { uid: 'testUid' };

    it('should create unit', () => {
      service.create(unit);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.CreateUnit({
          userId,
          unit,
        })
      );
    });

    it('should update unit', () => {
      const unitCode = 'testUnitCode';

      service.update(unitCode, unit);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.UpdateUnit({
          userId,
          unitCode,
          unit,
        })
      );
    });
  });

  describe('get Users', () => {
    const params: B2BSearchConfig = { sort: 'code' };
    const roleId = 'testRoleId';
    const page: ListModel = { ids: [userId], sorts: [{ code: 'code' }] };

    it('getUsers() should trigger loadUsers when they are not present in the store', () => {
      let users: EntitiesModel<B2BUser>;
      service
        .getUsers(orgUnitId, roleId, params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(users).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadAssignedUsers({
          userId,
          orgUnitId,
          roleId,
          params,
        })
      );
    });

    it('getUsers() should be able to get users when they are present in the store', () => {
      let b2bFetchedUsers: EntitiesModel<B2BUser>;
      const b2bMockUsers: B2BUser[] = [
        { uid: userId, orgUnit: orgUnit, roles: [roleId] },
      ];

      store.dispatch(
        new OrgUnitActions.LoadAssignedUsersSuccess({
          orgUnitId,
          roleId,
          page,
          params,
        })
      );

      service
        .getUsers(orgUnitId, roleId, params)
        .subscribe((data) => {
          b2bFetchedUsers = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(b2bFetchedUsers.values).toEqual(b2bMockUsers);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitActions.LoadAssignedUsers({
          userId,
          orgUnitId,
          roleId,
          params,
        })
      );
    });
  });
});
