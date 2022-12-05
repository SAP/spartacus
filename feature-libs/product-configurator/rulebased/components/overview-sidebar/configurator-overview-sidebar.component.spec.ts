import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslationService } from '@spartacus/core';
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
import { ConfiguratorGroupsService } from '@spartacus/product-configurator/rulebased';

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

function initTestComponent() {
  fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  fixture.detectChanges();
}

class MockTranslationService {
  translate(): Observable<string> {
    return of('');
  }
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

class MockConfiguratorGroupsService {}

describe('ConfiguratorOverviewSidebarComponent', () => {
  let componentUnderTest: ConfiguratorOverviewSidebarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorOverviewSidebarComponent,
          useClass: ConfiguratorOverviewSidebarComponent,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfiguratorRouterExtractorService,
        },
      ],
    });

    componentUnderTest = TestBed.inject(
      ConfiguratorOverviewSidebarComponent as Type<ConfiguratorOverviewSidebarComponent>
    );
  });

  beforeEach(() => {
    defaultConfigObservable = of(CONFIGURATION);
  });

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
    componentUnderTest.showFilter = false;
    componentUnderTest.onFilter();
    expect(componentUnderTest.showFilter).toBeTruthy();
  });

  it('should set showFilters to false by calling onMenu', () => {
    componentUnderTest.showFilter = true;
    componentUnderTest.onMenu();
    expect(componentUnderTest.showFilter).toBeFalsy();
  });
});
