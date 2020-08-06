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
import { UnitAddressFormModule } from '../form/unit-address-form.module';
import { RouterTestingModule } from '@angular/router/testing';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { FormControl, FormGroup } from '@angular/forms';

const code = 'b1';
const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'orgUnit1',
};
const addressForm = new FormGroup({
  id: new FormControl(mockAddress.id),
  firstName: new FormControl(mockAddress.firstName),
});

const mockAddresses = [mockAddress];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadList = createSpy('loadList');
  create = createSpy('create');
  getApprovalProcesses = createSpy('getApprovalProcesses');
  updateAddress = createSpy('updateAddress');
  loadAddresses = createSpy('loadAddresses');
  getAddress = createSpy('getAddress').and.returnValue(of(mockAddress));
  getAddresses = createSpy('getAddresses').and.returnValue(of(mockAddresses));
}

class MockRoutingService {
  go = createSpy('go').and.stub();
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
      imports: [I18nTestingModule, UnitAddressFormModule, RouterTestingModule],
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

  describe('update', () => {
    it('should update orgUnit', () => {
      const updateAddress = {
        id: addressId,
        firstName: 'a2',
      };

      component.save(null, addressForm);
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
