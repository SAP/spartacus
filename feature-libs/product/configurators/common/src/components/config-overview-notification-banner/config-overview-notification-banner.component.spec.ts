import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Configurator,
  ConfiguratorCommonsService,
  GenericConfigurator,
} from '@spartacus/core';
import {
  ConfigRouterExtractorService,
  ConfigurationRouter,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfigComponentTestUtilsService } from '../../shared/testing/config-component-test-utils.service';
import * as ConfigurationTestData from '../../shared/testing/configuration-test-data';
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

let routerObs;
class MockConfigRouterExtractorService {
  extractRouterData() {
    return routerObs;
  }
}

let configurationObs;
class MockConfiguratorCommonsService {
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
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
function initialize() {
  routerObs = of(routerData);
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
    initialize();
    expect(component).toBeTruthy();
  });

  it('should display no banner in case there are no issues', () => {
    configurationObs = of(productConfiguration);
    initialize();
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });

  it('should display banner in case there are issues', () => {
    //create a configuration with a conflict
    const conflictingConfiguration: Configurator.Configuration = {
      configId: productConfiguration.configId,
      flatGroups: [{ groupType: Configurator.GroupType.CONFLICT_GROUP }],
    };
    configurationObs = of(conflictingConfiguration);
    initialize();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });
});
