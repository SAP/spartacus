import {
  ChangeDetectionStrategy,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
} from '@spartacus/product-configurator/common';
import { NEVER, Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from '../service';
import { KeyboardFocusService } from '@spartacus/storefront';
import { ConfiguratorTabBarComponent } from './configurator-tab-bar.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_OVERVIEW_ROUTE = 'configureOverviewCPQCONFIGURATOR';
const CONFIGURATOR_ROUTE = 'configureCPQCONFIGURATOR';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: {},
    semanticRoute: CONFIG_OVERVIEW_ROUTE,
  },
};

let routerStateObservable: any = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }

  go = () => Promise.resolve(true);
}

let configurationObs: Observable<Configurator.Configuration>;

const configWithOverview: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    'CONFIG_ID',
    ConfiguratorModelUtils.createInitialOwner()
  ),
  productCode: PRODUCT_CODE,
  overview: { configId: 'CONFIG_ID', productCode: PRODUCT_CODE },
};

const mockRouterData: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: configWithOverview.owner,
};

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
}

class MockConfigUtilsService {
  focusFirstActiveElement(): void {}
}

class MockConfiguratorGroupsService {}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('ConfigTabBarComponent', () => {
  let component: ConfiguratorTabBarComponent;
  let fixture: ComponentFixture<ConfiguratorTabBarComponent>;
  let htmlElem: HTMLElement;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let routingService: RoutingService;
  let keyboardFocusService: KeyboardFocusService;

  beforeEach(
    waitForAsync(() => {
      mockRouterState.state.params.displayOnly = false;

      routerStateObservable = of(mockRouterState);
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterModule, RouterTestingModule],
        declarations: [ConfiguratorTabBarComponent, MockUrlPipe],
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
            useClass: MockConfigUtilsService,
          },
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
        ],
      })
        .overrideComponent(ConfiguratorTabBarComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorTabBarComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    configurationObs = of(
      ConfiguratorTestUtils.createConfiguration(
        'a',
        ConfiguratorModelUtils.createInitialOwner()
      )
    );
    component.ghostStyle = false;

    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );
    keyboardFocusService = TestBed.inject(
      KeyboardFocusService as Type<KeyboardFocusService>
    );
    spyOn(keyboardFocusService, 'clear').and.callThrough();
    spyOn(
      configuratorStorefrontUtilsService,
      'focusFirstActiveElement'
    ).and.callThrough();
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should render ghost view if no data is present', () => {
    configurationObs = NEVER;
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('.cx-ghost-tab-bar').length).toEqual(1);
  });

  it('should render 2 navigation links per default', () => {
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('a').length).toEqual(2);
  });

  it('should render no links if router states displayOnly', () => {
    mockRouterState.state.params.displayOnly = true;

    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('a').length).toEqual(0);
  });

  it('should tell from semantic route that we are on OV page', () => {
    mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
    component.isOverviewPage$
      .subscribe((isOv) => expect(isOv).toBe(true))
      .unsubscribe();
  });

  it('should tell from semantic route that we are on config page', () => {
    mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
    component.isOverviewPage$
      .subscribe((isOv) => expect(isOv).toBe(false))
      .unsubscribe();
  });

  it('should return proper page type from route', () => {
    mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
    component.pageType$
      .subscribe((pageType) =>
        expect(pageType).toBe(ConfiguratorRouter.PageType.OVERVIEW)
      )
      .unsubscribe();
  });

  it('should return configuration page in case router does not specify page', () => {
    mockRouterState.state.semanticRoute = undefined;
    component.pageType$
      .subscribe((pageType) =>
        expect(pageType).toBe(ConfiguratorRouter.PageType.CONFIGURATION)
      )
      .unsubscribe();
  });

  describe('Accessibility', () => {
    describe('Configuration tag', () => {
      it("should contain an element with 'aria-label' attribute that defines an accessible name to label the current element I", () => {
        mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          0,
          'aria-label',
          'configurator.a11y.configurationPage',
          'configurator.tabBar.configuration'
        );
      });

      it("should contain an element with 'aria-label' attribute that defines an accessible name to label the current element II", () => {
        mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          0,
          'aria-label',
          'configurator.a11y.configurationPageLink',
          'configurator.tabBar.configuration'
        );
      });

      it("should contain an element with 'aria-selected' attribute set to true if the configuration page is displayed", () => {
        mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          0,
          'aria-selected',
          'true',
          'configurator.tabBar.configuration'
        );
      });

      it("should contain an element with 'aria-selected' attribute set to false if the overview page is displayed", () => {
        mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          0,
          'aria-selected',
          'false',
          'configurator.tabBar.configuration'
        );
      });

      it("should contain an element with 'role' attribute that defines the link as a tab", () => {
        mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          0,
          'role',
          'tab',
          'configurator.tabBar.configuration'
        );
      });
    });

    describe('Overview tag', () => {
      it("should contain an element with 'aria-label' attribute that defines an accessible name to label the current element I", () => {
        mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          1,
          'aria-label',
          'configurator.a11y.overviewPage',
          'configurator.tabBar.overview'
        );
      });

      it("should contain an element with 'aria-label' attribute that defines an accessible name to label the current element II", () => {
        mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          1,
          'aria-label',
          'configurator.a11y.overviewPageLink',
          'configurator.tabBar.overview'
        );
      });

      it("should contain an element with 'aria-selected' attribute set to false if the configuration page is displayed", () => {
        mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          1,
          'aria-selected',
          'false',
          'configurator.tabBar.overview'
        );
      });

      it("should contain an element with 'aria-selected' attribute set to true if the overview page is displayed", () => {
        mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          1,
          'aria-selected',
          'true',
          'configurator.tabBar.overview'
        );
      });

      it("should contain an element with 'role' attribute that defines the link as a tab", () => {
        mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          undefined,
          1,
          'role',
          'tab',
          'configurator.tabBar.overview'
        );
      });
    });
  });

  describe('getTabIndexOverviewTab', () => {
    it('should return tabindex 0 if on overview page', () => {
      mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
      expect(component.getTabIndexOverviewTab()).toBe(0);
    });

    it('should return tabindex -1 if on configuration page', () => {
      mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
      expect(component.getTabIndexOverviewTab()).toBe(-1);
    });
  });

  describe('getTabIndexForOverviewTab', () => {
    it('should return tabindex 0 if on overview page', () => {
      expect(
        component.getTabIndexForOverviewTab(
          ConfiguratorRouter.PageType.OVERVIEW
        )
      ).toBe(0);
    });

    it('should return tabindex -1 if on configuration page', () => {
      expect(
        component.getTabIndexForOverviewTab(
          ConfiguratorRouter.PageType.CONFIGURATION
        )
      ).toBe(-1);
    });
  });

  describe('getTabIndexConfigTab', () => {
    it('should return tabindex -1 if on overview page', () => {
      mockRouterState.state.semanticRoute = CONFIG_OVERVIEW_ROUTE;
      expect(component.getTabIndexConfigTab()).toBe(-1);
    });

    it('should return tabindex 0 if on configuration page', () => {
      mockRouterState.state.semanticRoute = CONFIGURATOR_ROUTE;
      expect(component.getTabIndexConfigTab()).toBe(0);
    });
  });

  describe('getTabIndeForConfigTab', () => {
    it('should return tabindex -1 if on overview page', () => {
      expect(
        component.getTabIndexForConfigTab(ConfiguratorRouter.PageType.OVERVIEW)
      ).toBe(-1);
    });

    it('should return tabindex 0 if on configuration page', () => {
      expect(
        component.getTabIndexForConfigTab(
          ConfiguratorRouter.PageType.CONFIGURATION
        )
      ).toBe(0);
    });
  });

  describe('determinePageFromRouterData', () => {
    it('should return configuration page in case router data does not specify a page', () => {
      const routerData: ConfiguratorRouter.Data = {
        owner: configWithOverview.owner,
      };
      expect(component['determinePageFromRouterData'](routerData)).toBe(
        ConfiguratorRouter.PageType.CONFIGURATION
      );
    });
  });

  describe('switchTabOnArrowPress', () => {
    it('should focus overview tab if right arrow pressed and if current tab is config tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });
      component.switchTabOnArrowPress(event, '#configTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe('configurator.tabBar.overview');
    });

    it('should focus overview tab if left arrow pressed and if current tab is config tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(event, '#configTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe('configurator.tabBar.overview');
    });

    it('should not change focus if up arrow pressed', () => {
      fixture.detectChanges();
      const leftEvent = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(leftEvent, '#configTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe('configurator.tabBar.overview');
      const downEvent = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });
      component.switchTabOnArrowPress(downEvent, '#configTab');
      document.activeElement;
      expect(focusedElement?.innerHTML).toBe('configurator.tabBar.overview');
    });

    it('should not change focus if down arrow pressed', () => {
      fixture.detectChanges();
      const leftEvent = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(leftEvent, '#configTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe('configurator.tabBar.overview');
      const downEvent = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });
      component.switchTabOnArrowPress(downEvent, '#configTab');
      document.activeElement;
      expect(focusedElement?.innerHTML).toBe('configurator.tabBar.overview');
    });

    it('should focus config tab if right arrow pressed and if current tab is overview tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });
      component.switchTabOnArrowPress(event, '#overviewTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        'configurator.tabBar.configuration'
      );
    });

    it('should focus config tab if left arrow pressed and if current tab is overview tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(event, '#overviewTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        'configurator.tabBar.configuration'
      );
    });
  });

  describe('Focus handling on navigation', () => {
    it('focusOverviewInTabBar should call clear and focusFirstActiveElement', fakeAsync(() => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(configWithOverview)
      );
      component['focusOverviewInTabBar']();
      tick(1); // needed because of delay(0) in focusOverviewInTabBar
      expect(keyboardFocusService.clear).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(1);
    }));

    it('focusOverviewInTabBar should not call clear and focusFirstActiveElement if overview data is not present in configuration', fakeAsync(() => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        configurationObs
      );
      component['focusOverviewInTabBar']();
      tick(1); // needed because of delay(0) in focusOverviewInTabBar
      expect(keyboardFocusService.clear).toHaveBeenCalledTimes(0);
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(0);
    }));

    it('focusConfigurationInTabBar should call clear and focusFirstActiveElement', fakeAsync(() => {
      component['focusConfigurationInTabBar']();
      tick(1); // needed because of delay(0) in focusConfigurationInTabBar
      expect(keyboardFocusService.clear).toHaveBeenCalledTimes(1);
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(1);
    }));

    it('navigateToOverview should navigate to overview page and should call focusFirstActiveElement inside focusOverviewInTabBar', fakeAsync(() => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(configWithOverview)
      );
      spyOn(routingService, 'go').and.callThrough();
      component['navigateToOverview'](mockRouterData);
      tick(1); // needed because of delay(0) in focusOverviewInTabBar
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'configureOverview' + mockRouterData.owner.configuratorType,
        params: {
          entityKey: mockRouterData.owner.id,
          ownerType: mockRouterData.owner.type,
        },
      });
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(1);
    }));

    it('navigateToConfiguration should navigate to configuration page and should call focusFirstActiveElement inside focusConfigurationInTabBar', fakeAsync(() => {
      spyOn(routingService, 'go').and.callThrough();
      component['navigateToConfiguration'](mockRouterData);
      tick(1); // needed because of delay(0) in focusConfigurationInTabBar
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'configure' + mockRouterData.owner.configuratorType,
        params: {
          entityKey: mockRouterData.owner.id,
          ownerType: mockRouterData.owner.type,
        },
      });
      expect(
        configuratorStorefrontUtilsService.focusFirstActiveElement
      ).toHaveBeenCalledTimes(1);
    }));
  });
});
