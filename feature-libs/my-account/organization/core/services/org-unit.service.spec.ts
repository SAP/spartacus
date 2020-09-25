import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  B2BAddress,
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
  B2BUser,
  CostCenter,
  EntitiesModel,
  ListModel,
  SearchConfig,
} from '@spartacus/core';
import { of } from 'rxjs';
import { B2BUserActions, OrgUnitActions } from '../store/actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../store/organization-state';
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

const address: B2BAddress = { id: 'adrId' };
const addressId = 'testAddressId';
const orgCustomerId = 'testOrgCustomerId';
const roleId = 'testRoleId';
const unit: B2BUnit = { uid: 'testUid' };

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

      expect(authService.getOccUserId).toHaveBeenCalledWith();
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
      let costCenters: EntitiesModel<CostCenter>;
      service
        .getCostCenters(orgUnitId)
        .subscribe((data) => {
          costCenters = data;
        })
        .unsubscribe();

      expect(costCenters).toEqual({ values: orgUnit.costCenters });
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

      expect(authService.getOccUserId).toHaveBeenCalledWith();
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
      store.dispatch(new OrgUnitActions.LoadTreeSuccess(mockedTree));
      let unitNode: EntitiesModel<B2BUnitNode>;
      service
        .getChildUnits(mockedTree.children[0].id)
        .subscribe((data) => {
          unitNode = data;
        })
        .unsubscribe();
      expect(unitNode).toEqual({ values: mockedTree.children[0].children });
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

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(fetchedAddress).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnit({
          userId,
          orgUnitId,
        })
      );
    });
  });

  describe('create Address', () => {
    it('should create address', () => {
      service.createAddress(orgUnitId, address);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.CreateAddress({ userId, orgUnitId, address })
      );
    });
  });

  describe('update Address', () => {
    it('should update address', () => {
      service.updateAddress(orgUnitId, addressId, address);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.UpdateAddress({
          userId,
          orgUnitId,
          addressId,
          address,
        })
      );
    });
  });

  describe('delete Address', () => {
    it('should delete address', () => {
      service.deleteAddress(orgUnitId, addressId);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.DeleteAddress({
          userId,
          orgUnitId,
          addressId,
        })
      );
    });
  });

  describe('assign role', () => {
    it('should assign role', () => {
      service.assignRole(orgCustomerId, roleId);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.AssignRole({
          userId,
          orgCustomerId,
          roleId,
        })
      );
    });
  });

  describe('unassign role', () => {
    it('should unassign role', () => {
      service.unassignRole(orgCustomerId, roleId);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.UnassignRole({
          userId,
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

      expect(authService.getOccUserId).toHaveBeenCalledWith();
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

  describe('create unit', () => {
    it('should create unit', () => {
      service.create(unit);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.CreateUnit({
          userId,
          unit,
        })
      );
    });
  });

  describe('update unit', () => {
    it('should update unit', () => {
      const unitCode = 'testUnitCode';

      service.update(unitCode, unit);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
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
    const params: SearchConfig = { sort: 'code' };
    const customerId = 'customerId';
    const customerId2 = 'customerId2';
    const user1 = {
      uid: 'aaa@bb',
      customerId,
      orgUnit: orgUnit,
      roles: [roleId],
    };
    const user2 = {
      uid: 'bb@aa',
      customerId: customerId2,
      orgUnit: orgUnit,
      roles: [roleId],
    };
    const page: ListModel = {
      ids: [customerId, customerId2],
      sorts: [{ code: 'code' }],
    };
    const mockedUsers: B2BUser[] = [user1, user2];

    it('getUsers() should trigger loadUsers when they are not present in the store', () => {
      let users: EntitiesModel<B2BUser>;
      service
        .getUsers(orgUnitId, roleId, params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalledWith();
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
      store.dispatch(new B2BUserActions.LoadB2BUserSuccess(mockedUsers));
      store.dispatch(
        new OrgUnitActions.LoadAssignedUsersSuccess({
          orgUnitId,
          roleId,
          page,
          params,
        })
      );
      let users: EntitiesModel<B2BUser>;
      service
        .getUsers(orgUnitId, roleId, params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(users.values).toEqual(mockedUsers);
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

  describe('assign approver', () => {
    it('should assign approver', () => {
      service.assignApprover(orgUnitId, orgCustomerId, roleId);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.AssignApprover({
          userId,
          orgUnitId,
          orgCustomerId,
          roleId,
        })
      );
    });
  });

  describe('unassign approver', () => {
    it('should unassign approver', () => {
      service.unassignApprover(orgUnitId, orgCustomerId, roleId);

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.UnassignApprover({
          userId,
          orgUnitId,
          orgCustomerId,
          roleId,
        })
      );
    });
  });

  describe('get active unit list', () => {
    it('getActiveUnitList() when active units are not present in the store', () => {
      let unitNodes: B2BUnitNode[];
      service
        .getActiveUnitList()
        .subscribe((data) => {
          unitNodes = data;
        })
        .unsubscribe();

      expect(unitNodes).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadOrgUnitNodes({ userId })
      );
    });
  });

  describe('get tree', () => {
    it('getTree() should trigger loadTree when they are not present in the store', () => {
      let unitNode: B2BUnitNode;
      service
        .getTree()
        .subscribe((data) => {
          unitNode = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalledWith();
      expect(unitNode).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitActions.LoadTree({ userId })
      );
    });

    it('getTree() should be able to get tree when they are present in the store', () => {
      let resultUnitNode: B2BUnitNode;
      const mockedUnitNode: B2BUnitNode = { id: 'testUnitNodeId' };

      store.dispatch(new OrgUnitActions.LoadTreeSuccess(mockedUnitNode));

      service
        .getTree()
        .subscribe((data) => {
          resultUnitNode = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(resultUnitNode).toEqual(resultUnitNode);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitActions.LoadTree({ userId })
      );
    });
  });
});
