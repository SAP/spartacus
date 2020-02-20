import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  CostCenterService,
  RoutesConfig,
  RoutingConfig,
  CostCenter,
  OrgUnitService,
  Currency,
  CurrencyService,
  EntitiesModel,
  B2BUnitNode,
  LanguageService,
} from '@spartacus/core';

import { CostCenterCreateComponent } from './cost-center-create.component';
import createSpy = jasmine.createSpy;
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const costCenterCode = 'b1';

const mockCostCenter: CostCenter = {
  code: costCenterCode,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  unit: { name: 'orgName', uid: 'orgCode' },
};

const mockOrgUnits: EntitiesModel<B2BUnitNode> = {
  values: [
    {
      active: true,
      children: [],
      id: 'unitNode1',
      name: 'Org Unit 1',
      parent: 'parentUnit',
    },
  ],
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

class MockCostCenterService implements Partial<CostCenterService> {
  create = createSpy('create');
}

const mockRouterState = {
  state: {
    params: {
      costCenterCode,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

const mockCurrencies: Currency[] = [
  { active: true, isocode: 'USD', name: 'Dolar', symbol: '$' },
  { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
];
const mockActiveCurr = 'USD';
const MockCurrencyService = {
  active: mockActiveCurr,
  getAll(): Observable<Currency[]> {
    return of(mockCurrencies);
  },
  getActive(): Observable<string> {
    return of(this.active);
  },
  setActive(isocode: string): void {
    this.active = isocode;
  },
};

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class LanguageServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

describe('CostCenterCreateComponent', () => {
  let component: CostCenterCreateComponent;
  let fixture: ComponentFixture<CostCenterCreateComponent>;
  let costCentersService: MockCostCenterService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CostCenterFormModule, RouterTestingModule],
      declarations: [CostCenterCreateComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CurrencyService, useValue: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: CostCenterService, useClass: MockCostCenterService },
      ],
    }).compileComponents();

    costCentersService = TestBed.get(CostCenterService as Type<
      CostCenterService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createCostCenter', () => {
    it('should create costCenter', () => {
      component.createCostCenter(mockCostCenter);
      expect(costCentersService.create).toHaveBeenCalledWith(mockCostCenter);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: mockCostCenter,
      });
    });
  });
});
