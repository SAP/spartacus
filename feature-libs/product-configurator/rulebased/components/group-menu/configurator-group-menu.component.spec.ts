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
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import {
  DirectionMode,
  DirectionService,
  HamburgerMenuService,
  ICON_TYPE,
} from '@spartacus/storefront';
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
  PRODUCT_CODE,
  productConfiguration,
} from '../../shared/testing/configurator-test-data';
import { ConfiguratorStorefrontUtilsService } from './../service/configurator-storefront-utils.service';
import { ConfiguratorGroupMenuComponent } from './configurator-group-menu.component';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';

let mockGroupVisited = false;
let mockDirection = DirectionMode.LTR;
const mockProductConfiguration: Configurator.Configuration = productConfiguration;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

const baseStyleClass = 'cx-menu-item';
const completeStyleClass = ' COMPLETE';
const errorStyleClass = ' ERROR';
const warningStyleClass = ' WARNING';
const typeCPQ = ConfiguratorType.CPQ;
const typeVariant = ConfiguratorType.VARIANT;

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
  owner: ConfiguratorModelUtils.createInitialOwner(),
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
  owner: ConfiguratorModelUtils.createInitialOwner(),
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
  owner: ConfiguratorModelUtils.createInitialOwner(),
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

class MockDirectionService {
  getDirection() {
    return direction;
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
let configGroupMenuService: ConfiguratorGroupMenuService;
let routerStateObservable;
let groupVisitedObservable;
let productConfigurationObservable;
let isConflictGroupType;
let directionService: DirectionService;
let direction: DirectionMode;

function initialize() {
  groupVisitedObservable = of(mockGroupVisited);
  direction = mockDirection;
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
          {
            provide: DirectionService,
            useClass: MockDirectionService,
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
    spyOn(configuratorGroupsService, 'navigateToGroup').and.stub();
    spyOn(configuratorGroupsService, 'setMenuParentGroup').and.stub();
    spyOn(configuratorGroupsService, 'isGroupVisited').and.callThrough();
    isConflictGroupType = false;
    spyOn(configuratorGroupsService, 'isConflictGroupType').and.callThrough();

    hamburgerMenuService = TestBed.inject(
      HamburgerMenuService as Type<HamburgerMenuService>
    );
    spyOn(hamburgerMenuService, 'toggle').and.stub();

    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(mockProductConfiguration.owner);

    configGroupMenuService = TestBed.inject(
      ConfiguratorGroupMenuService as Type<ConfiguratorGroupMenuService>
    );
    spyOn(configGroupMenuService, 'switchGroupOnArrowPress').and.stub();

    directionService = TestBed.inject(
      DirectionService as Type<DirectionService>
    );
    spyOn(directionService, 'getDirection').and.callThrough();
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

  it('should return 0 groups if menu parent group is first group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    spyOn(configuratorGroupsService, 'getMenuParentGroup').and.returnValue(
      of(mockProductConfiguration.groups[0])
    );
    initialize();

    component.displayedGroups$.pipe(take(1)).subscribe((groups) => {
      expect(groups.length).toBe(0);
    });
  });

  it('should set current group in case of clicking on a different group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();

    component.click(mockProductConfiguration.groups[0]);

    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();
  });

  it('should not set current group and not execute navigation in case of clicking on same group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    initialize();

    component.click(mockProductConfiguration.groups[1]);

    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalledTimes(0);
    expect(hamburgerMenuService.toggle).toHaveBeenCalledTimes(0);
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

  it('should navigate up', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    spyOn(configuratorGroupsService, 'getParentGroup').and.returnValue(
      mockProductConfiguration.groups[0]
    );
    initialize();
    component.navigateUp();
    expect(configuratorGroupsService.getParentGroup).toHaveBeenCalled();
    expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
  });

  it('should navigate up, parent group null', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    routerStateObservable = of(mockRouterState);
    spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();
    initialize();
    component.navigateUp();
    expect(configuratorGroupsService.getParentGroup).toHaveBeenCalled();
    expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
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

  describe('getGroupStatusStyles', () => {
    it('should return COMPLETE style class  for variant configurator if group is complete and consistent', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[1].complete = true;
      mockProductConfiguration.groups[1].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[1],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) =>
          expect(style).toEqual(baseStyleClass + completeStyleClass)
        );
    });

    it('should not return COMPLETE style class if group is complete, consistent and type is CPQ', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[1].complete = true;
      mockProductConfiguration.groups[1].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[1],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) => expect(style).toEqual(baseStyleClass));
    });

    it('should return WARNING style class if group is inconsistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = true;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) =>
          expect(style).toEqual(baseStyleClass + warningStyleClass)
        );
    });

    it('should not return WARNING style class if group is inconsistent and type is CPQ', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = true;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) => expect(style).toEqual(baseStyleClass));
    });

    it('should return ERROR style class if group is incomplete, consistent and type is CPQ', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) =>
          expect(style).toEqual(baseStyleClass + errorStyleClass)
        );
    });

    it('should return ERROR style class if group is incomplete, consistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) =>
          expect(style).toEqual(baseStyleClass + errorStyleClass)
        );
    });

    it('should return WARNING and ERROR style class if group is incomplete, inconsistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) =>
          expect(style).toEqual(
            baseStyleClass + warningStyleClass + errorStyleClass
          )
        );
    });

    it('should return ERROR style class if group is incomplete, inconsistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getGroupStatusStyles(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((style) =>
          expect(style).toEqual(baseStyleClass + errorStyleClass)
        );
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
        '.cx-menu-item.WARNING'
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
        '.cx-menu-item.WARNING'
      );
    });

    it("should not contain 'WARNING' class despite the group has been visited and has some conflicts but the type is CPQ ", () => {
      simpleConfig.consistent = false;
      simpleConfig.groups[0].consistent = false;
      simpleConfig.owner.configuratorType = typeCPQ;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = true;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-menu-item.WARNING'
      );
    });

    it("should not contain 'COMPLETE' class despite the group is complete but it has not been visited", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].complete = true;
      simpleConfig.groups[0].consistent = true;
      simpleConfig.owner.configuratorType = typeVariant;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-menu-item.COMPLETE'
      );
    });

    it("should not contain 'COMPLETE' class despite the group is complete and visited but it has conflicts", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].complete = true;
      simpleConfig.groups[0].consistent = false;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-menu-item.COMPLETE'
      );
    });

    it("should contain 'COMPLETE' class because the group is complete and has been visited", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].complete = true;
      simpleConfig.groups[0].consistent = true;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-menu-item.COMPLETE'
      );
    });

    it("should not contain 'COMPLETE' class despite the group is complete and has been visited but the type is CPQ", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].complete = true;
      simpleConfig.groups[0].consistent = true;
      simpleConfig.owner.configuratorType = typeCPQ;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-menu-item.COMPLETE'
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
        '.cx-menu-item.ERROR'
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
        '.cx-menu-item.ERROR'
      );
    });

    it("should contain 'DISABLED' class despite the group is empty", () => {
      simpleConfig.complete = true;
      simpleConfig.groups[0].configurable = false;
      simpleConfig.owner.configuratorType = typeVariant;
      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = false;
      isConflictGroupType = false;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-menu-item.DISABLED'
      );
    });
  });

  describe('switchGroupOnArrowPress', () => {
    it('should focus next group items', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      initialize();

      const event = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });

      component.switchGroupOnArrowPress(event, 0);
      expect(configGroupMenuService.switchGroupOnArrowPress).toHaveBeenCalled();
    });

    it('should focus previous group items', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      initialize();

      const event = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });

      component.switchGroupOnArrowPress(event, 0);
      expect(configGroupMenuService.switchGroupOnArrowPress).toHaveBeenCalled();
    });

    describe('LTR direction', () => {
      it('should navigate back to parent group', () => {
        productConfigurationObservable = of(mockProductConfiguration);
        routerStateObservable = of(mockRouterState);
        mockDirection = DirectionMode.LTR;
        initialize();
        spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(true);
        spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();

        let event = new KeyboardEvent('keydown', {
          code: 'ArrowLeft',
        });

        component.switchGroupOnArrowPress(event, 0);
        expect(configGroupMenuService.isBackBtnFocused).toHaveBeenCalled();
        expect(configuratorGroupsService.getParentGroup).toHaveBeenCalled();
        expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
      });

      it('should navigate to subgroups', () => {
        productConfigurationObservable = of(mockProductConfiguration);
        routerStateObservable = of(mockRouterState);
        mockDirection = DirectionMode.LTR;
        initialize();
        spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(
          false
        );

        let event = new KeyboardEvent('keydown', {
          code: 'ArrowRight',
        });

        component.switchGroupOnArrowPress(
          event,
          0,
          mockProductConfiguration.groups[2]
        );

        expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
      });
    });

    describe('RTL direction', () => {
      it('should navigate back to parent group', () => {
        productConfigurationObservable = of(mockProductConfiguration);
        routerStateObservable = of(mockRouterState);
        mockDirection = DirectionMode.RTL;
        initialize();
        spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(true);
        spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();

        let event = new KeyboardEvent('keydown', {
          code: 'ArrowRight',
        });

        component.switchGroupOnArrowPress(event, 0);
        expect(configGroupMenuService.isBackBtnFocused).toHaveBeenCalled();
        expect(configuratorGroupsService.getParentGroup).toHaveBeenCalled();
        expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
      });

      it('should navigate to subgroups', () => {
        productConfigurationObservable = of(mockProductConfiguration);
        routerStateObservable = of(mockRouterState);
        mockDirection = DirectionMode.RTL;
        initialize();
        spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(
          false
        );

        let event = new KeyboardEvent('keydown', {
          code: 'ArrowLeft',
        });

        component.switchGroupOnArrowPress(
          event,
          0,
          mockProductConfiguration.groups[2]
        );

        expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
      });
    });
  });

  describe('createAriaControls', () => {
    it('should return empty string because groupID is null', () => {
      expect(component.createAriaControls(null)).toBeUndefined();
    });

    it('should return empty string because groupID is undefined', () => {
      expect(component.createAriaControls(undefined)).toBeUndefined();
    });

    it('should return aria-controls string', () => {
      expect(component.createAriaControls('1234')).toBe('1234-group');
    });
  });
});
