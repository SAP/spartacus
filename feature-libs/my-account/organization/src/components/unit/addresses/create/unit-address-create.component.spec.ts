import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  I18nTestingModule,
  RoutingService,
  OrgUnitService,
  Occ,
} from '@spartacus/core';
import { UnitAddressCreateComponent } from './unit-address-create.component';
import createSpy = jasmine.createSpy;
import { UnitAddressFormModule } from '../form/unit-address-form.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { TableModule } from '@spartacus/storefront';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { UnitAddressFormService } from '../form';
import { CurrentUnitService } from '../../current-unit.service';
import { FormGroup } from '@angular/forms';
import B2BAddress = Occ.B2BAddress;

const orgUnitId = 'b1';
const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'orgUnit1',
};

const mockAddressForm = new FormGroup({});

class MockOrgUnitService implements Partial<OrgUnitService> {
  createAddress = createSpy('createAddress');
}

class MockRoutingService {
  go = createSpy('go').and.stub();
}

class MockUnitAddressFormService implements Partial<UnitAddressFormService> {
  getForm = createSpy('getForm').and.returnValue(new FormGroup({}));
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  code$ = of(orgUnitId);
}

describe('UnitAddressCreateComponent', () => {
  let component: UnitAddressCreateComponent;
  let fixture: ComponentFixture<UnitAddressCreateComponent>;
  let orgUnitService: MockOrgUnitService;
  let routingService: RoutingService;
  // let unitAddressFormService: MockUnitAddressFormService;
  // let currentUnitService: MockCurrentUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
        UnitAddressFormModule,
      ],
      declarations: [UnitAddressCreateComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: UnitAddressFormService,
          useClass: MockUnitAddressFormService,
        },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    // unitAddressFormService = TestBed.get(UnitAddressFormService as Type<UnitAddressFormService>);
    // currentUnitService = TestBed.get(CurrentUnitService as Type<CurrentUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('should create orgUnit Address', () => {
      component.save(null, mockAddressForm);
      expect(orgUnitService.createAddress).toHaveBeenCalledWith(
        orgUnitId,
        mockAddress
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orgUnitManageAddresses',
        params: { code: orgUnitId },
      });
    });
  });
});
