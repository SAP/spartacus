import { Component, Directive, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  GenericConfiguratorUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ConfiguratorStorefrontUtilsService } from '@spartacus/product/configurators/common';
import { HamburgerMenuService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import {
  mockRouterState,
  productConfiguration,
  PRODUCT_CODE,
} from '../../shared/testing/configurator-test-data';
import { Configurator } from './../../core/model/configurator.model';
import { ConfiguratorGroupMenuComponent } from './configurator-group-menu.component';

let mockGroupVisited = false;
const mockProductConfiguration: Configurator.Configuration = productConfiguration;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockRouter {
  public events = of('');
}

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
let configuratorUtils: GenericConfiguratorUtilsService;
let routerStateObservable;
let groupVisitedObservable;
let productConfigurationObservable;

function initialize() {
  routerStateObservable = of(mockRouterState);
  groupVisitedObservable = of(mockGroupVisited);
  fixture = TestBed.createComponent(ConfiguratorGroupMenuComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}

describe('ConfigurationGroupMenuComponent', () => {
  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    routerStateObservable = null;
    groupVisitedObservable = null;

    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    hamburgerMenuService = TestBed.inject(
      HamburgerMenuService as Type<HamburgerMenuService>
    );
    configuratorUtils = TestBed.inject(
      GenericConfiguratorUtilsService as Type<GenericConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(mockProductConfiguration.owner);
    spyOn(configuratorGroupsService, 'navigateToGroup').and.stub();
    spyOn(configuratorGroupsService, 'setMenuParentGroup').and.stub();
    spyOn(configuratorGroupsService, 'getGroupStatus').and.callThrough();
    spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();
    spyOn(configuratorGroupsService, 'isGroupVisited').and.callThrough();
    spyOn(hamburgerMenuService, 'toggle').and.stub();
  });

  it('should create component', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();
    component.configuration$.subscribe((data: Configurator.Configuration) => {
      expect(data.productCode).toEqual(PRODUCT_CODE);
    });
  });

  it('should render 5 groups directly after init has been performed as groups are compiled without delay', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(5);
  });

  it('should render no groups if configuration is not consistent and issue navigation has not been done', () => {
    const incompleteConfig: Configurator.Configuration = {
      configId: mockProductConfiguration.configId,
      groups: mockProductConfiguration.groups,
      flatGroups: mockProductConfiguration.flatGroups,
      consistent: false,
      complete: true,
      interactionState: {
        issueNavigationDone: false,
      },
    };
    productConfigurationObservable = of(incompleteConfig);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(0);
  });

  it('should render no groups if configuration is not consistent and issue navigation has not been done', () => {
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
    productConfigurationObservable = of(incompleteConfig);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(0);
  });

  it('should render groups if configuration is not consistent but issues have been checked', () => {
    const incompleteConfig: Configurator.Configuration = {
      configId: mockProductConfiguration.configId,
      groups: mockProductConfiguration.groups,
      flatGroups: mockProductConfiguration.flatGroups,
      consistent: true,
      complete: false,
      interactionState: {
        issueNavigationDone: true,
      },
    };
    productConfigurationObservable = of(incompleteConfig);
    initialize();
    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(5);
  });

  it('should return 5 groups after groups have been compiled', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();
    component.displayedGroups$.pipe(take(1)).subscribe((groups) => {
      expect(groups.length).toBe(5);
    });
  });

  it('should set current group in case of clicking on a group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();

    component.click(mockProductConfiguration.groups[1]);

    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();
  });

  it('should condense groups', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();
    expect(
      component.condenseGroups(mockProductConfiguration.groups)[2].id
    ).toBe(mockProductConfiguration.groups[2].subGroups[0].id);
  });

  it('should get correct parent group for condensed groups', () => {
    productConfigurationObservable = of(mockProductConfiguration);
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
    initialize();
    //Set group
    component.click(mockProductConfiguration.groups[2].subGroups[0]);
    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();

    //Display subgroups
    component.click(mockProductConfiguration.groups[2]);
    expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
  });

  it('should not call status method if group has not been visited', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    mockGroupVisited = false;
    initialize();
    component
      .getGroupStatus(
        mockProductConfiguration.groups[0],
        mockProductConfiguration
      )
      .pipe(take(1))
      .subscribe();

    expect(configuratorGroupsService.isGroupVisited).toHaveBeenCalled();
    expect(configuratorGroupsService.getGroupStatus).toHaveBeenCalledTimes(0);
  });

  it('should return number of conflicts only for conflict header group', () => {
    productConfigurationObservable = of(mockProductConfiguration);
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

  it('should return true if groupType is a conflict group type otherwise false', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    initialize();
    expect(
      component.isConflictGroupType(
        Configurator.GroupType.CONFLICT_HEADER_GROUP
      )
    ).toBe(true);
    expect(
      component.isConflictGroupType(Configurator.GroupType.CONFLICT_GROUP)
    ).toBe(true);
    expect(
      component.isConflictGroupType(Configurator.GroupType.ATTRIBUTE_GROUP)
    ).toBe(false);
  });

  it('should call status method if group has been visited', () => {
    productConfigurationObservable = of(mockProductConfiguration);
    mockGroupVisited = true;
    initialize();
    component
      .getGroupStatus(
        mockProductConfiguration.groups[0],
        mockProductConfiguration
      )
      .pipe(take(1))
      .subscribe();

    expect(configuratorGroupsService.isGroupVisited).toHaveBeenCalled();
    expect(configuratorGroupsService.getGroupStatus).toHaveBeenCalled();
  });
});
