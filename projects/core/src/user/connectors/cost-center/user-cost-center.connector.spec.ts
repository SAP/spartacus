import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import createSpy = jasmine.createSpy;
import { UserCostCenterAdapter } from './user-cost-center.adapter';
import { UserCostCenterConnector } from './user-cost-center.connector';

const userId = 'userId';
const costCenterCode = 'costCenterCode';

const costCenter = {
  code: costCenterCode,
};

class MockUserCostCenterAdapter implements UserCostCenterAdapter {
  loadActiveList = createSpy(
    'CostCenterAdapter.loadActiveList'
  ).and.returnValue(of([costCenter]));
}

describe('UserCostCenterConnector', () => {
  let service: UserCostCenterConnector;
  let adapter: UserCostCenterAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserCostCenterConnector,
        { provide: UserCostCenterAdapter, useClass: MockUserCostCenterAdapter },
      ],
    });

    service = TestBed.inject(
      UserCostCenterConnector as Type<UserCostCenterConnector>
    );
    adapter = TestBed.inject(
      UserCostCenterAdapter as Type<UserCostCenterAdapter>
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load active costCenters of user', () => {
    service.getActiveList(userId);
    expect(adapter.loadActiveList).toHaveBeenCalledWith(userId);
  });
});
