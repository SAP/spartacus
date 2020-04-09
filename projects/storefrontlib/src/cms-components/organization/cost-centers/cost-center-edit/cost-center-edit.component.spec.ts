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
  B2BUnitNode,
  LanguageService,
} from '@spartacus/core';

import { CostCenterEditComponent } from './cost-center-edit.component';
import createSpy = jasmine.createSpy;
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const code = 'b1';

const mockCostCenter: CostCenter = {
  code,
  name: 'costCenter1',
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  unit: { name: 'orgName', uid: 'orgCode' },
};

const mockOrgUnits: B2BUnitNode[] = [
  {
    active: true,
    children: [],
    id: 'unitNode1',
    name: 'Org Unit 1',
    parent: 'parentUnit',
  },
];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

class MockCostCenterService implements Partial<CostCenterService> {
  loadCostCenter = createSpy('loadCostCenter');
  get = createSpy('get').and.returnValue(of(mockCostCenter));
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

describe('CostCenterEditComponent', () => {
  let component: CostCenterEditComponent;
  let fixture: ComponentFixture<CostCenterEditComponent>;
  let costCentersService: MockCostCenterService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CostCenterFormModule, RouterTestingModule],
      declarations: [CostCenterEditComponent],
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

    costCentersService = TestBed.get(
      CostCenterService as Type<CostCenterService>
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load costCenter', () => {
      component.ngOnInit();
      let costCenter: any;
      component.costCenter$
        .subscribe((value) => {
          costCenter = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(costCentersService.loadCostCenter).toHaveBeenCalledWith(code);
      expect(costCentersService.get).toHaveBeenCalledWith(code);
      expect(costCenter).toEqual(mockCostCenter);
    });
  });

  describe('update', () => {
    it('should update costCenter', () => {
      component.ngOnInit();
      const updateCostCenter = {
        code,
        name: 'newName',
        activeFlag: false,
      };

      component.updateCostCenter(updateCostCenter);
      expect(costCentersService.update).toHaveBeenCalledWith(
        code,
        updateCostCenter
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'costCenterDetails',
        params: updateCostCenter,
      });
    });
  });
});
