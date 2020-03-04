import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  OrgUnitService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  OrgUnit,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';

import { OrgUnitListComponent } from './cost-center-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockOrgUnitList: EntitiesModel<OrgUnit> = {
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
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockOrgUnitUIList = {
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
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const orgUnitList = new BehaviorSubject(mockOrgUnitList);

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');

  getList = createSpy('getList').and.returnValue(orgUnitList);
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

describe('OrgUnitListComponent', () => {
  let component: OrgUnitListComponent;
  let fixture: ComponentFixture<OrgUnitListComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [OrgUnitListComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUnitListComponent);
    component = fixture.componentInstance;
    orgUnitList.next(mockOrgUnitList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No orgUnits found page if no orgUnits are found', () => {
    const emptyOrgUnitList: EntitiesModel<OrgUnit> = {
      values: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    orgUnitList.next(emptyOrgUnitList);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.cx-no-orgUnits'))
    ).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read orgUnit list', () => {
      component.ngOnInit();
      let orgUnitsList: any;
      component.data$
        .subscribe(value => {
          orgUnitsList = value;
        })
        .unsubscribe();
      expect(orgUnitsService.loadOrgUnits).toHaveBeenCalledWith(defaultParams);
      expect(orgUnitsService.getList).toHaveBeenCalledWith(defaultParams);
      expect(orgUnitsList).toEqual(mockOrgUnitUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component.changeSortCode('byCode');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'orgUnits',
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
          cxRoute: 'orgUnits',
        },
        {
          currentPage: 2,
        }
      );
    });
  });
});
