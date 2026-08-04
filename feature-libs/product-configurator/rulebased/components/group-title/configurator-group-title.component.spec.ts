import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoutingService } from '@spartacus/core';
import { CommonConfiguratorUtilsService } from '@spartacus/product-configurator/common';
import {
  BreakpointService,
  HamburgerMenuComponent,
  HamburgerMenuService,
  IconLoaderService,
} from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorGroupTitleComponent } from './configurator-group-title.component';
import { vi } from 'vitest';

const config: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

let routerStateObservable: Observable<RouterState>;
const group = ConfiguratorTestUtils.createGroup('1-CPQ_LAPTOP.1');

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockRouter {
  public events = of('');
}

class MockConfiguratorGroupService {
  navigateToGroup(): void {}

  getCurrentGroup(): Observable<Configurator.Group> {
    return of(group);
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }

  hasConfiguration(): Observable<boolean> {
    return of(false);
  }

  readConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }
}

export class MockIconFontLoaderService {
  getFlipDirection(): void {}
}

class MockBreakpointService {
  isDown(): void {}

  isUp(): void {}
}

@Component({
  selector: 'cx-hamburger-menu',
  template: '',
  imports: [ReactiveFormsModule, NgSelectModule],
})
class MockHamburgerMenuComponent {}

class MockConfiguratorStorefrontUtilsService {
  changeStyling(): void {}
  focusFirstActiveElement(): void {}
  removeStyling(): void {}
}

describe('ConfiguratorGroupTitleComponent', () => {
  let component: ConfiguratorGroupTitleComponent;
  let fixture: ComponentFixture<ConfiguratorGroupTitleComponent>;
  let htmlElem: HTMLElement;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let configExpertModeService: ConfiguratorExpertModeService;
  let breakpointService: BreakpointService;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
  let hamburgerMenuService: HamburgerMenuService;

  beforeEach(async () => {
    routerStateObservable = of(ConfigurationTestData.mockRouterState);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        ConfiguratorGroupTitleComponent,
      ],
      providers: [
        HamburgerMenuService,
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupService,
        },
        { provide: IconLoaderService, useClass: MockIconFontLoaderService },
        {
          provide: BreakpointService,
          useClass: MockBreakpointService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfiguratorStorefrontUtilsService,
        },
      ],
    })
      .overrideComponent(ConfiguratorGroupTitleComponent, {
        remove: { imports: [HamburgerMenuComponent] },
        add: { imports: [MockHamburgerMenuComponent] },
      })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorGroupTitleComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.ghostStyle = false;

    configuratorGroupsService = TestBed.inject(ConfiguratorGroupsService);

    configuratorUtils = TestBed.inject(CommonConfiguratorUtilsService);
    configuratorUtils.setOwnerKey(config.owner);
    vi.spyOn(configuratorGroupsService, 'navigateToGroup').mockImplementation(() => {});

    configExpertModeService = TestBed.inject(ConfiguratorExpertModeService);

    breakpointService = TestBed.inject(BreakpointService);

    vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));

    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService
    );

    vi.spyOn(configuratorStorefrontUtilsService, 'changeStyling').mockImplementation(() => {});
    vi.spyOn(configuratorStorefrontUtilsService, 'removeStyling');
    vi.spyOn(
      configuratorStorefrontUtilsService,
      'focusFirstActiveElement'
    ).mockImplementation(() => {});

    hamburgerMenuService = TestBed.inject(HamburgerMenuService);
    vi.spyOn(hamburgerMenuService, 'toggle');
  });

  it('should create component with expanded hamburger menu icon', () => {
    hamburgerMenuService.toggle(false);
    vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(
      configuratorStorefrontUtilsService.changeStyling
    ).toHaveBeenCalledTimes(2);
    expect(
      configuratorStorefrontUtilsService.changeStyling
    ).toHaveBeenCalledWith('.PreHeader', 'display', 'block');
    expect(
      configuratorStorefrontUtilsService.changeStyling
    ).toHaveBeenCalledWith(
      'cx-configurator-add-to-cart-button',
      'z-index',
      '0'
    );
    expect(
      configuratorStorefrontUtilsService.focusFirstActiveElement
    ).toHaveBeenCalledWith('cx-configurator-group-menu');
  });

  it('should create component with hamburger menu icon', () => {
    vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
    fixture.detectChanges();
    expect(component).toBeDefined();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-hamburger-menu'
    );
    expect(
      configuratorStorefrontUtilsService.changeStyling
    ).toHaveBeenCalledTimes(2);
    expect(
      configuratorStorefrontUtilsService.changeStyling
    ).toHaveBeenCalledWith('.PreHeader', 'display', 'none');
    expect(
      configuratorStorefrontUtilsService.changeStyling
    ).toHaveBeenCalledWith(
      'cx-configurator-add-to-cart-button',
      'z-index',
      'calc(var(--cx-popover-z-index) + 10)'
    );
    expect(
      configuratorStorefrontUtilsService.focusFirstActiveElement
    ).toHaveBeenCalledWith('.cx-group-title');
  });

  it('should get group id as part of group', () => {
    component.displayedGroup$.subscribe((data: Configurator.Group) => {
      expect(data.id).toEqual(group.id);
    });
  });

  describe('getGroupTitle', () => {
    it('should return group title', () => {
      vi.spyOn(configExpertModeService, 'getExpModeActive').mockReturnValue(
        of(false)
      );
      expect(component.getGroupTitle(config.groups[0])).toEqual(
        config.groups[0].description
      );
    });

    it('should return group title for expert mode', () => {
      vi.spyOn(configExpertModeService, 'getExpModeActive').mockReturnValue(
        of(true)
      );
      const groupMenuTitle =
        config.groups[0].description + ' / [' + config.groups[0].name + ']';
      expect(component.getGroupTitle(config.groups[0])).toEqual(groupMenuTitle);
    });

    it('should return conflict group title for expert mode', () => {
      const configForExpMode =
        ConfigurationTestData.productConfigurationWithConflicts;
      vi.spyOn(configExpertModeService, 'getExpModeActive').mockReturnValue(
        of(true)
      );
      fixture.detectChanges();
      expect(
        component.getGroupTitle(configForExpMode.groups[0].subGroups[0])
      ).toEqual(configForExpMode.groups[0].subGroups[0].description);
    });
  });

  describe('isMobile', () => {
    it('should not render hamburger menu in desktop mode', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(false));
      fixture.detectChanges();

      component.isMobile().subscribe((isMobile) => {
        expect(isMobile).toBe(false);
      });
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-hamburger-menu'
      );
    });

    it('should render hamburger menu in mobile mode', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
      fixture.detectChanges();

      component.isMobile().subscribe((isMobile) => {
        expect(isMobile).toBe(true);
      });
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-hamburger-menu'
      );
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe and remove styling on ngOnDestroy', () => {
      const spyUnsubscribe = vi.spyOn(Subscription.prototype, 'unsubscribe');
      component.ngOnDestroy();
      expect(spyUnsubscribe).toHaveBeenCalled();
      expect(
        configuratorStorefrontUtilsService.removeStyling
      ).toHaveBeenCalledWith(component['PRE_HEADER'], 'display');
    });
  });
});
