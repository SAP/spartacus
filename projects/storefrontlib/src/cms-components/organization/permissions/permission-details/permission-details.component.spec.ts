import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  PermissionService,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  Permission,
  Period,
} from '@spartacus/core';

import { PermissionDetailsComponent } from './permission-details.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { TableModule } from '../../../../shared/components/table/table.module';

const code = 'b1';

const mockPermission: Permission = {
  code,
  threshold: 231,
  orderApprovalPermissionType: { name: 'orderType' },
  periodRange: Period.MONTH,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  orgUnit: { name: 'orgName', uid: 'orgUid' },
};

const mockPermissionUI: any = {
  code,
  threshold: 231,
  orderApprovalPermissionType: { name: 'orderType' },
  periodRange: Period.MONTH,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  orgUnit: { name: 'orgName', uid: 'orgUid' },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockPermissionService implements Partial<PermissionService> {
  loadPermission = createSpy('loadPermission');
  get = createSpy('get').and.returnValue(of(mockPermission));
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

describe('PermissionDetailsComponent', () => {
  let component: PermissionDetailsComponent;
  let fixture: ComponentFixture<PermissionDetailsComponent>;
  let permissionsService: MockPermissionService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, I18nTestingModule],
      declarations: [PermissionDetailsComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    }).compileComponents();

    permissionsService = TestBed.get(PermissionService as Type<
      PermissionService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load permission', () => {
      component.ngOnInit();
      let permission: any;
      component.permission$
        .subscribe(value => {
          permission = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(permissionsService.loadPermission).toHaveBeenCalledWith(code);
      expect(permissionsService.get).toHaveBeenCalledWith(code);
      expect(permission).toEqual(mockPermissionUI);
    });
  });

  describe('update', () => {
    it('should update permission', () => {
      component.ngOnInit();

      component.update({ active: false });
      expect(permissionsService.update).toHaveBeenCalledWith(code, {
        active: false,
      });

      component.update({ active: true });
      expect(permissionsService.update).toHaveBeenCalledWith(code, {
        active: true,
      });
    });
  });
});
