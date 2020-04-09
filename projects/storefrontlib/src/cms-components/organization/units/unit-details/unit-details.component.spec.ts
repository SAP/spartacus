import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  OrgUnitService,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  B2BUnit,
} from '@spartacus/core';

import { UnitDetailsComponent } from './unit-details.component';
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

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnit = createSpy('loadOrgUnit');
  get = createSpy('get').and.returnValue(of(mockOrgUnit));
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

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

describe('OrgUnitDetailsComponent', () => {
  let component: UnitDetailsComponent;
  let fixture: ComponentFixture<UnitDetailsComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, I18nTestingModule],
      declarations: [UnitDetailsComponent, MockUrlPipe],
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
    fixture = TestBed.createComponent(UnitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load orgUnit', () => {
      component.ngOnInit();
      let orgUnit: any;
      component.orgUnit$
        .subscribe((value) => {
          orgUnit = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(orgUnitsService.loadOrgUnit).toHaveBeenCalledWith(code);
      expect(orgUnitsService.get).toHaveBeenCalledWith(code);
      expect(orgUnit).toEqual(mockOrgUnit);
    });
  });

  describe('update', () => {
    it('should update orgUnit', () => {
      component.ngOnInit();

      component.update({ active: false });
      expect(orgUnitsService.update).toHaveBeenCalledWith(code, {
        active: false,
      });

      component.update({ active: true });
      expect(orgUnitsService.update).toHaveBeenCalledWith(code, {
        active: true,
      });
    });
  });
});
