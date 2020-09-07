import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ActiveCartService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { StateWithConfigurator } from '../state/configurator-state';
import {
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_4,
  productConfiguration,
  productConfigurationWithConflicts,
} from './../../shared/testing/configuration-test-data';
import { ConfiguratorActions } from './../state/actions/index';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

class MockActiveCartService {}
class MockConfiguratorCartService {
  checkForActiveCartUpdateDone(): Observable<boolean> {
    return of(true);
  }
}

describe('ConfiguratorGroupsService', () => {
  let classUnderTest: ConfiguratorGroupsService;
  let store: Store<StateWithConfigurator>;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configGroupStatusService: ConfiguratorGroupStatusService;
  let configFacadeUtilsService: ConfiguratorUtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorGroupsService,
        ConfiguratorCommonsService,
        ConfiguratorGroupStatusService,
        ConfiguratorUtilsService,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: ConfiguratorCartService,
          useClass: MockConfiguratorCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configGroupStatusService = TestBed.inject(
      ConfiguratorGroupStatusService as Type<ConfiguratorGroupStatusService>
    );
    configFacadeUtilsService = TestBed.inject(
      ConfiguratorUtilsService as Type<ConfiguratorUtilsService>
    );

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(productConfiguration));

    spyOn(configGroupStatusService, 'setGroupStatus').and.callThrough();
    spyOn(configGroupStatusService, 'getGroupStatus').and.callThrough();
    spyOn(configGroupStatusService, 'isGroupVisited').and.callThrough();
    spyOn(configFacadeUtilsService, 'getParentGroup').and.callThrough();
    spyOn(configFacadeUtilsService, 'hasSubGroups').and.callThrough();
    spyOn(configFacadeUtilsService, 'getGroupById').and.callThrough();
  });

  it('should create service', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    expect(classUnderTest).toBeDefined();
  });

  describe('getCurrentGroupId', () => {
    it('should return a current group ID from state', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
      const currentGroup = classUnderTest.getCurrentGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toBe(GROUP_ID_2);
      });
    });

    it('should return a current group ID from configuration', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of({
          ...productConfiguration,
          interactionState: { currentGroup: null },
        })
      );
      const currentGroup = classUnderTest.getCurrentGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toBe(GROUP_ID_1);
      });
    });
  });

  it('should get the parentGroup from uiState', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    const parentGroup = classUnderTest.getMenuParentGroup(
      productConfiguration.owner
    );

    expect(parentGroup).toBeDefined();
    parentGroup.subscribe((group) => {
      expect(group).toBe(productConfiguration.groups[2]);
    });
  });

  describe('getNextGroupId', () => {
    it('should return a next group', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
      const currentGroup = classUnderTest.getNextGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toBe(GROUP_ID_4);
      });
    });
  });

  describe('getPreviousGroupId', () => {
    it('should return null', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(undefined)
      );
      const currentGroup = classUnderTest.getPreviousGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toEqual(null);
      });
    });

    it('should return a previous group ID', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
      const currentGroup = classUnderTest.getPreviousGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toBe(GROUP_ID_1);
      });
    });
  });

  it('should delegate setting the parent group to the store', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    classUnderTest.setMenuParentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new ConfiguratorActions.SetMenuParentGroup({
      entityKey: productConfiguration.owner.key,
      menuParentGroup: GROUP_ID_1,
    });
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should read configuration and call set group status on set group status method call', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );

    classUnderTest.setGroupStatus(
      productConfiguration.owner,
      productConfiguration.groups[2].id,
      false
    );

    expect(configuratorCommonsService.getConfiguration).toHaveBeenCalled();
    expect(configGroupStatusService.setGroupStatus).toHaveBeenCalled();
  });

  it('should call group status in navigate to different group', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    classUnderTest.navigateToGroup(
      productConfiguration,
      productConfiguration.groups[2].id
    );

    expect(configGroupStatusService.setGroupStatus).toHaveBeenCalled();
  });

  it('should check whether isGroupVisited has been called by the configuration group utils service', () => {
    classUnderTest.isGroupVisited(productConfiguration.owner, GROUP_ID_4);
    expect(configGroupStatusService.isGroupVisited).toHaveBeenCalledWith(
      productConfiguration.owner,
      GROUP_ID_4
    );
    expect(configGroupStatusService.isGroupVisited).toHaveBeenCalled();
  });

  it('should check whether getGroupStatus has been called by the configuration group utils service', () => {
    classUnderTest.getGroupStatus(productConfiguration.owner, GROUP_ID_4);
    expect(configGroupStatusService.getGroupStatus).toHaveBeenCalledWith(
      productConfiguration.owner,
      GROUP_ID_4
    );
    expect(configGroupStatusService.getGroupStatus).toHaveBeenCalled();
  });

  it('should get first conflict group from configuration, no conflicts', () => {
    expect(classUnderTest.getFirstConflictGroup(productConfiguration)).toBe(
      undefined
    );
  });

  it('should get first conflict group from configuration', () => {
    expect(
      classUnderTest.getFirstConflictGroup(productConfigurationWithConflicts)
    ).toBe(productConfigurationWithConflicts.flatGroups[0]);
  });

  it('should go to conflict solver', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfigurationWithConflicts)
    );
    classUnderTest.navigateToConflictSolver(
      productConfigurationWithConflicts.owner
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.ChangeGroup({
        configuration: productConfigurationWithConflicts,
        groupId: productConfigurationWithConflicts.flatGroups[0].id,
        parentGroupId: productConfigurationWithConflicts.groups[0].id,
      })
    );
  });

  it('should go to first incomplete group', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    classUnderTest.navigateToFirstIncompleteGroup(productConfiguration.owner);

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.ChangeGroup({
        configuration: productConfiguration,
        groupId: productConfiguration.flatGroups[0].id,
        parentGroupId: null,
      })
    );
  });

  it('should delegate calls for parent group to the facade utils service', () => {
    classUnderTest.getParentGroup(
      productConfiguration.groups,
      productConfiguration.groups[2].subGroups[0]
    );
    expect(configFacadeUtilsService.getParentGroup).toHaveBeenCalledWith(
      productConfiguration.groups,
      productConfiguration.groups[2].subGroups[0]
    );
  });

  it('should delegate calls for sub groups to the facade utils service', () => {
    classUnderTest.hasSubGroups(productConfiguration.groups[2]);
    expect(configFacadeUtilsService.hasSubGroups).toHaveBeenCalledWith(
      productConfiguration.groups[2]
    );
    expect(configFacadeUtilsService.hasSubGroups).toHaveBeenCalled();
  });
});
