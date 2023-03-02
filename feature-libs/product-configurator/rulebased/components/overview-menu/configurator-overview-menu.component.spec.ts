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
const CONFIGURATION: Configurator.ConfigurationWithOverview = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration
    .overview as Configurator.Overview,
};

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
}

class MockConfiguratorStorefrontUtilsService {
  getElement(): void {}
  getElements(): void {}
  getPrefixId(): void {}
  hasScrollbar(): void {}
  changeStyling(): void {}
  createOvGroupId(): void {}
  createOvMenuItemId(): void {}
  ensureElementVisible(): void {}
  getSpareViewportHeight(): void {}
  getVerticallyScrolledPixels(): void {}
  scrollToConfigurationElement(): void {}
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

  spyOn(configuratorStorefrontUtilsService, 'getSpareViewportHeight');

  spyOn(configuratorStorefrontUtilsService, 'ensureElementVisible');

  spyOn(
    configuratorStorefrontUtilsService,
    'createOvGroupId'
  ).and.callThrough();

  spyOn(
    configuratorStorefrontUtilsService,
    'createOvMenuItemId'
  ).and.callThrough();

  spyOn(configuratorStorefrontUtilsService, 'getPrefixId').and.callThrough();
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

  afterEach(() => {
    document.body.removeChild(htmlElem);
  });

  it('should create component', () => {
    initialize();
    expect(component).toBeDefined();
  });

  it('should call ngAfterViewInit after ovMenu is rendered', () => {
    initialize();
    spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
    spyOn(configuratorStorefrontUtilsService, 'getElements').and.callThrough();
    spyOn(
      configuratorStorefrontUtilsService,
      'getVerticallyScrolledPixels'
    ).and.returnValue(0);
    spyOn(configuratorStorefrontUtilsService, 'hasScrollbar');

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component).toBeDefined();
    expect(
      configuratorStorefrontUtilsService.getElements
    ).toHaveBeenCalledTimes(1);
    expect(
      configuratorStorefrontUtilsService.getVerticallyScrolledPixels
    ).toHaveBeenCalledTimes(1);
    expect(configuratorStorefrontUtilsService.getElement).toHaveBeenCalledTimes(
      0
    );
    expect(
      configuratorStorefrontUtilsService.getSpareViewportHeight
    ).toHaveBeenCalledTimes(1);
    expect(
      configuratorStorefrontUtilsService.hasScrollbar
    ).toHaveBeenCalledTimes(0);
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
      ).toHaveBeenCalled();
    });
  });

  describe('getPrefixId', () => {
    it('should call configuratorStorefrontUtilsService.getPrefixId method', () => {
      initialize();
      component.getPrefixId('AAA', 'BBB');
      expect(
        configuratorStorefrontUtilsService.getPrefixId
      ).toHaveBeenCalledWith('AAA', 'BBB');
    });
  });

  describe('getGroupId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      component.getGroupId('A', 'B');
      expect(
        configuratorStorefrontUtilsService.createOvGroupId
      ).toHaveBeenCalledWith('A', 'B');
    });
  });

  describe('getMenuItemId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      component.getMenuItemId('A', 'B');
      expect(
        configuratorStorefrontUtilsService.createOvMenuItemId
      ).toHaveBeenCalledWith('A', 'B');
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
        configuratorStorefrontUtilsService.getSpareViewportHeight
      ).toHaveBeenCalledTimes(1);

      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
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
        configuratorStorefrontUtilsService.getSpareViewportHeight
      ).toHaveBeenCalledTimes(1);

      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('getMenuItemToHighlight', () => {
    let groups: any;

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
      const elements: any = [];
      CONFIGURATION.overview.groups?.forEach((group) => {
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

    afterEach(() => {
      groups?.forEach((group: any) => {
        ConfiguratorTestUtils.remove(group);
      });
    });

    it('should not get menu item to highlight because getElements method return undefined', () => {
      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        undefined
      );
      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should not get menu item to highlight because getScrollY method return undefined', () => {
      groups = createElements('div');

      document.querySelectorAll = jasmine
        .createSpy('div.cx-group')
        .and.returnValue(groups);

      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        groups
      );

      spyOn(
        configuratorStorefrontUtilsService,
        'getVerticallyScrolledPixels'
      ).and.returnValue(undefined);

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should get menu item to highlight', () => {
      groups = createElements('div');

      document.querySelectorAll = jasmine
        .createSpy('div.cx-group')
        .and.returnValue(groups);

      spyOn(configuratorStorefrontUtilsService, 'getElements').and.returnValue(
        groups
      );

      spyOn(
        configuratorStorefrontUtilsService,
        'getVerticallyScrolledPixels'
      ).and.returnValue(123);

      let menuItems = htmlElem.querySelectorAll('.cx-menu-item');
      let menuItem = menuItems[menuItems.length - 1] as HTMLElement;
      spyOn(configuratorStorefrontUtilsService, 'getElement').and.returnValue(
        menuItem
      );

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()?.id).toEqual(menuItem.id);
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

  describe('ensureElementVisible', () => {
    beforeEach(() => {
      initialize();
    });

    it('should not call ensureElementVisible  method because elementToHighlight is undefined', () => {
      spyOn(configuratorStorefrontUtilsService, 'hasScrollbar');
      component['ensureElementVisible'](undefined);
      expect(
        configuratorStorefrontUtilsService.hasScrollbar
      ).toHaveBeenCalledTimes(0);
      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(0);
    });

    it('should not call ensureElementVisible method because isScrollBox is false', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const element = menuItems[menuItems.length - 1];
      spyOn(configuratorStorefrontUtilsService, 'hasScrollbar').and.returnValue(
        false
      );
      component['ensureElementVisible'](element);
      expect(
        configuratorStorefrontUtilsService.hasScrollbar
      ).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(0);
    });

    it('should ensure visibility of an element', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const element = menuItems[menuItems.length - 1];
      spyOn(configuratorStorefrontUtilsService, 'hasScrollbar').and.returnValue(
        true
      );
      component['ensureElementVisible'](element);
      expect(
        configuratorStorefrontUtilsService.hasScrollbar
      ).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(1);
    });
  });
});
