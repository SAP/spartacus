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
import { IntersectionService } from '@spartacus/storefront';

const MOCK_ROUTER_STATE: any = ConfigurationTestData.mockRouterState;
const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const CONFIG_ID = '1234-56-7890';
const GROUP_PREFIX = 'prefix';
const GROUP_ID_LOCAL = 'id';
const OV_GROUP_ID = GROUP_PREFIX + '--' + GROUP_ID_LOCAL + '-ovGroup';
const CONFIGURATION: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration.overview,
};
const CONFIGURATION_WO_OVERVIEW: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: undefined,
};

const groups: NodeListOf<HTMLElement> = undefined;

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

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
}

class MockIntersectionService {
  isIntersecting(): Observable<boolean> {
    return of(false);
  }
}

let component: ConfiguratorOverviewMenuComponent;
let fixture: ComponentFixture<ConfiguratorOverviewMenuComponent>;
let htmlElem: HTMLElement;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
let configuratorGroupsService: ConfiguratorGroupsService;
let intersectionService: IntersectionService;

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
  spyOn(
    configuratorStorefrontUtilsService,
    'createOvGroupId'
  ).and.callThrough();
  spyOn(
    configuratorStorefrontUtilsService,
    'scrollToConfigurationElement'
  ).and.callThrough();

  spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
  spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
    groups
  );
  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();

  intersectionService = TestBed.inject(
    IntersectionService as Type<IntersectionService>
  );
}

fdescribe('ConfigurationOverviewMenuComponent', () => {
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
          {
            provide: IntersectionService,
            useClass: MockIntersectionService,
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
  });

  it('should create component', () => {
    initialize();
    expect(component).toBeDefined();
  });

  it('should provide the overview groups', () => {
    initialize();
    component.ovGroups$.subscribe((ovGroups) => {
      expect(ovGroups?.length).toBe(2);
    });
  });

  it('should render group descriptions', () => {
    initialize();
    expect(htmlElem.innerHTML).toContain(
      ConfigurationTestData.ov_group_description
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
      ).toHaveBeenCalledWith('#' + OV_GROUP_ID + ' h2');
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

  describe('collectAllMenuItems', () => {
    beforeEach(() => {
      initialize();
    });

    function getParentLevel(element: HTMLElement): number {
      let level = 0;
      element?.parentElement?.classList.forEach((className) => {
        if (className.indexOf('groupLevel') !== -1) {
          level = Number(className.replace('groupLevel', ''));
        }
      });
      return level;
    }

    it('should not return any menu items', () => {
      const menuItems = component['collectAllMenuItems'](undefined);
      expect(menuItems.length).toEqual(0);
    });

    it('should return all collected menu items', () => {
      const items =
        fixture.debugElement.nativeElement.querySelectorAll('button');
      //Get the last item
      const item: HTMLElement = items[items.length - 1];
      let level = getParentLevel(item);
      const menuItems = component['collectAllMenuItems'](item);
      expect(menuItems.length).toEqual(level);
    });
  });

  describe('makeAllMenuItemsActive', () => {
    beforeEach(() => {
      initialize();
    });

    it('should make all collected menu items active', () => {
      const items =
        fixture.debugElement.nativeElement.querySelectorAll('button');
      //Get the last item
      const item: HTMLElement = items[items.length - 1];
      let menuItems = component['collectAllMenuItems'](item);
      //Check whether menu items do not have active class
      menuItems.forEach((item) => {
        expect(item?.classList?.contains('active')).toBe(false);
      });

      component['makeAllMenuItemsActive'](item);
      menuItems = component['collectAllMenuItems'](item);
      //Check whether menu items have active class
      menuItems.forEach((item) => {
        expect(item?.classList?.contains('active')).toBe(true);
      });
    });
  });

  describe('getGroupId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      expect(component.getGroupId('A', 'B')).toBe('A--B-ovGroup');
    });

    it('should cope with utils service not present', () => {
      initialize();
      component['configuratorStorefrontUtilsService'] = undefined;
      expect(component.getGroupId('A', 'B')).toBe('A--B-ovGroup');
    });

    it('should cope with utils service not present and idPrefix is undefined', () => {
      initialize();
      component['configuratorStorefrontUtilsService'] = undefined;
      expect(component.getGroupId(undefined, 'B')).toBe('B-ovGroup');
    });
  });

  describe('getMenuItemId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      expect(component.getMenuItemId('A', 'B')).toBe('A--B-ovMenuItem');
    });

    it('should cope with utils service not present', () => {
      initialize();
      component['configuratorStorefrontUtilsService'] = undefined;
      expect(component.getMenuItemId('A', 'B')).toBe('A--B-ovMenuItem');
    });

    it('should cope with utils service not present and idPrefix is undefined', () => {
      initialize();
      component['configuratorStorefrontUtilsService'] = undefined;
      expect(component.getMenuItemId(undefined, 'B')).toBe('B-ovMenuItem');
    });
  });

  describe('onScroll', () => {
    beforeEach(() => {
      initialize();
    });

    it('should highlight menu item', () => {
      spyOn(intersectionService, 'isIntersecting').and.returnValue(of(true));
      window.scroll();
    });
  });
});
