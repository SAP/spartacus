import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import * as UiActions from '../store/actions/configurator-ui.action';
import { StateWithConfiguration } from '../store/configuration-state';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupUtilsService } from '@spartacus/core';
import {
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_4,
  productConfiguration,
  uiState,
} from './configuration-test-data';

class MockActiveCartService {}

describe('ConfiguratorGroupsService', () => {
  let serviceUnderTest: ConfiguratorGroupsService;
  let store: Store<StateWithConfiguration>;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configGroupStatusService: ConfiguratorGroupStatusService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorGroupsService,
        ConfiguratorCommonsService,
        ConfiguratorGroupStatusService,
        ConfiguratorGroupUtilsService,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configGroupStatusService = TestBed.inject(
      ConfiguratorGroupStatusService as Type<ConfiguratorGroupStatusService>
    );

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(uiState));

    spyOn(configuratorCommonsService, 'setUiState').and.stub();
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    spyOn(configGroupStatusService, 'setGroupStatus').and.callThrough();
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should get the currentGroup from uiState', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const currentGroup = serviceUnderTest.getCurrentGroupId(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe((groupId) => {
      expect(groupId).toBe(GROUP_ID_2);
    });
  });

  it('should get the parentGroup from uiState', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const parentGroup = serviceUnderTest.getMenuParentGroup(
      productConfiguration.owner
    );

    expect(parentGroup).toBeDefined();
    parentGroup.subscribe((group) => {
      expect(group).toBe(productConfiguration.groups[2]);
    });
  });

  it('should get the currentGroup from configuration', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(of(null));
    const currentGroup = serviceUnderTest.getCurrentGroupId(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe((groupId) => {
      expect(groupId).toBe(GROUP_ID_1);
    });
  });

  it('should get the next group', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const currentGroup = serviceUnderTest.getNextGroupId(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe((groupId) => {
      expect(groupId).toBe(GROUP_ID_4);
    });
  });

  it('should get the previous group', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const currentGroup = serviceUnderTest.getPreviousGroupId(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe((groupId) => {
      expect(groupId).toBe(GROUP_ID_1);
    });
  });

  it('should delegate setting the current group to the store', () => {
    serviceUnderTest.setCurrentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new UiActions.SetCurrentGroup(
      productConfiguration.owner.key,
      GROUP_ID_1
    );
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should delegate setting the parent group to the store', () => {
    serviceUnderTest.setMenuParentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new UiActions.SetMenuParentGroup(
      productConfiguration.owner.key,
      GROUP_ID_1
    );
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call group status in navigate to different group', () => {
    serviceUnderTest.navigateToGroup(
      productConfiguration,
      productConfiguration.groups[2].id
    );

    expect(configGroupStatusService.setGroupStatus).toHaveBeenCalled();
  });
});
