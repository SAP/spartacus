import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
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
  });

  it('should create component', () => {
    expect(component).toBeDefined();
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
      it("should contain a element with 'aria-label' attribute that defines an accessible name to label the current element I", () => {
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

      it("should contain a element with 'aria-label' attribute that defines an accessible name to label the current element II", () => {
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
    });

    describe('Overview tag', () => {
      it("should contain a element with 'aria-label' attribute that defines an accessible name to label the current element I", () => {
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

      it("should contain a element with 'aria-label' attribute that defines an accessible name to label the current element II", () => {
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
    });
  });
});
