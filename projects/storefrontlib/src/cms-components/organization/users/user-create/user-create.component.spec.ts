import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  B2BUserService,
  RoutesConfig,
  RoutingConfig,
  B2BUser,
  OrgUnitService,
  Currency,
  CurrencyService,
  B2BUnitNode,
  LanguageService,
} from '@spartacus/core';

import { CreateComponent } from './user-create.component';
import createSpy = jasmine.createSpy;
import { B2BUserFormModule } from '../user-form/user-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const budgetCode = 'b1';

const mockB2BUser: B2BUser = {
  code: budgetCode,
  name: 'budget1',
  budget: 2230,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  startDate: '2010-01-01T00:00:00+0000',
  endDate: '2034-07-12T00:59:59+0000',
  orgUnit: { name: 'Org Unit 1', uid: 'unitNode1' },
  costCenters: [
    { name: 'costCenter1', code: 'cc1', originalCode: 'Cost Center 1' },
    { name: 'costCenter2', code: 'cc2', originalCode: 'Cost Center 2' },
  ],
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
  getActiveUnitList = createSpy('getActiveUnitList').and.returnValue(
    of(mockOrgUnits)
  );
  loadOrgUnitNodes = jasmine.createSpy('loadOrgUnitNodes');
}

class MockB2BUserService implements Partial<B2BUserService> {
  create = createSpy('create');
}

const mockRouterState = {
  state: {
    params: {
      budgetCode,
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

describe('B2BUserCreateComponent', () => {
  let component: B2BUserCreateComponent;
  let fixture: ComponentFixture<B2BUserCreateComponent>;
  let budgetsService: MockB2BUserService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, B2BUserFormModule, RouterTestingModule],
      declarations: [B2BUserCreateComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CurrencyService, useValue: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    }).compileComponents();

    budgetsService = TestBed.get(B2BUserService as Type<B2BUserService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createB2BUser', () => {
    it('should create budget', () => {
      component.createB2BUser(mockB2BUser);
      expect(budgetsService.create).toHaveBeenCalledWith(mockB2BUser);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'budgetDetails',
        params: mockB2BUser,
      });
    });
  });
});
