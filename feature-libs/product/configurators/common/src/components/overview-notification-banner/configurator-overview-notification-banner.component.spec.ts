import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericConfigurator } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorComponentTestUtilsService } from '../../shared/testing/configurator-component-test-utils.service';
import {
  productConfigurationWithConflicts,
  productConfigurationWithoutIssues,
} from '../../shared/testing/configurator-test-data';
import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorRouter } from './../service/configurator-router-data';
import { ConfiguratorRouterExtractorService } from './../service/configurator-router-extractor.service';
import { ConfiguratorOverviewNotificationBannerComponent } from './configurator-overview-notification-banner.component';

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

const routerData: ConfiguratorRouter.Data = {
  configuratorType: configuratorType,
  pageType: ConfiguratorRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: {
    type: GenericConfigurator.OwnerType.CART_ENTRY,
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
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
  getConfigurationWithOverview(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
  removeConfiguration(): void {}
}
let component: ConfiguratorOverviewNotificationBannerComponent;
let fixture: ComponentFixture<ConfiguratorOverviewNotificationBannerComponent>;
let htmlElem: HTMLElement;
function initialize() {
  routerObs = of(routerData);
  fixture = TestBed.createComponent(
    ConfiguratorOverviewNotificationBannerComponent
  );
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}
describe('ConfigOverviewNotificationBannerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfiguratorOverviewNotificationBannerComponent,
        MockTranslatePipe,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: ConfiguratorRouterExtractorService,
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
    configurationObs = of(productConfigurationWithoutIssues);
    initialize();
    expect(component).toBeTruthy();
  });

  it('should display no banner in case there are no issues', () => {
    configurationObs = of(productConfigurationWithoutIssues);
    initialize();
    ConfiguratorComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });

  it('should display banner in case there are issues', () => {
    configurationObs = of(productConfigurationWithConflicts);
    initialize();
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-container'
    );
  });
});
