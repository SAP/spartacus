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
import { ConfiguratorGroupsService } from '@spartacus/product-configurator/rulebased';

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
const CONFIGURATION_WO_OVERVIEW: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: undefined,
};

let routerStateObservable: any;
let defaultRouterStateObservable: any;
let defaultConfigObservable: any;
let configurationObservable: any;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    const obs: Observable<RouterState> = routerStateObservable
      ? routerStateObservable
      : defaultRouterStateObservable;
    return obs;
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    const obs: Observable<Configurator.Configuration> = configurationObservable
      ? configurationObservable
      : defaultConfigObservable;
    return obs;
  }
  removeConfiguration(): void {}
}

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
}

let component: ConfiguratorOverviewMenuComponent;
let fixture: ComponentFixture<ConfiguratorOverviewMenuComponent>;
let htmlElem: HTMLElement;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
let configuratorGroupsService: ConfiguratorGroupsService;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewMenuComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();

  configuratorGroupsService = TestBed.inject(
    ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
  );
  spyOn(configuratorGroupsService, 'setGroupStatusVisited').and.callThrough();

  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
  );
  spyOn(configuratorStorefrontUtilsService, 'createOvGroupId').and.returnValue(
    OV_GROUP_ID
  );
  spyOn(
    configuratorStorefrontUtilsService,
    'scrollToConfigurationElement'
  ).and.callThrough();

  spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();
}

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
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    routerStateObservable = null;
    configurationObservable = null;
    defaultRouterStateObservable = of(MOCK_ROUTER_STATE);
    defaultConfigObservable = of(CONFIGURATION);
  });

  it('should create component', () => {
    initialize();
    expect(component).toBeDefined();
  });

  it('should provide the overview groups', () => {
    initialize();
    component.overview$.subscribe((overview) => {
      expect(overview?.groups?.length).toBe(2);
    });
  });

  it('should render group descriptions', () => {
    initialize();
    expect(htmlElem.innerHTML).toContain(
      ConfigurationTestData.OV_GROUP_DESCRIPTION
    );
  });

  it('should render ghost menu as long as the data is not ready', () => {
    defaultConfigObservable = of(CONFIGURATION_WO_OVERVIEW);
    initialize();
    expect(htmlElem.innerHTML).toContain('cx-ghost-menu');
  });

  describe('getGroupLevelStyleClasses', () => {
    it('should return style class according to level', () => {
      initialize();
      const styleClass = component.getGroupLevelStyleClasses(4);
      expect(styleClass).toBe('cx-menu-group groupLevel4');
    });
  });

  describe('navigateToGroup', () => {
    it('should invoke utils service for determining group id', () => {
      initialize();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.createOvGroupId
      ).toHaveBeenCalledWith(GROUP_PREFIX, GROUP_ID_LOCAL);
    });

    it('should invoke utils service for scrolling', () => {
      initialize();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalledWith('#' + OV_GROUP_ID);
    });
  });

  describe('setHeight', () => {
    beforeEach(() => {
      initialize();
    });
    it('should not set menu height because form is not defined', () => {
      component['setHeight']();
      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).not.toHaveBeenCalled();
    });

    it('should not set menu height because form height is not defined', () => {
      const ovForm = document.createElement('cx-configurator-overview-form');

      document.querySelector = jasmine
        .createSpy('ovForm')
        .and.returnValue(ovForm);

      component['setHeight']();

      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).not.toHaveBeenCalled();
    });

    it('should set menu height', () => {
      const ovForm = document.createElement('cx-configurator-overview-form');
      spyOn(ovForm, 'getBoundingClientRect').and.returnValue(
        new DOMRect(100, 1200, 500, 1200)
      );

      document.querySelector = jasmine
        .createSpy('ovForm')
        .and.returnValue(ovForm);

      component['setHeight']();

      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).toHaveBeenCalled();

      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).toHaveBeenCalledWith(
        'cx-configurator-overview-menu',
        'height',
        ovForm.getBoundingClientRect().height + 'px'
      );
    });
  });
});
