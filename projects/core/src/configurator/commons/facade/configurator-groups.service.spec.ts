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
    spyOn(configGroupStatusService, 'setGroupStatus').and.callThrough();
  });

  it('should create service', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    expect(serviceUnderTest).toBeDefined();
  });

  describe('getCurrentGroupId', () => {
    it('should return a current group ID from uiState', () => {
      spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
        of(uiState)
      );
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
      const currentGroup = serviceUnderTest.getCurrentGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toBe(GROUP_ID_2);
      });
    });

    it('should return a current group ID from configuration', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
      spyOn(configuratorCommonsService, 'getUiState').and.returnValue(of(null));
      const currentGroup = serviceUnderTest.getCurrentGroupId(
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

  describe('getNextGroupId', () => {
    it('should return a next group', () => {
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
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
  });

  describe('getPreviousGroupId', () => {
    it('should return null', () => {
      spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
        of(undefined)
      );
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(undefined)
      );
      const currentGroup = serviceUnderTest.getPreviousGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toEqual(null);
      });
    });

    it('should return a previous group ID', () => {
      spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
        of(uiState)
      );
      spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
        of(productConfiguration)
      );
      const currentGroup = serviceUnderTest.getPreviousGroupId(
        productConfiguration.owner
      );

      expect(currentGroup).toBeDefined();
      currentGroup.subscribe((groupId) => {
        expect(groupId).toBe(GROUP_ID_1);
      });
    });
  });

  it('should delegate setting the current group to the store', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    serviceUnderTest.setCurrentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new UiActions.SetCurrentGroup(
      productConfiguration.owner.key,
      GROUP_ID_1
    );
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should delegate setting the parent group to the store', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    serviceUnderTest.setMenuParentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new UiActions.SetMenuParentGroup(
      productConfiguration.owner.key,
      GROUP_ID_1
    );
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should call group status in navigate to different group', () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    serviceUnderTest.navigateToGroup(
      productConfiguration,
      productConfiguration.groups[2].id
    );

    expect(configGroupStatusService.setGroupStatus).toHaveBeenCalled();
  });
});
