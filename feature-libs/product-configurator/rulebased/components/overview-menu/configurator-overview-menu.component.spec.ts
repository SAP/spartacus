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
  setGroupStatusVisited() {}
}

class MockConfiguratorStorefrontUtilsService {
  getElement(): void {}

  getElementById(): void {}

  idSelector(id: string): string {
    return '#' + id;
  }

  getElements(): void {}

  getPrefixId(): void {}

  hasScrollbar(): void {}

  getClosestElement(): HTMLElement | undefined {
    return undefined;
  }

  changeStylingOfElement(): void {}

  removeStylingOfElement(): void {}

  createOvGroupId(): void {}

  createOvMenuItemId(): void {}

  ensureElementVisible(): void {}

  getSpareViewportHeight(): void {}

  getVerticallyScrolledPixels(): void {}

  scrollToConfigurationElement(): void {}

  focusConfigurationElement(): void {}
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

  configuratorGroupsService = TestBed.inject(
    ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
  );

  vi.spyOn(configuratorGroupsService, 'setGroupStatusVisited');

  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
  );

  vi.spyOn(configuratorStorefrontUtilsService, 'scrollToConfigurationElement');

  vi.spyOn(configuratorStorefrontUtilsService, 'focusConfigurationElement');

  vi.spyOn(configuratorStorefrontUtilsService, 'ensureElementVisible');

  vi.spyOn(configuratorStorefrontUtilsService, 'getClosestElement');

  vi.spyOn(configuratorStorefrontUtilsService, 'changeStylingOfElement');

  vi.spyOn(configuratorStorefrontUtilsService, 'removeStylingOfElement');

  vi.spyOn(configuratorStorefrontUtilsService, 'createOvGroupId');

  vi.spyOn(configuratorStorefrontUtilsService, 'createOvMenuItemId');

  vi.spyOn(configuratorStorefrontUtilsService, 'getPrefixId');
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
    fixture.detectChanges();
    vi.spyOn(configuratorStorefrontUtilsService, 'getSpareViewportHeight');
    vi.spyOn(configuratorStorefrontUtilsService, 'getElementById');
    vi.spyOn(configuratorStorefrontUtilsService, 'getElements');
    vi.spyOn(
      configuratorStorefrontUtilsService,
      'getVerticallyScrolledPixels'
    ).mockReturnValue(0);
    vi.spyOn(configuratorStorefrontUtilsService, 'hasScrollbar');

    component.ngAfterViewInit();
    fixture.detectChanges();

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
    it('should invoke utils service for determining group id', () => {
      initialize();
      fixture.detectChanges();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.createOvGroupId
      ).toHaveBeenCalled();
    });

    it('should invoke utils service for scrolling', () => {
      initialize();
      fixture.detectChanges();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalled();
    });

    it('should compose the query selector from the escaped group id', () => {
      initialize();
      vi.mocked(
        configuratorStorefrontUtilsService.createOvGroupId
      ).mockReturnValue('cx--GROUP@1-ovGroup');
      vi.spyOn(configuratorStorefrontUtilsService, 'idSelector');

      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);

      expect(
        configuratorStorefrontUtilsService.idSelector
      ).toHaveBeenCalledWith('cx--GROUP@1-ovGroup');
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalledWith('#cx--GROUP@1-ovGroup h2');
    });

    it('should not move the focus if in-page navigation is disabled', () => {
      initialize();
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.focusConfigurationElement
      ).not.toHaveBeenCalled();
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

    it('should scroll to and focus the group heading', () => {
      vi.mocked(
        configuratorStorefrontUtilsService.createOvGroupId
      ).mockReturnValue('cx--GROUP-ovGroup');
      component.navigateToGroup(GROUP_PREFIX, GROUP_ID_LOCAL);
      expect(
        configuratorStorefrontUtilsService.scrollToConfigurationElement
      ).toHaveBeenCalledWith('#cx--GROUP-ovGroup h2');
      expect(
        configuratorStorefrontUtilsService.focusConfigurationElement
      ).toHaveBeenCalledWith('#cx--GROUP-ovGroup h2');
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
      vi.spyOn(configuratorStorefrontUtilsService, 'getElements');
      vi.spyOn(configuratorStorefrontUtilsService, 'getSpareViewportHeight');
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
      vi.spyOn(configuratorStorefrontUtilsService, 'getSpareViewportHeight');
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
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getSpareViewportHeight'
      ).mockReturnValue(600);
      expect(component['getHeight']()).toEqual('');
    });

    it('should return spare viewport height because menu items height is equal zero', () => {
      component.menuItemsHeight = 400;
      fixture.detectChanges();
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getSpareViewportHeight'
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
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(undefined);
      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should not get menu item to highlight because getScrollY method return undefined', () => {
      groups = createElements('div');

      vi.spyOn(document, 'querySelectorAll').mockReturnValue(groups);
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(groups);

      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getVerticallyScrolledPixels'
      ).mockReturnValue(undefined);

      fixture.detectChanges();

      expect(component['getMenuItemToHighlight']()).not.toBeDefined();
    });

    it('should get menu item to highlight', () => {
      groups = createElements('div');

      vi.spyOn(document, 'querySelectorAll').mockReturnValue(groups);
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(groups);

      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getVerticallyScrolledPixels'
      ).mockReturnValue(123);

      fixture.detectChanges();

      let menuItems = htmlElem.querySelectorAll('.cx-menu-item');
      let menuItem = menuItems[menuItems.length - 1] as HTMLElement;
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElementById'
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
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(undefined);
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
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'getElements'
      ).mockReturnValue(menuItems);
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
      vi.spyOn(configuratorStorefrontUtilsService, 'hasScrollbar');
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
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'hasScrollbar'
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
      vi.spyOn(
        configuratorStorefrontUtilsService,
        'hasScrollbar'
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
