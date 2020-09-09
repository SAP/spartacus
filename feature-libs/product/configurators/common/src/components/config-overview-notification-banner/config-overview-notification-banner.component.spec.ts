import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Configurator, GenericConfigurator } from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfigComponentTestUtilsService } from '../../shared/testing/config-component-test-utils.service';
import {
  productConfiguration,
  productConfigurationWithConflicts,
  productConfigurationWithoutIssues,
} from '../../shared/testing/configuration-test-data';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';
import { ConfigOverviewNotificationBannerComponent } from './config-overview-notification-banner.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

const configuratorType = 'cpqconfigurator';

const routerData: ConfigurationRouter.Data = {
  configuratorType: configuratorType,
  pageType: ConfigurationRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: {
    type: GenericConfigurator.OwnerType.CART_ENTRY,
    id: '3',
  },
};

const orderRouterData: ConfigurationRouter.Data = {
  configuratorType: configuratorType,
  pageType: ConfigurationRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: {
    type: GenericConfigurator.OwnerType.ORDER_ENTRY,
    id: '3',
  },
};

let routerObs;
class MockConfigRouterExtractorService {
  extractRouterData() {
    return routerObs;
  }
}

let configurationObs;
class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
  getConfigurationWithOverview(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
  removeConfiguration(): void {}
}
let component: ConfigOverviewNotificationBannerComponent;
let fixture: ComponentFixture<ConfigOverviewNotificationBannerComponent>;
let htmlElem: HTMLElement;
function initialize(router: ConfigurationRouter.Data) {
  routerObs = of(router);
  fixture = TestBed.createComponent(ConfigOverviewNotificationBannerComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}

describe('ConfigOverviewNotificationBannerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigOverviewNotificationBannerComponent,
        MockTranslatePipe,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: ConfigRouterExtractorService,
          useClass: MockConfigRouterExtractorService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    configurationObs = of(productConfiguration);
    initialize(routerData);
    expect(component).toBeTruthy();
  });

  it('should display no banner when there are no issues', () => {
    configurationObs = of(productConfigurationWithoutIssues);
    initialize(routerData);
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });

  it('should display banner when there are issues', () => {
    configurationObs = of(productConfigurationWithConflicts);
    initialize(routerData);
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });

  it('should display no banner in order history when there are issues', () => {
    configurationObs = of(productConfiguration);
    initialize(orderRouterData);
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });
});
