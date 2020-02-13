import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { CostCenter } from '../../model/cost-center.model';
import { EntitiesModel } from '../../model/misc.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { CostCenterActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { CostCenterService } from './cost-center.service';
import { B2BSearchConfig } from '../model/search-config';
import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '@spartacus/core';

const userId = 'current';
const costCenterCode = 'testCostCenter';
const costCenter = { code: costCenterCode };
const costCenter2 = { code: 'testCostCenter2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const costCenterList: EntitiesModel<CostCenter> = {
  values: [costCenter, costCenter2],
  pagination,
  sorts,
};

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('CostCenterService', () => {
  let service: CostCenterService;
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
        CostCenterService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.get(CostCenterService as Type<CostCenterService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CostCenterService is injected', inject(
    [CostCenterService],
    (costCenterService: CostCenterService) => {
      expect(costCenterService).toBeTruthy();
    }
  ));

  describe('get costCenter', () => {
    it('get() should trigger load costCenter details when they are not present in the store', () => {
      let costCenterDetails: CostCenter;
      service
        .get(costCenterCode)
        .subscribe(data => {
          costCenterDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(costCenterDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      );
    });

    it('get() should be able to get costCenter details when they are present in the store', () => {
      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      let costCenterDetails: CostCenter;
      service
        .get(costCenterCode)
        .subscribe(data => {
          costCenterDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(costCenterDetails).toEqual(costCenter);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      );
    });
  });

  describe('get costCenters', () => {
    const params: B2BSearchConfig = { sort: 'code' };

    it('getList() should trigger load costCenters when they are not present in the store', () => {
      let costCenters: EntitiesModel<CostCenter>;
      service
        .getList(params)
        .subscribe(data => {
          costCenters = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(costCenters).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenters({ userId, params })
      );
    });

    it('getList() should be able to get costCenters when they are present in the store', () => {
      store.dispatch(
        new CostCenterActions.LoadCostCenterSuccess([costCenter, costCenter2])
      );
      store.dispatch(
        new CostCenterActions.LoadCostCentersSuccess({
          params,
          page: {
            ids: [costCenter.code, costCenter2.code],
            pagination,
            sorts,
          },
        })
      );
      let costCenters: EntitiesModel<CostCenter>;
      service
        .getList(params)
        .subscribe(data => {
          costCenters = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(costCenters).toEqual(costCenterList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new CostCenterActions.LoadCostCenters({ userId, params })
      );
    });
  });

  describe('create costCenter', () => {
    it('create() should should dispatch CreateCostCenter action', () => {
      service.create(costCenter);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.CreateCostCenter({ userId, costCenter })
      );
    });
  });

  describe('update costCenter', () => {
    it('update() should should dispatch UpdateCostCenter action', () => {
      service.update(costCenterCode, costCenter);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new CostCenterActions.UpdateCostCenter({
          userId,
          costCenterCode,
          costCenter,
        })
      );
    });
  });
});
