import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOverviewNotificationBannerComponent } from './config-overview-notification-banner.component';
import {
  ActiveCartService,
  GenericConfigurator,
  OrderEntry,
} from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import * as ConfigurationTestData from '../configuration-test-data';
import { ConfigComponentTestUtilsService } from '../../generic/service/config-component-test-utils.service';
import { of } from 'rxjs';

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

class MockActiveCartService {
  getEntries() {
    return of(cartEntries);
  }
}

class MockConfigRouterExtractorService {
  extractRouterData() {
    return of(routerData);
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
