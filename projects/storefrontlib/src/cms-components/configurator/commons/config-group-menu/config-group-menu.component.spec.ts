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
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import * as ConfigurationTestData from '../configuration-test-data';
import { ConfigGroupMenuComponent } from './config-group-menu.component';

const mockRouterState: any = ConfigurationTestData.mockRouterState;

let groupVisited = false;

const config: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
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
    return of(groupVisited);
  }
  findParentGroup() {
    return null;
  }
  navigateToGroup() {}
  getCurrentGroup(): Observable<Configurator.Group> {
    return of(config.groups[0]);
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
    return of(config);
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('ConfigurationGroupMenuComponent', () => {
  let component: ConfigGroupMenuComponent;
  let fixture: ComponentFixture<ConfigGroupMenuComponent>;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let hamburgerMenuService: HamburgerMenuService;
  let htmlElem: HTMLElement;
  let configuratorUtils: GenericConfigUtilsService;

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
      ],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGroupMenuComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );

    hamburgerMenuService = TestBed.inject(
      HamburgerMenuService as Type<HamburgerMenuService>
    );
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(config.owner);
    spyOn(configuratorGroupsService, 'navigateToGroup').and.stub();
    spyOn(configuratorGroupsService, 'setMenuParentGroup').and.stub();
    spyOn(configuratorGroupsService, 'getGroupStatus').and.callThrough();
    spyOn(configuratorGroupsService, 'getParentGroup').and.callThrough();
    spyOn(configuratorGroupsService, 'isGroupVisited').and.callThrough();
    spyOn(hamburgerMenuService, 'toggle').and.stub();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    component.ngOnInit();
    component.configuration$.subscribe((data: Configurator.Configuration) => {
      expect(data.productCode).toEqual(ConfigurationTestData.PRODUCT_CODE);
    });
  });

  it('should render 0 groups directly after init has been performed as groups are compiled with delay', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(0);
  });

  it('should return 5 groups after groups have been compiled', () => {
    component.ngOnInit();
    component.displayedGroups$.pipe(take(1)).subscribe((groups) => {
      expect(groups.length).toBe(5);
    });
  });

  it('should set current group in case of clicking on a group', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.click(config.groups[1]);
    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();
  });

  it('should condense groups', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.condenseGroups(config.groups)[2].id).toBe(
      config.groups[2].subGroups[0].id
    );
  });

  it('should get correct parent group for condensed groups', () => {
    component.ngOnInit();
    fixture.detectChanges();

    //Condensed case
    component
      .getCondensedParentGroup(config.groups[2])
      .pipe(take(1))
      .subscribe((group) => {
        expect(group).toBe(null);
      });

    //Non condensed case
    component
      .getCondensedParentGroup(config.groups[0])
      .pipe(take(1))
      .subscribe((group) => {
        expect(group).toBe(config.groups[0]);
      });
  });

  it('should call correct methods for groups with and without subgroups', () => {
    component.ngOnInit();
    fixture.detectChanges();

    //Set group
    component.click(config.groups[2].subGroups[0]);
    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();

    //Display subgroups
    component.click(config.groups[2]);
    expect(configuratorGroupsService.setMenuParentGroup).toHaveBeenCalled();
  });

  it('should not call status method if group has not been visited', () => {
    component
      .getGroupStatus(config.groups[0].id, config)
      .pipe(take(1))
      .subscribe();

    expect(configuratorGroupsService.isGroupVisited).toHaveBeenCalled();
    expect(configuratorGroupsService.getGroupStatus).toHaveBeenCalledTimes(0);
  });

  it('should return number of conflicts only for conflict header group', () => {
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
    groupVisited = true;
    component
      .getGroupStatus(config.groups[0].id, config)
      .pipe(take(1))
      .subscribe();

    expect(configuratorGroupsService.isGroupVisited).toHaveBeenCalled();
    expect(configuratorGroupsService.getGroupStatus).toHaveBeenCalled();
  });
});
