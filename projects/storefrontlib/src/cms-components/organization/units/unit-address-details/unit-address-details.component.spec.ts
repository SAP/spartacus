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
  // B2BUnit,
  B2BAddress,
} from '@spartacus/core';

import { UnitAddressDetailsComponent } from './unit-address-details.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { TableModule } from '../../../../shared/components/table/table.module';

const code = 'b1';
const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'orgUnit1',
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
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

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

describe('UnitAddressDetailsComponent', () => {
  let component: UnitAddressDetailsComponent;
  let fixture: ComponentFixture<UnitAddressDetailsComponent>;
  let orgUnitsService: MockOrgUnitService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, I18nTestingModule],
      declarations: [UnitAddressDetailsComponent, MockUrlPipe],
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
    fixture = TestBed.createComponent(UnitAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load address', () => {
      component.ngOnInit();
      let address: any;
      component.address$
        .subscribe((value) => {
          address = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(orgUnitsService.loadAddresses).toHaveBeenCalledWith(code);
      expect(orgUnitsService.getAddress).toHaveBeenCalledWith(
        code,
        mockAddress.id
      );
      expect(address).toEqual({ ...mockAddress, orgUnitId: code });
    });
  });

  describe('deleteAddress', () => {
    it('should deleteAddress', () => {
      component.ngOnInit();

      component.deleteAddress();
      expect(orgUnitsService.deleteAddress).toHaveBeenCalledWith(
        code,
        mockAddress.id
      );
    });
  });
});
