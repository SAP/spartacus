import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { IconComponent, MockIconComponent } from '@spartacus/storefront';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';

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
  setGroupStatusVisited = vi.fn();
}

class MockConfiguratorStorefrontUtilsService {
  getElementById = vi.fn();
  getElements = vi.fn();
  getPrefixId = vi.fn();
  hasScrollbar = vi.fn();
  getClosestElement = vi.fn();
  changeStylingOfElement = vi.fn();
  removeStylingOfElement = vi.fn();
  createOvGroupId = vi.fn((_idPrefix?: string, _groupId?: string) => '');
  createOvMenuItemId = vi.fn();
  ensureElementVisible = vi.fn();
  getSpareViewportHeight = vi.fn();
  getVerticallyScrolledPixels = vi.fn();
  navigateToOverviewGroup = vi.fn();
}

let component: ConfiguratorOverviewMenuComponent;
let fixture: ComponentFixture<ConfiguratorOverviewMenuComponent>;
let htmlElem: HTMLElement;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorOverviewMenuComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.config = CONFIGURATION;

  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
  );
}

describe('ConfigurationOverviewMenuComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        ConfiguratorOverviewMenuComponent,
      ],
      providers: [
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfiguratorStorefrontUtilsService,
        },
        provideMockFeatureToggles({ productConfiguratorCPQContainer: false }),
      ],
    })
      .overrideComponent(ConfiguratorOverviewMenuComponent, {
        remove: { imports: [TranslatePipe, IconComponent] },
        add: { imports: [MockTranslatePipe, MockIconComponent] },
      })
      .compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create component', () => {
    initialize();
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should call ngAfterViewInit after ovMenu is rendered', () => {
    initialize();
    vi.mocked(
      configuratorStorefrontUtilsService.getVerticallyScrolledPixels
    ).mockReturnValue(0);
    fixture.detectChanges();
    vi.clearAllMocks();
    component.ngAfterViewInit();

    expect(component).toBeDefined();
    expect(
      configuratorStorefrontUtilsService.getElements
    ).toHaveBeenCalledTimes(1);
    expect(
      configuratorStorefrontUtilsService.getVerticallyScrolledPixels
    ).toHaveBeenCalledTimes(1);
    expect(
      configuratorStorefrontUtilsService.getElementById
    ).toHaveBeenCalledTimes(0);
    expect(
      configuratorStorefrontUtilsService.getSpareViewportHeight
    ).toHaveBeenCalledTimes(1);
    expect(
      configuratorStorefrontUtilsService.hasScrollbar
    ).toHaveBeenCalledTimes(0);
  });

  it('should provide the overview groups', () => {
    initialize();
    fixture.detectChanges();
    expect(component.config.overview?.groups?.length).toBe(2);
  });

  describe('getAmount', () => {
    beforeEach(() => {
      initialize();
    });

    it('should return zero because there are no groups', () => {
      const configuration: Configurator.Configuration = structuredClone(
        ConfigurationTestData.productConfigurationWithoutIssues
      );
      expect(component['getAmount'](configuration)).toEqual(0);
    });

    it('should return zero because there are no groups', () => {
      expect(component['getAmount'](component.config)).toEqual(10);
    });
  });

  describe('getMenuItemsHeight', () => {
    beforeEach(() => {
      initialize();
    });

    it('should return zero because amount is zero', () => {
      fixture.detectChanges();
      component.amount = 0;
      expect(component['getMenuItemsHeight']()).toEqual(0);
    });

    it('should return the total height of all menu items', () => {
      fixture.detectChanges();
      component.amount = 10;
      expect(component['getMenuItemsHeight']()).toEqual(395);
    });
  });

  describe('changeStyling', () => {
    beforeEach(() => {
      initialize();
    });

    it('should call changeStylingOfElement', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component['changeStyling']();
      expect(
        configuratorStorefrontUtilsService.getClosestElement
      ).toHaveBeenCalled();
      expect(
        configuratorStorefrontUtilsService.changeStylingOfElement
      ).toHaveBeenCalledTimes(component.styles.length);
    });
  });

  describe('removeStyling', () => {
    beforeEach(() => {
      initialize();
    });

    it('should call removeStylingOfElement', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component['removeStyling']();
      expect(
        configuratorStorefrontUtilsService.getClosestElement
      ).toHaveBeenCalled();
      expect(
        configuratorStorefrontUtilsService.removeStylingOfElement
      ).toHaveBeenCalledTimes(component.styles.length);
    });
  });

  describe('adjustStyling', () => {
    beforeEach(() => {
      initialize();
    });

    it('should change styling', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component.amount = 1;
      component['adjustStyling']();
      expect(
        configuratorStorefrontUtilsService.changeStylingOfElement
      ).toHaveBeenCalledTimes(component.styles.length);
    });

    it('should removeStyling styling', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component.amount = 0;
      component['adjustStyling']();
      expect(
        configuratorStorefrontUtilsService.removeStylingOfElement
      ).toHaveBeenCalledTimes(component.styles.length);
    });
  });

  it('should render group descriptions', () => {
    initialize();
    fixture.detectChanges();
    expect(htmlElem.innerHTML).toContain(
      ConfigurationTestData.OV_GROUP_DESCRIPTION
    );
  });

  describe('getGroupLevelStyleClasses', () => {
    it('should return style class according to level', () => {
      initialize();
      fixture.detectChanges();
      const styleClass = component.getGroupLevelStyleClasses(4);
      expect(styleClass).toBe('cx-menu-group groupLevel4');
    });
  });

  describe('navigateToGroup', () => {
    it('should delegate to utils service', () => {
      initialize();
      fixture.detectChanges();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.navigateToOverviewGroup
      ).toHaveBeenCalledWith(GROUP_PREFIX, GROUP_ID_LOCAL);
    });
  });

  describe('in-page navigation (productConfiguratorCPQContainer)', () => {
    beforeEach(() => {
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
      initialize();
      fixture.detectChanges();
    });

    it('should render the menu inside a labelled navigation landmark', () => {
      const nav = htmlElem.querySelector('nav');
      expect(nav).not.toBeNull();
      expect(nav?.getAttribute('aria-label')).toBe(
        'configurator.a11y.overviewMenu'
      );
      expect(nav?.querySelectorAll('button.cx-menu-item').length).toBe(
        htmlElem.querySelectorAll('button.cx-menu-item').length
      );
    });

    it('should label the menu items as navigation to the group', () => {
      const menuItem = htmlElem.querySelector('button.cx-menu-item');
      expect(menuItem?.getAttribute('aria-label')).toContain(
        'configurator.a11y.navigateToOverviewGroup'
      );
    });

    it('should mark only the highlighted menu item as current location', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(menuItems);
      component['highlight'](menuItems[0]);
      component['highlight'](menuItems[1]);
      expect(menuItems[0].hasAttribute('aria-current')).toBe(false);
      expect(menuItems[1].getAttribute('aria-current')).toBe('location');
    });
  });

  describe('without in-page navigation', () => {
    beforeEach(() => {
      initialize();
      fixture.detectChanges();
    });

    it('should not render a navigation landmark', () => {
      expect(htmlElem.querySelector('nav')).toBeNull();
      expect(
        htmlElem.querySelectorAll('button.cx-menu-item').length
      ).toBeGreaterThan(0);
    });

    it('should keep the legacy aria-label of the menu items', () => {
      const menuItem = htmlElem.querySelector('button.cx-menu-item');
      expect(menuItem?.getAttribute('aria-label')).toContain(
        'configurator.a11y.groupName'
      );
    });

    it('should not set aria-current on the highlighted menu item', () => {
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(menuItems);
      component['highlight'](menuItems[0]);
      expect(menuItems[0].hasAttribute('aria-current')).toBe(false);
    });
  });

  describe('getPrefixId', () => {
    it('should call configuratorStorefrontUtilsService.getPrefixId method', () => {
      initialize();
      fixture.detectChanges();
      component.getPrefixId('AAA', 'BBB');
      expect(
        configuratorStorefrontUtilsService.getPrefixId
      ).toHaveBeenCalledWith('AAA', 'BBB');
    });
  });

  describe('getGroupId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      fixture.detectChanges();
      component.getGroupId('A', 'B');
      expect(
        configuratorStorefrontUtilsService.createOvGroupId
      ).toHaveBeenCalledWith('A', 'B');
    });
  });

  describe('getMenuItemId', () => {
    it('should dispatch request to utils service', () => {
      initialize();
      fixture.detectChanges();
      component.getMenuItemId('A', 'B');
      expect(
        configuratorStorefrontUtilsService.createOvMenuItemId
      ).toHaveBeenCalledWith('A', 'B');
    });
  });

  describe('onScroll', () => {
    beforeEach(() => {
      initialize();
    });

    it('should call onScroll method', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
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
      fixture.detectChanges();
      vi.clearAllMocks();
      component.onResize();

      expect(
        configuratorStorefrontUtilsService.getSpareViewportHeight
      ).toHaveBeenCalledTimes(1);

      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('getHeight', () => {
    beforeEach(() => {
      initialize();
    });

    it('should return empty string because spare viewport height is larger that menu items height', () => {
      component.menuItemsHeight = 400;
      fixture.detectChanges();
      vi.mocked(
        configuratorStorefrontUtilsService.getSpareViewportHeight
      ).mockReturnValue(600);
      expect(component['getHeight']()).toEqual('');
    });

    it('should return spare viewport height because menu items height is equal zero', () => {
      component.menuItemsHeight = 400;
      fixture.detectChanges();
      vi.mocked(
        configuratorStorefrontUtilsService.getSpareViewportHeight
      ).mockReturnValue(200);
      expect(component['getHeight']()).toEqual('200px');
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

    it('should not get menu item to highlight because getElements method return undefined', () => {
      vi.mocked(configuratorStorefrontUtilsService.getElements).mockReturnValue(
        undefined
      );
      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should not get menu item to highlight because getScrollY method return undefined', () => {
      groups = createElements('div');

      vi.spyOn(document, 'querySelectorAll').mockReturnValue(groups);
      vi.mocked(configuratorStorefrontUtilsService.getElements).mockReturnValue(
        groups
      );

      vi.mocked(
        configuratorStorefrontUtilsService.getVerticallyScrolledPixels
      ).mockReturnValue(undefined);

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should get menu item to highlight', () => {
      groups = createElements('div');

      vi.spyOn(document, 'querySelectorAll').mockReturnValue(groups);
      vi.mocked(configuratorStorefrontUtilsService.getElements).mockReturnValue(
        groups
      );

      vi.mocked(
        configuratorStorefrontUtilsService.getVerticallyScrolledPixels
      ).mockReturnValue(123);

      fixture.detectChanges();

      let menuItems = htmlElem.querySelectorAll('.cx-menu-item');
      let menuItem = menuItems[menuItems.length - 1] as HTMLElement;
      vi.mocked(
        configuratorStorefrontUtilsService.getElementById
      ).mockReturnValue(menuItem);

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()?.id).toEqual(menuItem.id);
    });
  });

  describe('highlight', () => {
    beforeEach(() => {
      initialize();
    });

    it('should not highlight any element because the list of menu items is empty', () => {
      fixture.detectChanges();
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const elementToHighlight = menuItems[menuItems.length - 1];
      vi.mocked(configuratorStorefrontUtilsService.getElements).mockReturnValue(
        undefined
      );
      component['highlight'](elementToHighlight);
      expect(
        elementToHighlight.classList.contains(component['ACTIVE_CLASS'])
      ).toBe(false);
    });

    it('should highlight an element', () => {
      fixture.detectChanges();
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const elementToHighlight = menuItems[menuItems.length - 1];
      vi.mocked(configuratorStorefrontUtilsService.getElements).mockReturnValue(
        menuItems
      );
      component['highlight'](elementToHighlight);
      expect(
        elementToHighlight.classList.contains(component['ACTIVE_CLASS'])
      ).toBe(true);
    });
  });

  describe('ensureElementVisible', () => {
    beforeEach(() => {
      initialize();
    });

    it('should not call ensureElementVisible  method because elementToHighlight is undefined', () => {
      fixture.detectChanges();
      component['ensureElementVisible'](undefined);
      expect(
        configuratorStorefrontUtilsService.hasScrollbar
      ).toHaveBeenCalledTimes(0);
      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(0);
    });

    it('should not call ensureElementVisible method because isScrollBox is false', () => {
      fixture.detectChanges();
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const element = menuItems[menuItems.length - 1];
      vi.mocked(
        configuratorStorefrontUtilsService.hasScrollbar
      ).mockReturnValue(false);
      component['ensureElementVisible'](element);
      expect(
        configuratorStorefrontUtilsService.hasScrollbar
      ).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.ensureElementVisible
      ).toHaveBeenCalledTimes(0);
    });

    it('should ensure visibility of an element', () => {
      fixture.detectChanges();
      const menuItems: HTMLElement[] = Array.from(
        htmlElem.querySelectorAll('button.cx-menu-item')
      );
      const element = menuItems[menuItems.length - 1];
      vi.mocked(
        configuratorStorefrontUtilsService.hasScrollbar
      ).mockReturnValue(true);
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
