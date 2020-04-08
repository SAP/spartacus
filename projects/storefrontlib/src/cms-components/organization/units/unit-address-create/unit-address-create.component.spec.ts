import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  RoutesConfig,
  RoutingConfig,
  OrgUnitService,
  Currency,
  CurrencyService,
  LanguageService,
  B2BAddress,
} from '@spartacus/core';

import { UnitAddressCreateComponent } from './unit-address-create.component';
import createSpy = jasmine.createSpy;
import { UnitFormModule } from '../unit-form/unit-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const orgUnitId = 'b1';
const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'orgUnit1',
};

const mockAddresses = [mockAddress];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  create = createSpy('create');
  getApprovalProcesses = createSpy('getApprovalProcesses');
  createAddress = createSpy('createAddress');
  loadAddresses = createSpy('loadAddresses');
  getAddress = createSpy('getAddress').and.returnValue(of(mockAddress));
  getAddresses = createSpy('getAddresses').and.returnValue(of(mockAddresses));
}

const mockRouterState = {
  state: {
    params: {
      code: orgUnitId,
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

describe('UnitAddressCreateComponent', () => {
  let component: UnitAddressCreateComponent;
  let fixture: ComponentFixture<UnitAddressCreateComponent>;
  let orgUnitService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UnitFormModule, RouterTestingModule],
      declarations: [UnitAddressCreateComponent],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createAddress', () => {
    it('should create orgUnit Address', () => {
      component.createAddress(mockAddress);
      expect(orgUnitService.createAddress).toHaveBeenCalledWith(mockAddress);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orgUnitManageAddresses',
        params: { code: orgUnitId },
      });
    });
  });
});
