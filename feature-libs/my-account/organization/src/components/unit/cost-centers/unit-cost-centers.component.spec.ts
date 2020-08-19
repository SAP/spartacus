import { of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CostCenter,
  I18nTestingModule,
  RoutingService,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { UnitCostCentersComponent } from './unit-cost-centers.component';

import createSpy = jasmine.createSpy;

const code = 'b1';

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
  load = createSpy('load');
  getCostCenters = createSpy('getCostCenters').and.returnValue(
    of(mockedCostCenters)
  );
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

xdescribe('UnitCostCentersComponent', () => {
  let component: UnitCostCentersComponent;
  let fixture: ComponentFixture<UnitCostCentersComponent>;
  // let orgUnitsService: MockOrgUnitService;
  // let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [UnitCostCentersComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    // orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    // routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCostCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
