import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  OrgUnitService,
  RoutesConfig,
  RoutingConfig,
  B2BUnit,
  CostCenter,
} from '@spartacus/core';

import { UnitCostCentersComponent } from './unit-cost-centers.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { TableModule } from '../../../../shared/components/table/table.module';

const code = 'b1';

const mockOrgUnit: B2BUnit = {
  uid: code,
  name: 'orgUnit1',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockedCostCenters: CostCenter[] = [
  {
    code: 'c1',
    name: 'n1',
    currency: {
      symbol: '$',
      isocode: 'USD',
    },
    unit: { name: 'orgName', uid: 'orgUid' },
  },
  {
    code: 'c2',
    name: 'n2',
    currency: {
      symbol: '$',
      isocode: 'USD',
    },
    unit: { name: 'orgName2', uid: 'orgUid2' },
  },
];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnit = createSpy('loadOrgUnit');
  getCostCenters = createSpy('getCostCenters').and.returnValue(of(mockOrgUnit));
  update = createSpy('update');
}
const mockRouterState = {
  state: {
    params: {
      code,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

describe('UnitCostCentersComponent', () => {
  let component: UnitCostCentersComponent;
  let fixture: ComponentFixture<UnitCostCentersComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, I18nTestingModule],
      declarations: [UnitCostCentersComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCostCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load cost centers', () => {
      component.ngOnInit();
      let costCenters: CostCenter[];
      component.data$
        .subscribe((value) => {
          costCenters = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(orgUnitsService.loadOrgUnit).toHaveBeenCalledWith(code);
      expect(orgUnitsService.getCostCenters).toHaveBeenCalledWith(code);
      expect(costCenters).toEqual(mockedCostCenters);
    });
  });
});
