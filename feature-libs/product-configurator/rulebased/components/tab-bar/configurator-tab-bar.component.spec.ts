import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
} from '@spartacus/product-configurator/common';
import { NEVER, Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
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
}

let configurationObs: Observable<Configurator.Configuration>;

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
}

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
});
