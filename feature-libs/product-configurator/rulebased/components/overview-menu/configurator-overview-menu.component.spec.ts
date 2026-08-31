import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { IconComponent, MockIconComponent } from '@spartacus/storefront';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorOverviewMenuComponent } from './configurator-overview-menu.component';
import { vi } from 'vitest';

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

  removeStyling(): void {}

  createOvGroupId(): void {}

  createOvMenuItemId(): void {}

  ensureElementVisible(): void {}

  getSpareViewportHeight(): void {}

  getVerticallyScrolledPixels(): void {}

  scrollToConfigurationElement(): void {}
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

  vi.spyOn(configuratorStorefrontUtilsService, 'ensureElementVisible');

  vi.spyOn(configuratorStorefrontUtilsService, 'changeStyling');

  vi.spyOn(configuratorStorefrontUtilsService, 'removeStyling');

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
    vi.spyOn(configuratorStorefrontUtilsService, 'getElement');
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

    it('should call changeStyling', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component['changeStyling']();
      expect(
        configuratorStorefrontUtilsService.changeStyling
      ).toHaveBeenCalledTimes(component.styles.length);
    });
  });

  describe('removeStyling', () => {
    beforeEach(() => {
      initialize();
    });

    it('should call removeStyling', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component['removeStyling']();
      expect(
        configuratorStorefrontUtilsService.removeStyling
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
        configuratorStorefrontUtilsService.changeStyling
      ).toHaveBeenCalledTimes(component.styles.length);
    });

    it('should removeStyling styling', () => {
      fixture.detectChanges();
      vi.clearAllMocks();
      component.amount = 0;
      component['adjustStyling']();
      expect(
        configuratorStorefrontUtilsService.removeStyling
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
        'getElement'
      ).mockReturnValue(menuItem);

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
