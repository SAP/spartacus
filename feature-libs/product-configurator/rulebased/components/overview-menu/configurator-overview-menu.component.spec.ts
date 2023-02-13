import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { Component, Input, Type } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';

const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const CONFIG_ID = '1234-56-7890';
const GROUP_PREFIX = 'prefix';
const GROUP_ID_LOCAL = 'id';
const OV_GROUP_ID = GROUP_PREFIX + '--' + GROUP_ID_LOCAL + '-ovGroup';
const CONFIGURATION: Configurator.ConfigurationWithOverview = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration
    .overview as Configurator.Overview,
};

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
}

class MockConfiguratorStorefrontUtilsService {
  createOvMenuItemId(prefix: string, groupId: string): string {
    return prefix
      ? prefix + '--' + groupId + '-ovMenuItem'
      : groupId + '-ovMenuItem';
  }
  createOvGroupId(prefix: string, groupId: string): string {
    return prefix ? prefix + '--' + groupId + '-ovGroup' : groupId + '-ovGroup';
  }
  scrollToConfigurationElement(): void {}
  changeStyling(): void {}
  getViewportHeight(): void {}
  syncScroll(): void {}
  isScrollBox(): void {}
  getElement(): void {}
  getElements(): void {}
  getScrollY(): void {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
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
  component.config = CONFIGURATION;
  fixture.detectChanges();

  configuratorGroupsService = TestBed.inject(
    ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
  );

  spyOn(configuratorGroupsService, 'setGroupStatusVisited').and.callThrough();

  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
  );

  spyOn(configuratorStorefrontUtilsService, 'scrollToConfigurationElement');

  spyOn(configuratorStorefrontUtilsService, 'getViewportHeight');

  spyOn(configuratorStorefrontUtilsService, 'syncScroll');

  spyOn(
    configuratorStorefrontUtilsService,
    'createOvGroupId'
  ).and.callThrough();

  spyOn(
    configuratorStorefrontUtilsService,
    'createOvMenuItemId'
  ).and.callThrough();
}

describe('ConfigurationOverviewMenuComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [MockCxIconComponent, ConfiguratorOverviewMenuComponent],
        providers: [
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfiguratorStorefrontUtilsService,
          },
        ],
      }).compileComponents();
    })
  );

  it('should create component', () => {
    initialize();
    expect(component).toBeDefined();
  });

  it('should provide the overview groups', () => {
    initialize();
    expect(component.config.overview?.groups?.length).toBe(2);
  });

  it('should render group descriptions', () => {
    initialize();
    expect(htmlElem.innerHTML).toContain(
      ConfigurationTestData.OV_GROUP_DESCRIPTION
    );
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
      ).toHaveBeenCalled();
    });

    it('should invoke utils service for scrolling', () => {
      initialize();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalledWith('#' + OV_GROUP_ID + ' h2');
    });
  });

  describe('getGroupId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      expect(component.getGroupId('A', 'B')).toBe('A--B-ovGroup');
    });

    it('should cope with undefined idPrefix', () => {
      initialize();
      expect(component.getGroupId(undefined, 'B')).toBe('B-ovGroup');
    });
  });

  describe('getMenuItemId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      expect(component.getMenuItemId('A', 'B')).toBe('A--B-ovMenuItem');
    });

    it('should cope with undefined idPrefix', () => {
      initialize();
      expect(component.getMenuItemId(undefined, 'B')).toBe('B-ovMenuItem');
    });
  });

  describe('onScroll', () => {
    beforeEach(() => {
      initialize();
      spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).and.callThrough();
    });

    it('should call onScroll method', () => {
      component.onScroll();

      expect(
        configuratorStorefrontUtilsService.getViewportHeight
      ).toHaveBeenCalledTimes(1);

      expect(
        configuratorStorefrontUtilsService.syncScroll
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('onResize', () => {
    beforeEach(() => {
      initialize();
    });

    it('should call onResize method', () => {
      component.onResize();

      expect(
        configuratorStorefrontUtilsService.getViewportHeight
      ).toHaveBeenCalledTimes(1);

      expect(
        configuratorStorefrontUtilsService.syncScroll
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('getMenuItemToHighlight', () => {
    function createElement(
      id: string,
      tagName: string,
      active?: boolean
    ): HTMLElement {
      const element = document.createElement(tagName);
      element.id = id + '-ovGroup';
      element.classList?.add('cx-group');
      if (active) {
        element.classList?.add('active');
      }
      return element;
    }

    function createElements(tagName: string, active?: boolean): HTMLElement[] {
      const elements = [];
      CONFIGURATION.overview.groups.forEach((group) => {
        let element = createElement(group.id, tagName, active);
        elements.push(element);
        group.subGroups?.forEach((subgroup) => {
          element = createElement(subgroup.id, tagName, active);
          elements.push(element);
        });
      });
      return elements;
    }

    beforeEach(() => {
      initialize();
    });

    it('should not get menu item to highlight because getElements method return undefined', () => {
      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        undefined
      );
      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should not get menu item to highlight because getScrollY method return undefined', () => {
      const groups = createElements('div');

      document.querySelectorAll = jasmine
        .createSpy('div.cx-group')
        .and.returnValue(groups);

      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        groups
      );

      spyOn(configuratorStorefrontUtilsService, 'getScrollY').and.returnValue(
        undefined
      );

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should get menu item to highlight', () => {
      const groups = createElements('div');

      document.querySelectorAll = jasmine
        .createSpy('div.cx-group')
        .and.returnValue(groups);

      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        groups
      );

      spyOn(configuratorStorefrontUtilsService, 'getScrollY').and.returnValue(
        123
      );

      let menuItems = htmlElem.querySelectorAll('.cx-menu-item');
      let menuItem = menuItems[menuItems.length - 1] as HTMLElement;
      spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
        menuItem
      );

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']().id).toEqual(menuItem.id);
    });
  });

  describe('highlight', () => {
    beforeEach(() => {
      initialize();
    });

    it('should not highlight any element because elementToHighlight is undefined', () => {
      spyOn(configuratorStorefrontUtilsService, 'getElements');
      component['highlight'](undefined);
      expect(
        configuratorStorefrontUtilsService.getElements
      ).toHaveBeenCalledTimes(0);
    });

    it('should not highlight any element because getElements method returns undefined', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const elementToHighlight = menuItems[menuItems.length - 1];
      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        undefined
      );
      component['highlight'](elementToHighlight);
      expect(
        configuratorStorefrontUtilsService.getElements
      ).toHaveBeenCalledTimes(1);
    });

    it('should highlight an element', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const elementToHighlight = menuItems[menuItems.length - 1];
      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        menuItems
      );
      component['highlight'](elementToHighlight);
      expect(
        configuratorStorefrontUtilsService.getElements
      ).toHaveBeenCalledTimes(1);
      expect(elementToHighlight.classList.contains('active')).toBe(true);
    });
  });

  describe('syncScroll', () => {
    beforeEach(() => {
      initialize();
    });

    it('should not syncScroll because elementToHighlight is undefined', () => {
      spyOn(configuratorStorefrontUtilsService, 'isScrollBox');
      component['syncScroll'](undefined);
      expect(
        configuratorStorefrontUtilsService.isScrollBox
      ).toHaveBeenCalledTimes(0);
      expect(
        configuratorStorefrontUtilsService.syncScroll
      ).toHaveBeenCalledTimes(0);
    });

    it('should not syncScroll because isScrollBox is false', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const element = menuItems[menuItems.length - 1];
      spyOn(configuratorStorefrontUtilsService, 'isScrollBox').and.returnValue(
        false
      );
      component['syncScroll'](element);
      expect(
        configuratorStorefrontUtilsService.isScrollBox
      ).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.syncScroll
      ).toHaveBeenCalledTimes(0);
    });

    it('should syncScroll', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const element = menuItems[menuItems.length - 1];
      spyOn(configuratorStorefrontUtilsService, 'isScrollBox').and.returnValue(
        true
      );
      component['syncScroll'](element);
      expect(
        configuratorStorefrontUtilsService.isScrollBox
      ).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.syncScroll
      ).toHaveBeenCalledTimes(1);
    });
  });
});
