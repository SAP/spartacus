import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  Budget,
  CostCenterService,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { EMPTY, Observable, of } from 'rxjs';
import { CostCenterFormService } from '../../../../cost-center/form/cost-center-form.service';
import { CurrentCostCenterService } from '../../../../cost-center/services/current-cost-center.service';
import { UnitCostCenterItemService } from './unit-cost-center-item.service';

const mockCode = 'c1';
class MockRoutingService {
  go() {}
}

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockCostCenterService {
  load() {}
  get() {
    return EMPTY;
  }
  update() {}
  getLoadingStatus(): Observable<OrganizationItemStatus<Budget>> {
    return mockItemStatus;
  }
  create() {}
}

class MockCostCenterFormService {}

class MockCurrentCostCenterService {
  key$ = of(mockCode);
  load = vi.fn().mockReturnValue(EMPTY);
  error$ = of(false);
}
describe('UnitCostCenterItemService', () => {
  let service: UnitCostCenterItemService;
  let costCenterService: CostCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitCostCenterItemService,
        {
          provide: CurrentCostCenterService,
          useClass: MockCurrentCostCenterService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterFormService, useClass: MockCostCenterFormService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    });

    service = TestBed.inject(UnitCostCenterItemService);
    costCenterService = TestBed.inject(CostCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create cost center with unit.uid', () => {
    vi.spyOn(costCenterService, 'create');
    const form = new UntypedFormGroup({});
    form.setControl('name', new UntypedFormControl('cc name'));
    form.setControl(
      'unit',
      new UntypedFormGroup({
        uid: new UntypedFormControl('unit-uid'),
      })
    );
    form.get('unit').disable();

    expect(service.save(form)).toEqual(mockItemStatus);
    expect(costCenterService.create).toHaveBeenCalledWith({
      name: 'cc name',
      unit: { uid: 'unit-uid' },
    });
  });

  it('should launch orgUnitCostCenters with unit uid', () => {
    const routingService = TestBed.inject(RoutingService);
    vi.spyOn(routingService, 'go');
    service.launchDetails({
      code: 'c-1',
      name: 'foo bar',
      unit: { uid: 'unitUid' },
    });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitCostCenters',
      params: { uid: 'unitUid' },
    });
  });
});
