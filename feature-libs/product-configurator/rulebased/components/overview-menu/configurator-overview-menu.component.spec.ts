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
import { Type } from '@angular/core';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';

const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;

const CONFIG_ID = '1234-56-7890';
const GROUP_PREFIX = 'prefix';
const GROUP_ID_LOCAL = 'id';
const OV_GROUP_ID = GROUP_PREFIX + GROUP_ID_LOCAL;
const CONFIGURATION: Configurator.ConfigurationWithOverview = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration
    .overview as Configurator.Overview,
};

class MockConfiguratorGroupsService {
  setGroupStatusVisited() {}
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
  spyOn(configuratorStorefrontUtilsService, 'createOvGroupId').and.returnValue(
    OV_GROUP_ID
  );
  spyOn(
    configuratorStorefrontUtilsService,
    'scrollToConfigurationElement'
  ).and.callThrough();

  spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();
}

describe('ConfigurationOverviewMenuComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [ConfiguratorOverviewMenuComponent],
        providers: [
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
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
      ).toHaveBeenCalledWith('#' + OV_GROUP_ID);
    });
  });
});
