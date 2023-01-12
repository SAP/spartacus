import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { Component, Input, Type } from '@angular/core';
import { ICON_TYPE, IntersectionService } from '@spartacus/storefront';
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
let intersectionService: IntersectionService;

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

  spyOn(
    configuratorStorefrontUtilsService,
    'createOvGroupId'
  ).and.callThrough();

  spyOn(
    configuratorStorefrontUtilsService,
    'scrollToConfigurationElement'
  ).and.callThrough();

  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();

  intersectionService = TestBed.inject(
    IntersectionService as Type<IntersectionService>
  );
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
          },
          {
            provide: IntersectionService,
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
    });

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

    it('should not call onScroll method', () => {
      spyOn(intersectionService, 'isIntersecting').and.returnValue(of(false));
      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        undefined
      );
      fixture.detectChanges();

      component.onScroll();
      expect(intersectionService.isIntersecting).not.toHaveBeenCalled();
    });

    it('should add active class to menu items', () => {
      spyOn(intersectionService, 'isIntersecting').and.returnValue(of(true));
      const groups = createElements('div');

      document.querySelectorAll = jasmine
        .createSpy('div.cx-group')
        .and.returnValue(groups);

      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        groups
      );
      let menuItems = htmlElem.querySelectorAll('.cx-menu-item');
      let menuItem = menuItems[menuItems.length - 1] as HTMLElement;
      spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
        menuItem
      );
      fixture.detectChanges();

      component.onScroll();

      menuItems = htmlElem.querySelectorAll('button.cx-menu-item');
      menuItems.forEach((item, index, menuItems) => {
        if (index === menuItems.length - 1) {
          expect(item.classList?.contains('active')).toBe(true);
        } else {
          expect(item.classList?.contains('active')).toBe(false);
        }
      });
    });

    it('should remove active class to menu items', () => {
      spyOn(intersectionService, 'isIntersecting').and.returnValue(of(false));
      const groups = createElements('div', true);

      document.querySelectorAll = jasmine
        .createSpy('div.cx-group')
        .and.returnValue(groups);

      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        groups
      );
      let menuItems = htmlElem.querySelectorAll('.cx-menu-item');
      let menuItem = menuItems[menuItems.length - 1] as HTMLElement;
      spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
        menuItem
      );
      fixture.detectChanges();

      component.onScroll();

      menuItems = htmlElem.querySelectorAll('button.cx-menu-item');
      menuItems.forEach((item) => {
        expect(item.classList?.contains('active')).toBe(false);
      });
    });
  });
});
