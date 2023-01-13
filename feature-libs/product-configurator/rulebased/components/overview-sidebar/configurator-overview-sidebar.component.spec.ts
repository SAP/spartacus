import { Component, Input, Type } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewSidebarComponent } from './configurator-overview-sidebar.component';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const CONFIG_ID = '1234-56-7890';
const CONFIGURATION: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration.overview,
};

let component: ConfiguratorOverviewSidebarComponent;
let fixture: ComponentFixture<ConfiguratorOverviewSidebarComponent>;
let htmlElem: HTMLElement;
let defaultConfigObservable: any;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

function initTestComponent() {
  defaultConfigObservable = of(CONFIGURATION);
  fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.ghostStyle = false;
  fixture.detectChanges();
  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
  );

  spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return defaultConfigObservable;
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(ConfigurationTestData.mockRouterState);
  }
}

class MockConfiguratorStorefrontUtilsService {
  getHeight() {}
  changeStyling() {}
  getElement() {}
}

@Component({
  selector: 'cx-configurator-overview-filter',
  template: '',
})
class MockConfiguratorOverviewFilterComponent {
  @Input() showFilterBar: boolean = true;
  @Input() config: Configurator.ConfigurationWithOverview;
}

@Component({
  selector: 'cx-configurator-overview-menu',
  template: '',
})
class MockConfiguratorOverviewMenuComponent {
  @Input() config: Configurator.ConfigurationWithOverview;
}

describe('ConfiguratorOverviewSidebarComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          MockConfiguratorOverviewFilterComponent,
          MockConfiguratorOverviewMenuComponent,
        ],
        providers: [
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorService,
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
    initTestComponent();
    expect(component).toBeDefined();
  });

  it('should render overview menu component by default', () => {
    initTestComponent();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should render overview filter component when filter tab is selected', () => {
    initTestComponent();
    // click filter button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('click');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-filter'
    );
  });

  it('should render overview menu component when menu tab is selected', () => {
    initTestComponent();
    component.onFilter();
    fixture.detectChanges();
    // click menu button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[0]
      .triggerEventHandler('click');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should set showFilters to true by calling onFilter', () => {
    component.onFilter();
    expect(component.showFilter).toBe(true);
  });

  it('should set showFilters to false by calling onMenu', () => {
    component.showFilter = true;
    component.onMenu();
    expect(component.showFilter).toBe(false);
  });
});
