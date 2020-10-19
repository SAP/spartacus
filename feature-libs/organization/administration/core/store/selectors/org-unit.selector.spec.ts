import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Address, B2BUnit, ListModel, StateUtils } from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';
import { OrgUnitActions } from '../actions/index';
import {
  ORGANIZATION_FEATURE,
  OrgUnits,
  StateWithOrganization,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { OrgUnitSelectors } from './index';

describe('OrgUnit Selectors', () => {
  let store: Store<StateWithOrganization>;

  const orgUnitId = 'testOrgUnitId';
  const orgUnit: Partial<B2BUnit> = { uid: orgUnitId, name: 'testOrgUnit' };

  const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
  const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };
  const address: Partial<Address> = { id: 'addressId' };

  const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

  const entities = {
    [orgUnitId]: {
      loading: false,
      error: false,
      success: true,
      value: orgUnit,
    },
  };

  const b2bAddress: Address = { id: 'addressId' };
  const addressId: string = b2bAddress.id;

  const page: ListModel = {
    ids: [addressId],
    sorts: [{ code: 'code' }],
  };

  const addressEntities = {
    [addressId]: {
      loading: false,
      error: false,
      success: true,
      value: address,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrgUnitsState ', () => {
    it('should return orgUnits state', () => {
      let result: OrgUnits;
      store
        .pipe(select(OrgUnitSelectors.getB2BOrgUnitState))
        .subscribe((value) => (result = value));

      store.dispatch(new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]));
      expect(result).toEqual({
        availableOrgUnitNodes: { entities: {} },
        addressEntities: { entities: {} },
        addressList: { entities: {} },
        entities: { entities },
        tree: { entities: {} },
        approvalProcesses: { entities: {} },
        users: { entities: {} },
      });
    });
  });

  describe('getOrgUnits', () => {
    it('should return orgUnits', () => {
      let result: StateUtils.EntityLoaderState<B2BUnitNode[]>;
      store
        .pipe(select(OrgUnitSelectors.getOrgUnitsNodeListState))
        .subscribe((value) => (result = value));

      store.dispatch(new OrgUnitActions.LoadOrgUnitNodesSuccess(orgUnitList));
      expect(result).toEqual({
        entities: {
          availableOrgUnitNodes: {
            loading: false,
            success: true,
            error: false,
            value: orgUnitList,
          },
        },
      });
    });
  });

  describe('getOrgUnit', () => {
    it('should return orgUnit by id', () => {
      let result: StateUtils.LoaderState<B2BUnit>;
      store
        .pipe(select(OrgUnitSelectors.getOrgUnit(orgUnitId)))
        .subscribe((value) => (result = value));

      store.dispatch(new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]));
      expect(result).toEqual(entities[orgUnitId]);
    });
  });

  describe('getAddressesState', () => {
    it('should get addresses state', () => {
      let result: StateUtils.EntityLoaderState<Address>;
      store
        .pipe(select(OrgUnitSelectors.getAddressesState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new OrgUnitActions.LoadAddressesSuccess({ page, orgUnitId })
      );
      expect(result).toEqual({
        entities: {},
      });
    });
  });

  describe('getB2BAddress', () => {
    it('should get B2B Address', () => {
      let result: StateUtils.LoaderState<Address>;
      store
        .pipe(select(OrgUnitSelectors.getB2BAddress(addressId)))
        .subscribe((value) => (result = value));

      store.dispatch(new OrgUnitActions.LoadAddressSuccess([address]));
      expect(result).toEqual(addressEntities[addressId]);
    });
  });
});
