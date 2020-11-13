import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericConfigurator } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product/configurators/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import { CommonConfiguratorTestUtilsService } from '../../../common/shared/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  productConfiguration,
  productConfigurationWithConflicts,
  productConfigurationWithoutIssues,
} from '../../shared/testing/configurator-test-data';
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
  pageType: ConfiguratorRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: {
    type: GenericConfigurator.OwnerType.CART_ENTRY,
    id: '3',
    configuratorType: configuratorType,
  },
};

const orderRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.OVERVIEW,
  isOwnerCartEntry: true,
  owner: {
    type: GenericConfigurator.OwnerType.ORDER_ENTRY,
    id: '3',
    configuratorType: configuratorType,
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
  @Input() type;
}

describe('ConfigOverviewNotificationBannerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
  }));

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

  it('should display banner when there are issues', () => {
    configurationObs = of(productConfigurationWithConflicts);
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
