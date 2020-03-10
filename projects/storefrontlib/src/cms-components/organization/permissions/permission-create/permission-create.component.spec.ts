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
  EntitiesModel,
  B2BUnitNode,
  LanguageService,
  Period,
} from '@spartacus/core';

import { PermissionCreateComponent } from './permission-create.component';
import createSpy = jasmine.createSpy;
import { PermissionFormModule } from '../permission-form/permission-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const permissionCode = 'b1';

const mockPermission: Permission = {
  code: permissionCode,
  threshold: 231,
  orderApprovalPermissionType: { name: 'orderType' },
  periodRange: Period.MONTH,
  currency: {
    isocode: 'USD',
    symbol: '$',
  },
  orgUnit: { name: 'orgName', uid: 'orgUid' },
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

class MockPermissionService implements Partial<PermissionService> {
  create = createSpy('create');
  getTypes = createSpy('getTypes');
}

const mockRouterState = {
  state: {
    params: {
      permissionCode,
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

describe('PermissionCreateComponent', () => {
  let component: PermissionCreateComponent;
  let fixture: ComponentFixture<PermissionCreateComponent>;
  let permissionsService: MockPermissionService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, PermissionFormModule, RouterTestingModule],
      declarations: [PermissionCreateComponent],
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
    fixture = TestBed.createComponent(PermissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createPermission', () => {
    it('should create permission', () => {
      component.createPermission(mockPermission);
      expect(permissionsService.create).toHaveBeenCalledWith(mockPermission);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'permissionDetails',
        params: mockPermission,
      });
    });
  });
});
