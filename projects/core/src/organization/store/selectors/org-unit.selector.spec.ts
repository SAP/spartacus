import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { B2BUnitNode } from '../../../model/org-unit.model';
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

  const id = 'testId';
  const orgUnit: B2BUnitNode = {
    id,
    name: 'testOrgUnit',
  };
  const orgUnit2: B2BUnitNode = {
    id: 'testId2',
    name: 'testOrgUnit2',
  };

  const entities = {
    testId: {
      loading: false,
      error: false,
      success: true,
      value: orgUnit,
    },
    testId2: {
      loading: false,
      error: false,
      success: true,
      value: orgUnit2,
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

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrgUnitsState ', () => {
    it('should return orgUnits state', () => {
      let result: OrgUnits;
      store
        .pipe(select(OrgUnitSelectors.getB2BOrgUnitState))
        .subscribe(value => (result = value));

      store.dispatch(
        new OrgUnitActions.LoadOrgUnitSuccess([orgUnit, orgUnit2])
      );
      expect(result).toEqual({
        entities: { entities },
        list: { entities: {} },
      });
    });
  });

  describe('getOrgUnits', () => {
    it('should return orgUnits', () => {
      let result: EntityLoaderState<B2BUnitNode>;
      store
        .pipe(select(OrgUnitSelectors.getOrgUnitsState))
        .subscribe(value => (result = value));

      store.dispatch(
        new OrgUnitActions.LoadOrgUnitSuccess([orgUnit, orgUnit2])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getOrgUnit', () => {
    it('should return orgUnit by id', () => {
      let result: LoaderState<B2BUnitNode>;
      store
        .pipe(select(OrgUnitSelectors.getOrgUnitState(id)))
        .subscribe(value => (result = value));

      store.dispatch(
        new OrgUnitActions.LoadOrgUnitSuccess([orgUnit, orgUnit2])
      );
      expect(result).toEqual(entities.testId);
    });
  });
});
