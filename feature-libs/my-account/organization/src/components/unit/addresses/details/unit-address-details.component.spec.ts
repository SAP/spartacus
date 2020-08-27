import { of } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService, B2BAddress } from '@spartacus/core';
import { CurrentUnitAddressService } from './current-unit-address.service';
import { UnitAddressDetailsComponent } from './unit-address-details.component';
import { CurrentUnitService } from '../../current-unit.service';
import { OrgUnitService } from '../../../../core/services/org-unit.service';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { ModalService } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import createSpy = jasmine.createSpy;

const code = 'b1';
const addressId = 'a1';
const unit = { name: 'testUnit' };

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'orgUnit1',
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  deleteAddress = createSpy('deleteAddress');
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy('go').and.stub();
}

class MockModalService implements Partial<ModalService> {
  open = createSpy('open').and.stub();
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  item$ = of(unit);
  key$ = of(code);
}

class MockCurrentUnitAddressService
  implements Partial<CurrentUnitAddressService> {
  unitAddress$ = of(mockAddress);
}

xdescribe('UnitAddressDetailsComponent', () => {
  let component: UnitAddressDetailsComponent;
  let fixture: ComponentFixture<UnitAddressDetailsComponent>;
  let routingService: RoutingService;
  let orgUnitsService: OrgUnitService;
  let modalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
      ],
      declarations: [UnitAddressDetailsComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: ModalService, useClass: MockModalService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
        {
          provide: CurrentUnitAddressService,
          useClass: MockCurrentUnitAddressService,
        },
      ],
    }).compileComponents();

    routingService = TestBed.inject(RoutingService);
    orgUnitsService = TestBed.inject(OrgUnitService);
    modalService = TestBed.inject(ModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deleteAddress', () => {
    component.addressId = mockAddress.id;
    component.deleteAddress();
    expect(orgUnitsService.deleteAddress).toHaveBeenCalledWith(code, addressId);
  });

  it('should open modal for confirmation', () => {
    component.openModal(mockAddress, {} as TemplateRef<any>);
    expect(modalService.open).toHaveBeenCalledWith({}, { centered: true });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orgUnitManageAddresses',
      params: { uid: code },
    });
  });
});
