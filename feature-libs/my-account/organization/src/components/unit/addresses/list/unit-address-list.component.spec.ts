import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  RoutesConfig,
  RoutingConfig,
  OrgUnitService,
  B2BAddress,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { UnitAddressListComponent } from './unit-address-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { InteractiveTableModule } from '@spartacus/storefront';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const code = 'b1';
const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'firstName',
  lastName: 'lastName',
  formattedAddress: 'formattedAddress',
};

const mockAddresses = { values: [mockAddress] };
// const mockAddressUI = {
//   values: [
//     {
//       id: addressId,
//       name: 'firstName lastName',
//       code,
//       formattedAddress: 'formattedAddress',
//     },
//   ],
// };

const addressList = new BehaviorSubject(mockAddresses);

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadAddresses = createSpy('loadAddresses');
  getAddress = createSpy('getAddress').and.returnValue(of(mockAddress));
  getAddresses = createSpy('getAddresses').and.returnValue(of(mockAddresses));
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        params: {
          code,
        },
      },
    });
  }
}
const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

describe('UnitManageAddressesComponent', () => {
  let component: UnitAddressListComponent;
  let fixture: ComponentFixture<UnitAddressListComponent>;
  // let orgUnitService: MockOrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [UnitAddressListComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
      ],
    }).compileComponents();

    // orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressListComponent);
    component = fixture.componentInstance;
    addressList.next(mockAddresses);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
