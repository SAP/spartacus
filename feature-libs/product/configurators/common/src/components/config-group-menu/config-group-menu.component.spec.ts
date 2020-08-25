import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ConfigUtilsService } from '@spartacus/product/configurators/common';
import { HamburgerMenuService, ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import * as ConfigurationTestData from './../../shared/testing/configuration-test-data';
import { ConfigGroupMenuComponent } from './config-group-menu.component';

const mockRouterState: any = ConfigurationTestData.mockRouterState;
let mockGroupVisited = false;
const mockProductConfiguration: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

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

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockConfigUtilsService {
  scrollToConfigurationElement(): void {}
}

let component: ConfigGroupMenuComponent;
let fixture: ComponentFixture<ConfigGroupMenuComponent>;
let configuratorGroupsService: ConfiguratorGroupsService;
let hamburgerMenuService: HamburgerMenuService;
let htmlElem: HTMLElement;
let configuratorUtils: GenericConfigUtilsService;
let routerStateObservable = null;
let groupVisitedObservable = null;
let productConfigurationObservable = null;

function initialize() {
  routerStateObservable = of(mockRouterState);
  groupVisitedObservable = of(mockGroupVisited);
  productConfigurationObservable = of(mockProductConfiguration);
  fixture = TestBed.createComponent(ConfigGroupMenuComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}

describe('ConfigurationGroupMenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigGroupMenuComponent, MockCxIconComponent],
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
          provide: ConfigUtilsService,
          useClass: MockConfigUtilsService,
        },
      ],
    });
  }));

  beforeEach(() => {
    routerStateObservable = null;
    groupVisitedObservable = null;
    productConfigurationObservable = null;
    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    hamburgerMenuService = TestBed.inject(
      HamburgerMenuService as Type<HamburgerMenuService>
    );
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
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
    initialize();
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    initialize();
    component.configuration$.subscribe((data: Configurator.Configuration) => {
      expect(data.productCode).toEqual(ConfigurationTestData.PRODUCT_CODE);
    });
  });

  it('should render 5 groups directly after init has been performed as groups are compiled without delay', () => {
    initialize();
    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(5);
  });

  it('should return 5 groups after groups have been compiled', () => {
    initialize();
    component.displayedGroups$.pipe(take(1)).subscribe((groups) => {
      expect(groups.length).toBe(5);
    });
  });

  it('should set current group in case of clicking on a group', () => {
    initialize();
    component.click(mockProductConfiguration.groups[1]);
    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();
  });

  it('should condense groups', () => {
    initialize();
    expect(
      component.condenseGroups(mockProductConfiguration.groups)[2].id
    ).toBe(mockProductConfiguration.groups[2].subGroups[0].id);
  });

  it('should get correct parent group for condensed groups', () => {
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
