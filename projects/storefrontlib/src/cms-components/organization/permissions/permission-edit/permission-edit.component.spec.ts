import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  PermissionService,
  RoutesConfig,
  RoutingConfig,
  Permission,
  OrgUnitService,
  Currency,
  CurrencyService,
  B2BUnitNode,
  LanguageService,
  Period,
} from '@spartacus/core';

import { PermissionEditComponent } from './permission-edit.component';
import createSpy = jasmine.createSpy;
import { PermissionFormModule } from '../permission-form/permission-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

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

class MockPermissionService implements Partial<PermissionService> {
  loadPermission = createSpy('loadPermission');
  get = createSpy('get').and.returnValue(of(mockPermission));
  update = createSpy('update');
  getTypes = createSpy('getTypes');
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

describe('PermissionEditComponent', () => {
  let component: PermissionEditComponent;
  let fixture: ComponentFixture<PermissionEditComponent>;
  let permissionsService: MockPermissionService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, PermissionFormModule, RouterTestingModule],
      declarations: [PermissionEditComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: CurrencyService, useValue: MockCurrencyService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    }).compileComponents();

    permissionsService = TestBed.get(
      PermissionService as Type<PermissionService>
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionEditComponent);
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
      expect(permission).toEqual(mockPermission);
    });
  });

  describe('update', () => {
    it('should update permission', () => {
      component.ngOnInit();
      const updatePermission = {
        code: code,
        name: 'newName',
        active: false,
      };

      component.updatePermission(updatePermission);
      expect(permissionsService.update).toHaveBeenCalledWith(
        code,
        updatePermission
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'permissionDetails',
        params: updatePermission,
      });
    });
  });
});
