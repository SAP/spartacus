import {
  Pipe,
  PipeTransform,
  Type,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  CostCenterService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  CostCenter,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';

import { CostCenterListComponent } from './cost-center-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockCostCenterList: EntitiesModel<CostCenter> = {
  values: [
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
      unit: { name: 'orgName', uid: 'orgUid' },
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockCostCenterUIList = {
  values: [
    {
      code: 'c1',
      name: 'n1',
      currency: 'USD',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
    {
      code: 'c2',
      name: 'n2',
      currency: 'USD',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};
@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const costCenterList = new BehaviorSubject(mockCostCenterList);

class MockCostCenterService implements Partial<CostCenterService> {
  loadCostCenters = createSpy('loadCostCenters');

  getList = createSpy('getList').and.returnValue(costCenterList);
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        queryParams: {
          sort: 'byName',
          currentPage: '0',
          pageSize: '5',
        },
      },
    });
  }
}
const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

describe('CostCenterListComponent', () => {
  let component: CostCenterListComponent;
  let fixture: ComponentFixture<CostCenterListComponent>;
  let costCentersService: MockCostCenterService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        CostCenterListComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CostCenterService, useClass: MockCostCenterService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    costCentersService = TestBed.get(
      CostCenterService as Type<CostCenterService>
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterListComponent);
    component = fixture.componentInstance;
    costCenterList.next(mockCostCenterList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No costCenters found page if no costCenters are found', () => {
    const emptyCostCenterList: EntitiesModel<CostCenter> = {
      values: [],
      pagination: {
        totalPages: 0,
        pageSize: 0,
        currentPage: 0,
        totalResults: 0,
        sort: 'byName',
      },
      sorts: [{ code: 'byName', selected: true }],
    };

    costCenterList.next(emptyCostCenterList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read costCenter list', () => {
      component.ngOnInit();
      let costCentersList: any;
      component.data$
        .subscribe(value => {
          costCentersList = value;
        })
        .unsubscribe();
      expect(costCentersService.loadCostCenters).toHaveBeenCalledWith(
        defaultParams
      );
      expect(costCentersService.getList).toHaveBeenCalledWith(defaultParams);
      expect(costCentersList).toEqual(mockCostCenterUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component.changeSortCode('byCode');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'costCenters',
        },
        {
          sort: 'byCode',
        }
      );
    });
  });

  describe('pageChange', () => {
    it('should set correctly page', () => {
      component.pageChange(2);
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'costCenters',
        },
        {
          currentPage: 2,
        }
      );
    });
  });
});
