import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  CONFIG_ID,
  productConfiguration,
  productConfigurationWithConflicts,
  productConfigurationWithoutIssues,
} from '../../testing/configurator-test-data';
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

const configuratorType = ConfiguratorType.VARIANT;

const routerData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.CART_ENTRY,
    '3',
    configuratorType
  ),
};

const orderRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.ORDER_ENTRY,
    '3',
    configuratorType
  ),
};

let routerObs: any;
class MockConfigRouterExtractorService {
  extractRouterData() {
    return routerObs;
  }
}

let configurationObs: Observable<Configurator.Configuration>;
class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
}
let component: ConfiguratorOverviewNotificationBannerComponent;
let fixture: ComponentFixture<ConfiguratorOverviewNotificationBannerComponent>;
let htmlElem: HTMLElement;
function initialize(router: ConfiguratorRouter.Data) {
  routerObs = of(router);
  fixture = TestBed.createComponent(
    ConfiguratorOverviewNotificationBannerComponent
  );
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}
@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

describe('ConfigOverviewNotificationBannerComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterModule, RouterTestingModule],
        declarations: [
          ConfiguratorOverviewNotificationBannerComponent,
          MockTranslatePipe,
          MockUrlPipe,
          MockCxIconComponent,
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
    })
  );

  it('should create', () => {
    configurationObs = of(productConfiguration);
    initialize(routerData);
    expect(component).toBeTruthy();
  });

  it('should display no banner when there are no issues', () => {
    configurationObs = of(productConfigurationWithoutIssues);
    initialize(routerData);
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-icon'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-msg'
    );
  });

  it('should count issues from configuration in case OV not available', () => {
    configurationObs = of(productConfigurationWithoutIssues);
    initialize(routerData);
    component.numberOfIssues$.subscribe((numberOfIssues) =>
      expect(numberOfIssues).toBe(
        productConfigurationWithoutIssues.totalNumberOfIssues
      )
    );
  });

  it('should display banner when there are issues', () => {
    const productConfigurationWithIssuesAndConflicts: Configurator.Configuration =
      {
        ...productConfigurationWithConflicts,
        overview: { configId: productConfigurationWithConflicts.configId },
      };
    configurationObs = of(productConfigurationWithIssuesAndConflicts);
    initialize(routerData);
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-icon'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-msg'
    );
  });

  it('should display banner when there are issues counted in Configurator.Overview', () => {
    const productConfigurationWithConflictsCountedInOverview: Configurator.Configuration =
      {
        ...productConfigurationWithoutIssues,
        overview: {
          configId: CONFIG_ID,
          totalNumberOfIssues: 5,
        },
      };
    configurationObs = of(productConfigurationWithConflictsCountedInOverview);
    initialize(routerData);
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-icon'
    );
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-error-msg'
    );
  });

  it('should display no banner in order history when there are issues', () => {
    configurationObs = of(productConfiguration);
    initialize(orderRouterData);
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-icon'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-error-msg'
    );
  });
});
