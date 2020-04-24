import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  BudgetService,
  RoutesConfig,
  RoutingConfig,
  Budget,
  OrgUnitService,
  Currency,
  CurrencyService,
  B2BUnitNode,
  LanguageService,
} from '@spartacus/core';

import { BudgetEditComponent } from './budget-edit.component';
import createSpy = jasmine.createSpy;
import { BudgetFormModule } from '../budget-form/budget-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const code = 'b1';

const mockBudget: Budget = {
  code,
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
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

class MockBudgetService implements Partial<BudgetService> {
  loadBudget = createSpy('loadBudget');
  get = createSpy('get').and.returnValue(of(mockBudget));
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

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;
  let budgetsService: MockBudgetService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, BudgetFormModule, RouterTestingModule],
      declarations: [BudgetEditComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CurrencyService, useValue: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    }).compileComponents();

    budgetsService = TestBed.get(BudgetService as Type<BudgetService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load budget', () => {
      component.ngOnInit();
      let budget: any;
      component.budget$
        .subscribe((value) => {
          budget = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(budgetsService.loadBudget).toHaveBeenCalledWith(code);
      expect(budgetsService.get).toHaveBeenCalledWith(code);
      expect(budget).toEqual(mockBudget);
    });
  });

  describe('update', () => {
    it('should update budget', () => {
      component.ngOnInit();
      const updateBudget = {
        code: code,
        name: 'newName',
        active: false,
      };

      component.updateBudget(updateBudget);
      expect(budgetsService.update).toHaveBeenCalledWith(code, updateBudget);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'budgetDetails',
        params: updateBudget,
      });
    });
  });
});
