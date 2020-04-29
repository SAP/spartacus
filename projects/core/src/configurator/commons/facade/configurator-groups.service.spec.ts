import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import * as UiActions from '../store/actions/configurator-ui.action';
import { StateWithConfiguration, UiState } from '../store/configuration-state';
import { Configurator } from './../../../model/configurator.model';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const GROUP_ID_1 = '1234-56-7891';
const GROUP_ID_2 = '1234-56-7892';
const GROUP_ID_3 = '1234-56-7893';
const GROUP_ID_4 = '1234-56-7894';
const GROUP_ID_5 = '1234-56-7895';
const GROUP_ID_6 = '1234-56-7896';
const GROUP_ID_7 = '1234-56-7897';
const GROUP_ID_8 = '1234-56-7898';
const uiState: UiState = {
  currentGroup: GROUP_ID_2,
  menuParentGroup: GROUP_ID_3,
};
const CONFIG_ID = '1234-56-7890';
const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [
    { id: GROUP_ID_1, subGroups: [] },
    { id: GROUP_ID_2, subGroups: [] },
    { id: GROUP_ID_3, subGroups: [{ id: GROUP_ID_4, subGroups: [] }] },
    {
      id: GROUP_ID_5,
      subGroups: [
        { id: GROUP_ID_6, subGroups: [] },
        { id: GROUP_ID_7, subGroups: [{ id: GROUP_ID_8, subGroups: [] }] },
      ],
    },
  ],
  flatGroups: [
    { id: GROUP_ID_1 },
    { id: GROUP_ID_2 },
    { id: GROUP_ID_4 },
    { id: GROUP_ID_6 },
    { id: GROUP_ID_7 },
  ],
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
};

class MockActiveCartService {}

describe('ConfiguratorGroupsService', () => {
  let serviceUnderTest: ConfiguratorGroupsService;
  let store: Store<StateWithConfiguration>;
  let configuratorCommonsService: ConfiguratorCommonsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorGroupsService,
        ConfiguratorCommonsService,
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

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(uiState));

    spyOn(configuratorCommonsService, 'setUiState').and.stub();
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
    spyOn(serviceUnderTest, 'setGroupStatus').and.callThrough();
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

  it('should find group from group Id', () => {
    const group = serviceUnderTest.findCurrentGroup(
      productConfiguration.groups,
      GROUP_ID_2
    );

    expect(group).toBe(productConfiguration.groups[1]);
  });

  it('should find parent group from group', () => {
    const parentGroup = serviceUnderTest.findParentGroup(
      productConfiguration.groups,
      productConfiguration.groups[2].subGroups[0],
      null
    );

    expect(parentGroup).toBe(productConfiguration.groups[2]);
  });

  it('should check if subgroups exist', () => {
    expect(serviceUnderTest.hasSubGroups(productConfiguration.groups[0])).toBe(
      false
    );
    expect(serviceUnderTest.hasSubGroups(productConfiguration.groups[2])).toBe(
      true
    );
  });

  describe('Group Status Tests', () => {
    it('should call group status in navigate to different group', () => {
      serviceUnderTest.navigateToGroup(
        productConfiguration,
        productConfiguration.groups[2].id
      );

      expect(serviceUnderTest.setGroupStatus).toHaveBeenCalled();
    });

    it('should call setGroupVisisted action on setGroupStatus method call', () => {
      serviceUnderTest.setGroupStatus(
        productConfiguration,
        productConfiguration.groups[0].id
      );

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_1]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get parent group, when all subgroups are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));
      serviceUnderTest.setGroupStatus(productConfiguration, GROUP_ID_4);

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_4, GROUP_ID_3]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should not get parent group, when not all subgroups are visited', () => {
      //Not all subgroups are visited
      spyOn(store, 'select').and.returnValue(of(false));

      serviceUnderTest.setGroupStatus(productConfiguration, GROUP_ID_6);

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_6]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get all parent group, when lowest subgroup are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));

      serviceUnderTest.setGroupStatus(productConfiguration, GROUP_ID_8);

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_8, GROUP_ID_7, GROUP_ID_5]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
