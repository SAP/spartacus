import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import {
  // B2BAddress,
  B2BUnit,
  B2BUnitNode,
} from '../../../model/org-unit.model';
import { OrgUnitActions } from '../actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  OrgUnits,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { OrgUnitSelectors } from '../selectors/index';
import { EntityLoaderState, LoaderState } from '@spartacus/core';

describe('OrgUnit Selectors', () => {
  let store: Store<StateWithOrganization>;

  const orgUnitId = 'testOrgUnitId';
  const orgUnit: Partial<B2BUnit> = { uid: orgUnitId, name: 'testOrgUnit' };

  const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
  const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };
  // const address: Partial<B2BAddress> = { id: 'addressId' };

  const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

  const entities = {
    [orgUnitId]: {
      loading: false,
      error: false,
      success: true,
      value: orgUnit,
    },
  };

  // const addressEntities = {
  //   [orgUnitId]: {
  //     loading: false,
  //     error: false,
  //     success: true,
  //     value: address,
  //   },
  // };

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

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrgUnitsState ', () => {
    it('should return orgUnits state', () => {
      let result: OrgUnits;
      store
        .pipe(select(OrgUnitSelectors.getB2BOrgUnitState))
        .subscribe(value => (result = value));

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
      let result: EntityLoaderState<B2BUnitNode[]>;
      store
        .pipe(select(OrgUnitSelectors.getOrgUnitsNodeListState))
        .subscribe(value => (result = value));

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
      let result: LoaderState<B2BUnit>;
      store
        .pipe(select(OrgUnitSelectors.getOrgUnit(orgUnitId)))
        .subscribe(value => (result = value));

      store.dispatch(new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]));
      expect(result).toEqual(entities[orgUnitId]);
    });
  });
});
