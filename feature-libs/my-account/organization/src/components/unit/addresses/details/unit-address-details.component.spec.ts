import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  OrgUnitService,
  RoutesConfig,
  RoutingConfig,
  B2BAddress,
} from '@spartacus/core';

import { UnitAddressDetailsComponent } from './unit-address-details.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { Table2Module } from '@spartacus/storefront';

const code = 'b1';
const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'orgUnit1',
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadList = createSpy('loadList');
  create = createSpy('create');
  getApprovalProcesses = createSpy('getApprovalProcesses');
  createAddress = createSpy('createAddress');
  loadAddresses = createSpy('loadAddresses');
  deleteAddress = createSpy('deleteAddress');
  getAddress = createSpy('getAddress').and.returnValue(of(mockAddress));
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const mockRouterState = {
  state: {
    params: {
      code,
      id: addressId,
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

describe('UnitAddressDetailsComponent', () => {
  let component: UnitAddressDetailsComponent;
  let fixture: ComponentFixture<UnitAddressDetailsComponent>;
  let orgUnitsService: MockOrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, Table2Module, I18nTestingModule],
      declarations: [UnitAddressDetailsComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteAddress', () => {
    it('should deleteAddress', () => {
      component.deleteAddress();
      expect(orgUnitsService.deleteAddress).toHaveBeenCalledWith(
        code,
        mockAddress.id
      );
    });
  });
});
