import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActiveCartService,
  GenericConfigurator,
  OrderEntry,
} from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { ConfigComponentTestUtilsService } from '../../shared/testing/config-component-test-utils.service';
import * as ConfigurationTestData from '../../shared/testing/configuration-test-data';
import { ConfigOverviewNotificationBannerComponent } from './config-overview-notification-banner.component';

const cartEntries: OrderEntry[] = [
  {
    entryNumber: 1,
    product: {
      configurable: true,
      configuratorType: 'CPQCONFIGURATOR',
    },
  },
  {
    entryNumber: 2,
    product: {
      configurable: false,
    },
  },
  {
    entryNumber: 3,
    product: {
      configurable: true,
      configuratorType: 'CPQCONFIGURATOR',
    },
  },
  {
    entryNumber: 4,
    product: {
      configurable: true,
      configuratorType: 'some other configurator',
    },
  },
];

const productConfiguration = ConfigurationTestData.productConfiguration;
productConfiguration.owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
productConfiguration.owner.id = '3';
const configuratorType = 'cpqconfigurator';

const routerData: ConfigurationRouter.Data = {
  configuratorType: configuratorType,
  pageType: ConfigurationRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: productConfiguration.owner,
};
let entry$;
class MockActiveCartService {
  getEntries() {
    return entry$;
  }
}

let router$;
class MockConfigRouterExtractorService {
  extractRouterData() {
    return router$;
  }
}

describe('ConfigOverviewNotificationBannerComponent', () => {
  let component: ConfigOverviewNotificationBannerComponent;
  let fixture: ComponentFixture<ConfigOverviewNotificationBannerComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigOverviewNotificationBannerComponent],
      providers: [
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: ConfigRouterExtractorService,
          useClass: MockConfigRouterExtractorService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    entry$ = of(cartEntries);
    router$ = of(routerData);
    fixture = TestBed.createComponent(
      ConfigOverviewNotificationBannerComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display banner for error notification', () => {
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configure-issues-notification'
    );
  });
});
