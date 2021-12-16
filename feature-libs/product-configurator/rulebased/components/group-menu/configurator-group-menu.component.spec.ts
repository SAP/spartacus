import { Component, Directive, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CommonConfigurator,
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
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  ATTRIBUTE_1_CHECKBOX,
  CONFIGURATOR_ROUTE,
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_4,
  GROUP_ID_5,
  GROUP_ID_7,
  mockRouterState,
  productConfiguration,
  PRODUCT_CODE,
} from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from './../service/configurator-storefront-utils.service';
import { ConfiguratorGroupMenuComponent } from './configurator-group-menu.component';
import { ConfiguratorGroupMenuService } from './configurator-group-menu.component.service';

let mockGroupVisited = false;
let mockDirection = DirectionMode.LTR;
const mockProductConfiguration: Configurator.Configuration =
  productConfiguration;

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
  flatGroups: [],
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

  getMenuParentGroup(): Observable<Configurator.Group | undefined> {
    return of(undefined);
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }

  getParentGroup(): Configurator.Group | undefined {
    return undefined;
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
  @Input('cxFocus') protected config: string;
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
let routerStateObservable: Observable<RouterState>;
let groupVisitedObservable: Observable<boolean>;
let productConfigurationObservable: Observable<Configurator.Configuration>;
let isConflictGroupType: boolean;
let directionService: DirectionService;
let direction: DirectionMode;
let configUtils: ConfiguratorStorefrontUtilsService;

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
            provide: DirectionService,
            useClass: MockDirectionService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    groupVisitedObservable = of(false);

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

    configUtils = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );
    spyOn(configUtils, 'setFocus').and.stub();

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
        expect(group).toBe(undefined);
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
    spyOn(configuratorGroupsService, 'getMenuParentGroup').and.returnValue(
      of(mockProductConfiguration.groups[0])
    );
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
    spyOn(configuratorGroupsService, 'getMenuParentGroup').and.returnValue(
      of(mockProductConfiguration.groups[0])
    );
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
    const groupWithConflicts: Configurator.Group = {
      id: '1',
      groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
      subGroups: [
        {
          ...ConfiguratorTestUtils.createGroup('2'),
          groupType: Configurator.GroupType.CONFLICT_GROUP,
        },
        {
          ...ConfiguratorTestUtils.createGroup('2'),
          groupType: Configurator.GroupType.CONFLICT_GROUP,
        },
      ],
    };
    expect(component.getConflictNumber(groupWithConflicts)).toBe('(2)');
    const attributeGroup: Configurator.Group = {
      id: '1',
      groupType: Configurator.GroupType.SUB_ITEM_GROUP,
      subGroups: [
        {
          ...ConfiguratorTestUtils.createGroup('2'),
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        },
        {
          ...ConfiguratorTestUtils.createGroup('3'),
          groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        },
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
        .subscribe((visited) => expect(visited).toBe(true));
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
        .subscribe((visited) => expect(visited).toBe(false));
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
        .subscribe((visited) => expect(visited).toBe(false));
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
      simpleConfig.groups[0].description = 'Group Name';

      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-menu-item.WARNING'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'cx-menu-item',
        0,
        'aria-label',
        'configurator.a11y.groupName group:Group Name'
      );
    });

    it('should add correct aria-attributes to conflict group', () => {
      simpleConfig.consistent = false;
      simpleConfig.groups[0].consistent = false;
      simpleConfig.groups[0].description = 'Resolve Conlflicts';
      simpleConfig.groups[0].groupType =
        Configurator.GroupType.CONFLICT_HEADER_GROUP;
      simpleConfig.groups[0].subGroups = [{ id: 'subgroup1', subGroups: [] }];

      productConfigurationObservable = of(simpleConfig);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      isConflictGroupType = true;
      initialize();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'cx-menu-conflict',
        0,
        'aria-label',
        'configurator.a11y.conflictsInConfiguration numberOfConflicts:(1)'
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
    beforeEach(() => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      initialize();
    });

    it('should focus next group items', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });

      const group: Configurator.Group = mockProductConfiguration.groups[2];
      const currentGroup: Configurator.Group =
        mockProductConfiguration.groups[0];

      component.switchGroupOnArrowPress(event, 0, group, currentGroup);
      expect(configGroupMenuService.switchGroupOnArrowPress).toHaveBeenCalled();
    });

    it('should focus previous group items', () => {
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });

      const group: Configurator.Group = mockProductConfiguration.groups[2];
      const currentGroup: Configurator.Group =
        mockProductConfiguration.groups[0];

      component.switchGroupOnArrowPress(event, 0, group, currentGroup);
      expect(configGroupMenuService.switchGroupOnArrowPress).toHaveBeenCalled();
    });
  });

  describe('LTR direction', () => {
    it('should navigate back to parent group', () => {
      spyOn(configuratorGroupsService, 'getMenuParentGroup').and.returnValue(
        of(mockProductConfiguration.groups[0])
      );
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockDirection = DirectionMode.LTR;
      initialize();
      spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(true);
      spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();

      let event = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });

      const currentGroup: Configurator.Group =
        mockProductConfiguration.groups[0];

      component.switchGroupOnArrowPress(
        event,
        0,
        mockProductConfiguration.groups[1],
        currentGroup
      );
      expect(configGroupMenuService.isBackBtnFocused).toHaveBeenCalled();
      expect(configuratorGroupsService.getParentGroup).toHaveBeenCalled();
      expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
    });

    it('should navigate to subgroups', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockDirection = DirectionMode.LTR;
      initialize();
      spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(false);

      let event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });

      const group: Configurator.Group = mockProductConfiguration.groups[2];
      const currentGroup: Configurator.Group =
        mockProductConfiguration.groups[0];

      component.switchGroupOnArrowPress(event, 0, group, currentGroup);

      expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
    });
  });

  describe('RTL direction', () => {
    it('should navigate back to parent group', () => {
      spyOn(configuratorGroupsService, 'getMenuParentGroup').and.returnValue(
        of(mockProductConfiguration.groups[0])
      );
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockDirection = DirectionMode.RTL;
      initialize();
      spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(true);
      spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();

      let event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });

      const currentGroup: Configurator.Group =
        mockProductConfiguration.groups[0];

      component.switchGroupOnArrowPress(
        event,
        0,
        mockProductConfiguration.groups[1],
        currentGroup
      );
      expect(configGroupMenuService.isBackBtnFocused).toHaveBeenCalled();
      expect(configuratorGroupsService.getParentGroup).toHaveBeenCalled();
      expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
    });

    it('should navigate to subgroups', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockDirection = DirectionMode.RTL;
      initialize();
      spyOn(configGroupMenuService, 'isBackBtnFocused').and.returnValue(false);

      let event = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });

      const group: Configurator.Group = mockProductConfiguration.groups[2];
      const currentGroup: Configurator.Group =
        mockProductConfiguration.groups[0];

      component.switchGroupOnArrowPress(event, 0, group, currentGroup);

      expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
    });
  });

  describe('setFocusForMainMenu', () => {
    beforeEach(() => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      initialize();
    });

    it('should set focus to a group that does not contain any subgroups`', () => {
      component.setFocusForMainMenu(GROUP_ID_2);
      expect(configUtils.setFocus).toHaveBeenCalled();
      expect(configUtils.setFocus).toHaveBeenCalledWith(GROUP_ID_2);
    });

    it('should set focus to a child group if the parent group contains only one subgroup', () => {
      component.setFocusForMainMenu(GROUP_ID_4);
      expect(configUtils.setFocus).toHaveBeenCalled();
      expect(configUtils.setFocus).toHaveBeenCalledWith(GROUP_ID_4);
    });

    it('should set focus to parent group that contains a current selected group', () => {
      component.setFocusForMainMenu(GROUP_ID_7);
      expect(configUtils.setFocus).toHaveBeenCalled();
      expect(configUtils.setFocus).toHaveBeenCalledWith(GROUP_ID_5);
    });
  });

  describe('setFocusForSubGroup', () => {
    beforeEach(() => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      initialize();
    });

    it('should set focus for back button', () => {
      component.setFocusForSubGroup(
        mockProductConfiguration.groups[0],
        'groupId-111'
      );
      expect(configUtils.setFocus).toHaveBeenCalled();
      expect(configUtils.setFocus).toHaveBeenCalledWith('cx-menu-back');
    });

    it('should set focus for selected subgroup', () => {
      component.setFocusForSubGroup(
        mockProductConfiguration.groups[2],
        GROUP_ID_4
      );
      expect(configUtils.setFocus).toHaveBeenCalled();
      expect(configUtils.setFocus).toHaveBeenCalledWith(GROUP_ID_4);
    });
  });

  describe('containsSelectedGroup', () => {
    it('should return `false` because group does not contain any subgroups', () => {
      expect(
        component.containsSelectedGroup(
          mockProductConfiguration.groups[0],
          GROUP_ID_5
        )
      ).toBe(false);
    });
    it('should return `false` because group does not contain any subgroup with the current group ID', () => {
      expect(
        component.containsSelectedGroup(
          mockProductConfiguration.groups[2],
          GROUP_ID_5
        )
      ).toBe(false);
    });

    it('should return `true` because group contains a subgroup with the current group ID', () => {
      expect(
        component.containsSelectedGroup(
          mockProductConfiguration.groups[2],
          GROUP_ID_4
        )
      ).toBe(true);
    });
  });

  describe('isGroupSelected', () => {
    it('should return `false` because the current group ID is not equal group ID', () => {
      expect(component.isGroupSelected('groupId-100', 'groupId-99')).toBe(
        false
      );
    });

    it('should return `true` because the current group ID is equal group ID', () => {
      expect(component.isGroupSelected('groupId-100', 'groupId-100')).toBe(
        true
      );
    });
  });

  describe('createAriaControls', () => {
    it('should return empty string because groupID is undefined', () => {
      expect(component.createAriaControls(undefined)).toBeUndefined();
    });

    it('should return aria-controls string', () => {
      expect(component.createAriaControls('1234')).toBe('1234-group');
    });
  });

  describe('getAriaLabel', () => {
    it("should return 'configurator.a11y.groupName group:Group Name' if group is an attribute group", () => {
      const group = {
        id: GROUP_ID_1,
        description: 'Group Name',
        groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
        attributes: [],
        subGroups: [],
      };
      expect(component.getAriaLabel(group)).toBe(
        'configurator.a11y.groupName group:Group Name'
      );
    });

    it("should return 'configurator.a11y.conflictsInConfiguration numberOfConflicts:(1)' if group is conflict header", () => {
      isConflictGroupType = true;
      const group = {
        id: GROUP_ID_1,
        description: 'Resolve Conflicts',
        groupType: Configurator.GroupType.CONFLICT_HEADER_GROUP,
        attributes: [],
        subGroups: [{ id: 'subgroup1', subGroups: [] }],
      };
      expect(component.getAriaLabel(group)).toBe(
        'configurator.a11y.conflictsInConfiguration numberOfConflicts:(1)'
      );
    });

    it('should return group description if group is conflict group', () => {
      isConflictGroupType = true;
      const group = {
        id: GROUP_ID_1,
        description: 'Conflict for xyz',
        groupType: Configurator.GroupType.CONFLICT_GROUP,
        attributes: [],
        subGroups: [],
      };
      expect(component.getAriaLabel(group)).toBe('Conflict for xyz');
    });
  });

  describe('getAriaDescribedby', () => {
    it('should return appropriate (ICONSUCCESS) aria-describedby for variant configurator if group is complete and consistent', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[1].complete = true;
      mockProductConfiguration.groups[1].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[1],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(' ICONSUCCESS1234-56-7892 inListOfGroups')
        );
    });

    it('should return appropriate (only inListOfGroups) aria-describedby if group is complete, consistent and type is CPQ', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[1].complete = true;
      mockProductConfiguration.groups[1].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[1],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(' inListOfGroups')
        );
    });

    it('should return appropriate (ICONWARNING) aria-describedby if group is inconsistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = true;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual('ICONWARNING1234-56-7891 inListOfGroups')
        );
    });

    it('should return appropriate (only inListOfGroups) if group is inconsistent and type is CPQ', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = true;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(' inListOfGroups')
        );
    });

    it('should return appropriate (ICONERROR) aria-describedby if group is incomplete, consistent and type is CPQ', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(' ICONERROR1234-56-7891 inListOfGroups')
        );
    });

    it('should return appropriate (ICONERROR) aria-describedby if group is incomplete, consistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = true;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(' ICONERROR1234-56-7891 inListOfGroups')
        );
    });

    it('should return appropriate (ICONWARNING and ICONERROR) aria-describedby if group is incomplete, inconsistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeVariant;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(
            'ICONWARNING1234-56-7891 ICONERROR1234-56-7891 inListOfGroups'
          )
        );
    });

    it('should return appropriate (ICONERROR) aria-describedby if group is incomplete, inconsistent and type is variant', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.owner.configuratorType = typeCPQ;
      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(' ICONERROR1234-56-7891 inListOfGroups')
        );
    });

    it('should return appropriate (ICONCARET_RIGHT) aria-describedby if group has subgroups', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = true;
      mockProductConfiguration.groups[0].consistent = true;
      mockProductConfiguration.groups[0].subGroups = [
        { id: 'subgroup1', subGroups: [] },
      ];

      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(
            ' ICONCARET_RIGHT1234-56-7891 inListOfGroups'
          )
        );
    });

    it('should return appropriate (ICONCARET_RIGHT and ICONERROR) aria-describedby if group has subgroups', () => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = false;
      mockProductConfiguration.groups[0].consistent = false;
      mockProductConfiguration.groups[0].subGroups = [
        { id: 'subgroup1', subGroups: [] },
      ];

      initialize();
      component
        .getAriaDescribedby(
          mockProductConfiguration.groups[0],
          mockProductConfiguration
        )
        .pipe(take(1))
        .subscribe((describedby) =>
          expect(describedby).toEqual(
            ' ICONERROR1234-56-7891 ICONCARET_RIGHT1234-56-7891 inListOfGroups'
          )
        );
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      productConfigurationObservable = of(mockProductConfiguration);
      routerStateObservable = of(mockRouterState);
      mockGroupVisited = true;
      mockProductConfiguration.groups[0].complete = true;
      mockProductConfiguration.groups[0].consistent = true;
      mockProductConfiguration.groups[0].subGroups = [
        {
          id: 'subgroup1',
          description: 'Description for subgroup1',
          subGroups: [],
        },
      ];
      initialize();
    });

    it("should contain action span element with ID 'listOfGroups' and class name 'cx-visually-hidden' that hides element content on the UI", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.listOfGroups'
      );
    });

    it("should contain action span element with ID 'inListOfGroups' and class name 'cx-visually-hidden' that hides element content on the UI", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        1,
        undefined,
        undefined,
        'configurator.a11y.inListOfGroups'
      );
    });

    it("should contain action button element with class name 'cx-menu-item' and 'aria-describedby' attribute that indicates the IDs of the elements that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'cx-menu-item',
        0,
        'aria-describedby',
        ' ICONERRORsubgroup1 inListOfGroups'
      );
    });

    it("should contain action button element with class name 'cx-menu-item' and 'aria-selected' attribute that indicates the current 'selected' state of elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'cx-menu-item',
        0,
        'aria-selected',
        'false'
      );
    });

    it("should contain action button element with class name 'cx-menu-item' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'cx-menu-item',
        0,
        'aria-label',
        'configurator.a11y.groupName group:' +
          mockProductConfiguration.groups[0].subGroups[0].description
      );
    });

    it("should contain action cx-icon element with class name 'WARNING' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-icon',
        'WARNING',
        0,
        'aria-label',
        'configurator.a11y.iconConflict'
      );
    });

    it("should contain action cx-icon element with class name 'ERROR' and 'aria-label' attribute that defines an accessible name to label the current elementt", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-icon',
        'ERROR',
        0,
        'aria-label',
        'configurator.a11y.iconIncomplete'
      );
    });

    it("should contain action cx-icon element with class name 'COMPLETE' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-icon',
        'COMPLETE',
        0,
        'aria-label',
        'configurator.a11y.iconComplete'
      );
    });
  });
});
