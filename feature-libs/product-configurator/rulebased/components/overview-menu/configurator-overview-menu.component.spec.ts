import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import * as ConfigurationTestData from '../../testing/configurator-test-data';

import { ConfiguratorOverviewAttributeComponent } from '../overview-attribute/configurator-overview-attribute.component';

import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { Type } from '@angular/core';

const MOCK_ROUTER_STATE: any = ConfigurationTestData.mockRouterState;
const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const CONFIG_ID = '1234-56-7890';
const GROUP_PREFIX = 'prefix';
const GROUP_ID_LOCAL = 'id';
const OV_GROUP_ID = GROUP_PREFIX + GROUP_ID_LOCAL;
const CONFIGURATION: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration.overview,
};

let routerStateObservable: any;
let defaultRouterStateObservable: any;
let defaultConfigObservable: any;
let configurationObservable: any;
let overviewObservable: any;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    const obs: Observable<RouterState> = routerStateObservable
      ? routerStateObservable
      : defaultRouterStateObservable;
    return obs;
  }
}

class MockConfiguratorCommonsService {
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    const obs: Observable<Configurator.Configuration> = configurationObservable
      ? configurationObservable
      : defaultConfigObservable;
    return obs;
  }
  getConfigurationWithOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const obs: Observable<Configurator.Configuration> = overviewObservable
      ? overviewObservable
      : of(configuration);
    return obs;
  }

  removeConfiguration(): void {}
}

class MockConfiguratorStorefrontUtilsService {
  scrollToConfigurationElement(): void {}
  createOvGroupId(): string {
    return OV_GROUP_ID;
  }
}

let component: ConfiguratorOverviewMenuComponent;
let fixture: ComponentFixture<ConfiguratorOverviewMenuComponent>;
let htmlElem: HTMLElement;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

describe('ConfigurationOverviewMenuComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [
          ConfiguratorOverviewMenuComponent,
          ConfiguratorOverviewAttributeComponent,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfiguratorStorefrontUtilsService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    routerStateObservable = null;
    configurationObservable = null;
    overviewObservable = null;
    defaultRouterStateObservable = of(MOCK_ROUTER_STATE);
    defaultConfigObservable = of(CONFIGURATION);

    fixture = TestBed.createComponent(ConfiguratorOverviewMenuComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );
    spyOn(
      configuratorStorefrontUtilsService,
      'createOvGroupId'
    ).and.callThrough();
    spyOn(
      configuratorStorefrontUtilsService,
      'scrollToConfigurationElement'
    ).and.callThrough();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should provide the overview groups', () => {
    component.ovGroups$.subscribe((ovGroups) => {
      expect(ovGroups?.length).toBe(2);
    });
  });

  it('should render group descriptions', () => {
    expect(htmlElem.innerHTML).toContain(
      ConfigurationTestData.ov_group_description
    );
  });
  describe('getGroupLevelStyleClasses', () => {
    it('should return style class according to level', () => {
      const styleClass = component.getGroupLevelStyleClasses(4);
      expect(styleClass).toBe('cx-group groupLevel4');
    });
  });

  describe('navigateToGroup', () => {
    it('should invoke utils service for determining group id', () => {
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.createOvGroupId
      ).toHaveBeenCalledWith(GROUP_PREFIX, GROUP_ID_LOCAL);
    });

    it('should invoke utils service for scrolling', () => {
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalledWith('#' + OV_GROUP_ID);
    });
  });
});
