import { Component, Directive, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorTestUtilsService,
  CommonConfiguratorUtilsService,
} from '@spartacus/product/configurators/common';
import { HamburgerMenuService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  ATTRIBUTE_1_CHECKBOX,
  CONFIGURATOR_ROUTE,
  GROUP_ID_1,
  mockRouterState,
  productConfiguration,
  PRODUCT_CODE,
} from '../../shared/testing/configurator-test-data';
import { ConfiguratorStorefrontUtilsService } from './../service/configurator-storefront-utils.service';
import { ConfiguratorGroupMenuComponent } from './configurator-group-menu.component';

let mockGroupVisited = false;
const mockProductConfiguration: Configurator.Configuration = productConfiguration;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

const simpleConfig: Configurator.Configuration = {
  configId: mockProductConfiguration.configId,
  groups: [
    {
      id: GROUP_ID_1,
      complete: true,
      configurable: true,
      consistent: true,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [
        {
          name: ATTRIBUTE_1_CHECKBOX,
          uiType: Configurator.UiType.CHECKBOXLIST,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [],
    },
  ],
  interactionState: {
    issueNavigationDone: false,
  },
};

const inconsistentConfig: Configurator.Configuration = {
  configId: mockProductConfiguration.configId,
  groups: mockProductConfiguration.groups,
  flatGroups: mockProductConfiguration.flatGroups,
  consistent: false,
  complete: true,
  interactionState: {
    issueNavigationDone: false,
  },
};

const incompleteConfig: Configurator.Configuration = {
  configId: mockProductConfiguration.configId,
  groups: mockProductConfiguration.groups,
  flatGroups: mockProductConfiguration.flatGroups,
  consistent: true,
  complete: false,
  interactionState: {
    issueNavigationDone: false,
  },
};

class MockRouter {
  public events = of('');
}

const mockRouterStateIssueNavigation: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
    },
    queryParams: { resolveIssues: 'true' },
    semanticRoute: CONFIGURATOR_ROUTE,
  },
};

class MockConfiguratorGroupService {
  setMenuParentGroup() {}

  getGroupStatus() {
    return of(null);
  }

  isGroupVisited() {
    return groupVisitedObservable;
  }

  findParentGroup() {
    return null;
  }

  navigateToGroup() {}

  getCurrentGroup(): Observable<Configurator.Group> {
    return of(mockProductConfiguration.groups[0]);
  }

  getMenuParentGroup(): Observable<Configurator.Group> {
    return of(null);
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }

  getParentGroup(): Configurator.Group {
    return null;
  }

  isConflictGroupType() {
    return isConflictGroupType;
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return productConfigurationObservable;
  }
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

let component: ConfiguratorGroupMenuComponent;
let fixture: ComponentFixture<ConfiguratorGroupMenuComponent>;
let configuratorGroupsService: ConfiguratorGroupsService;
let hamburgerMenuService: HamburgerMenuService;
let htmlElem: HTMLElement;
let configuratorUtils: CommonConfiguratorUtilsService;
let routerStateObservable;
let groupVisitedObservable;
let productConfigurationObservable;
let isConflictGroupType;

function initialize() {
  groupVisitedObservable = of(mockGroupVisited);
  fixture = TestBed.createComponent(ConfiguratorGroupMenuComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}

describe('ConfigurationGroupMenuComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [
          ConfiguratorGroupMenuComponent,
          MockCxIconComponent,
          MockFocusDirective,
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
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: ConfiguratorStorefrontUtilsService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    groupVisitedObservable = null;

    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    hamburgerMenuService = TestBed.inject(
      HamburgerMenuService as Type<HamburgerMenuService>
    );
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(mockProductConfiguration.owner);
    spyOn(configuratorGroupsService, 'navigateToGroup').and.stub();
    spyOn(configuratorGroupsService, 'setMenuParentGroup').and.stub();
    spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();
    spyOn(configuratorGroupsService, 'isGroupVisited').and.callThrough();
    isConflictGroupType = false;
    spyOn(configuratorGroupsService, 'isConflictGroupType').and.callThrough();
    spyOn(hamburgerMenuService, 'toggle').and.stub();
  });

  it('should create component', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    component.configuration$.subscribe((data: Configurator.Configuration) => {
      expect(data.productCode).toEqual(PRODUCT_CODE);
    });
  });

  it('should render 5 groups directly after init has been performed as groups are compiled without delay', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-menu-item').length).toBe(5);
  });

  it('should render no groups if configuration is not consistent and issue navigation has not been done although required by the router', () => {
    productConfigurationObservable = of(inconsistentConfig);
    routerStateObservable = of(mockRouterStateIssueNavigation);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-menu-item').length).toBe(0);
  });

  it('should render no groups if configuration is not complete and issue navigation has not been done although required by the router', () => {
    productConfigurationObservable = of(incompleteConfig);
    routerStateObservable = of(mockRouterStateIssueNavigation);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-menu-item').length).toBe(0);
  });

  it('should render all groups if configuration is not consistent and issue navigation has not been done but also not required by the router', () => {
    productConfigurationObservable = of(inconsistentConfig);
    routerStateObservable = of(mockRouterState);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-menu-item').length).toBe(5);
  });

  it('should render all groups if configuration is not complete and issue navigation has not been done but also not required by the router', () => {
    productConfigurationObservable = of(incompleteConfig);
    routerStateObservable = of(mockRouterState);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-menu-item').length).toBe(5);
  });

  it('should render groups if configuration is not consistent but issues have been checked', () => {
    productConfigurationObservable = of(incompleteConfig);
    routerStateObservable = of(mockRouterState);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-menu-item').length).toBe(5);
  });

  it('should return 5 groups after groups have been compiled', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    component.displayedGroups$.pipe(take(1)).subscribe((groups) => {
      expect(groups.length).toBe(5);
    });
  });

  it('should set current group in case of clicking on a group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();

    component.click(mockProductConfiguration.groups[1]);

    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();
  });

  it('should condense groups', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    expect(
      component.condenseGroups(mockProductConfiguration.groups)[2].id
    ).toBe(mockProductConfiguration.groups[2].subGroups[0].id);
  });

  it('should get correct parent group for condensed groups', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    //Condensed case
    component
      .getCondensedParentGroup(mockProductConfiguration.groups[2])
      .pipe(take(1))
      .subscribe((group) => {
        expect(group).toBe(null);
      });

    //Non condensed case
    component
      .getCondensedParentGroup(mockProductConfiguration.groups[0])
      .pipe(take(1))
      .subscribe((group) => {
        expect(group).toBe(mockProductConfiguration.groups[0]);
      });
  });

  it('should call correct methods for groups with and without subgroups', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    //Set group
    component.click(mockProductConfiguration.groups[2].subGroups[0]);
    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();

    //Display subgroups
    component.click(mockProductConfiguration.groups[2]);
    expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
  });

  it('should return number of conflicts only for conflict header group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();
    const groupWithConflicts = {
      groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
      subGroups: [
        { groupType: Configurator.GroupType.CONFLICT_GROUP },
        { groupType: Configurator.GroupType.CONFLICT_GROUP },
      ],
    };
    expect(component.getConflictNumber(groupWithConflicts)).toBe('(2)');
    const attributeGroup = {
      groupType: Configurator.GroupType.SUB_ITEM_GROUP,
      subGroups: [
        { groupType: Configurator.GroupType.ATTRIBUTE_GROUP },
        { groupType: Configurator.GroupType.ATTRIBUTE_GROUP },
      ],
    };
    expect(component.getConflictNumber(attributeGroup)).toBe('');
  });

  describe('isGroupVisited', () => {
    it('should call status method if group has been visited', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      initialize();
      component
        .isGroupVisited(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe();

      expect(configuratorGroupsService.isGroupVisited).toHaveBeenCalled();
      expect(configuratorGroupsService.isConflictGroupType).toHaveBeenCalled();
    });

    it('should return true if visited and not conflict group', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      initialize();
      component
        .isGroupVisited(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((visited) => expect(visited).toBeTrue());
    });

    it('should return false if visited and if it is a conflict group', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = true;
      initialize();
      component
        .isGroupVisited(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((visited) => expect(visited).toBeFalse());
    });

    it('should return false if not visited and not conflict group', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = false;
      initialize();
      component
        .isGroupVisited(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((visited) => expect(visited).toBeFalse());
    });
  });

  describe('verify whether the corresponding group status class stands at cx-menu-item element', () => {
    it("should contain 'WARNING' class despite the group has not been visited", () => {
      simpleConfig.consistent = false;
      simpleConfig.groups[0].consistent = false;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = true;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.WARNING'
      );
    });

    it("should contain 'WARNING' class because the group has been visited and has some conflicts", () => {
      simpleConfig.consistent = false;
      simpleConfig.groups[0].consistent = false;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = true;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.WARNING'
      );
    });

    it("should not contain 'COMPLETE' class despite the group is complete but it has not been visited", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].complete = true;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.COMPLETE'
      );
    });

    it("should contain 'COMPLETE' class because the group is complete and has been visited", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].complete = true;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.COMPLETE'
      );
    });

    it("should not contain 'ERROR' class despite the group is incomplete but it has not been visited", () => {
      simpleConfig.complete = false;
      simpleConfig.groups[0].complete = false;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.ERROR'
      );
    });

    it("should contain 'ERROR' class because the group is incomplete and has been visited", () => {
      simpleConfig.complete = false;
      simpleConfig.groups[0].complete = false;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.ERROR'
      );
    });

    it("should contain 'DISABLED' class despite the group is empty", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].configurable = false;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'li.cx-menu-item.DISABLED'
      );
    });
  });
});
