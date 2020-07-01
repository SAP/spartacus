import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  BudgetService,
  RoutesConfig,
  RoutingConfig,
  Budget,
} from '@spartacus/core';

import { BudgetCostCentersComponent } from './budget-cost-centers.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { Table2Module } from '../../../../shared/components/table/table.module';

const code = 'b1';

const mockBudget: Budget = {
  code,
  name: 'budget1',
  budget: 2230,
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  startDate: '2010-01-01T00:00:00+0000',
  endDate: '2034-07-12T00:59:59+0000',
  orgUnit: { name: 'orgName' },
  costCenters: [
    { name: 'costCenter1', code: 'cc1' },
    { name: 'costCenter2', code: 'cc2' },
  ],
};
const mockBudgetUI: any = {
  code,
  name: 'budget1',
  budget: 2230,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  startDate: '2010-01-01T00:00:00+0000',
  endDate: '2034-07-12T00:59:59+0000',
  orgUnit: { name: 'orgName' },
  costCenters: [
    { name: 'costCenter1', code: 'cc1' },
    { name: 'costCenter2', code: 'cc2' },
  ],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
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

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

describe('BudgetCostCentersComponent', () => {
  let component: BudgetCostCentersComponent;
  let fixture: ComponentFixture<BudgetCostCentersComponent>;
  let budgetsService: MockBudgetService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, Table2Module, I18nTestingModule],
      declarations: [BudgetCostCentersComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BudgetService, useClass: MockBudgetService },
      ],
    }).compileComponents();

    budgetsService = TestBed.get(BudgetService as Type<BudgetService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetCostCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load costCenters', () => {
      component.ngOnInit();
      let costCenters: any;
      component.data$
        .subscribe((value) => {
          costCenters = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalledWith();
      expect(budgetsService.loadBudget).toHaveBeenCalledWith(code);
      expect(budgetsService.get).toHaveBeenCalledWith(code);
      expect(costCenters).toEqual(mockBudgetUI.costCenters);
    });
  });
});
