import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  OrgUnitService,
  RoutesConfig,
  RoutingConfig,
  B2BAddress,
} from '@spartacus/core';

import { UnitAddressEditComponent } from './unit-address-edit.component';
import createSpy = jasmine.createSpy;
import { UnitFormModule } from '../unit-form/unit-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const code = 'b1';
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
  updateAddress = createSpy('updateAddress');
  loadAddresses = createSpy('loadAddresses');
  getAddress = createSpy('getAddress').and.returnValue(of(mockAddress));
  getAddresses = createSpy('getAddresses').and.returnValue(of(mockAddresses));
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

describe('UnitAddressEditComponent', () => {
  let component: UnitAddressEditComponent;
  let fixture: ComponentFixture<UnitAddressEditComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UnitFormModule, RouterTestingModule],
      declarations: [UnitAddressEditComponent],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    orgUnitsService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressEditComponent);
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
      component.address$
        .subscribe((value) => {
          orgUnit = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(orgUnitsService.loadAddresses).toHaveBeenCalledWith(code);
      expect(orgUnitsService.getAddress).toHaveBeenCalledWith(
        code,
        mockAddress.id
      );
      expect(orgUnit).toEqual({ ...mockAddress, orgUnitId: code });
    });
  });

  describe('update', () => {
    it('should update orgUnit', () => {
      component.ngOnInit();
      const updateAddress = {
        id: addressId,
        firstName: 'a2',
      };

      component.updateAddress(updateAddress);
      expect(orgUnitsService.updateAddress).toHaveBeenCalledWith(
        code,
        mockAddress.id,
        updateAddress
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orgUnitAddressDetails',
        params: { id: addressId, code },
      });
    });
  });
});
