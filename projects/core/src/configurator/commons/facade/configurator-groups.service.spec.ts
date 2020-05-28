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
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const GROUP_ID_1 = '1234-56-7891';
const GROUP_ID_2 = '1234-56-7892';
const GROUP_ID_3 = '1234-56-7893';
const GROUP_ID_4 = '1234-56-7894';
const GROUP_ID_5 = '1234-56-7895';
const GROUP_ID_6 = '1234-56-7896';
const GROUP_ID_7 = '1234-56-7897';
const GROUP_ID_8 = '1234-56-7898';
const GROUP_ID_9 = '1234-56-7899';
const GROUP_ID_10 = '1234-56-7900';
const uiState: UiState = {
  currentGroup: GROUP_ID_2,
  menuParentGroup: GROUP_ID_3,
};
const CONFIG_ID = '1234-56-7890';
const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [
    {
      id: GROUP_ID_1,
      attributes: [
        {
          name: 'ATTRIBUTE_1_CHECKBOX',
          uiType: Configurator.UiType.CHECKBOX,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [],
    },

    {
      id: GROUP_ID_2,
      attributes: [
        {
          name: 'ATTRIBUTE_2_RADIOBUTTON',
          uiType: Configurator.UiType.RADIOBUTTON,
          required: false,
          incomplete: false,
        },
      ],
      subGroups: [],
    },
    {
      id: GROUP_ID_3,
      attributes: [
        {
          name: 'ATTRIBUTE_3_SINGLESELECTIONIMAGE',
          uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
          required: true,
          incomplete: true,
        },
      ],
      subGroups: [{ id: GROUP_ID_4, subGroups: [], attributes: [] }],
    },
    {
      id: GROUP_ID_5,
      attributes: [
        {
          name: 'ATTRIBUTE_5_STRING',
          uiType: Configurator.UiType.STRING,
          required: true,
          incomplete: false,
        },
        {
          name: 'ATTRIBUTE_5_DROPDOWN',
          uiType: Configurator.UiType.DROPDOWN,
          required: true,
          incomplete: true,
        },
      ],

      subGroups: [
        { id: GROUP_ID_6, subGroups: [], attributes: [] },
        {
          id: GROUP_ID_7,
          subGroups: [{ id: GROUP_ID_8, subGroups: [], attributes: [] }],
          attributes: [],
        },
      ],
    },

    {
      id: GROUP_ID_9,
      subGroups: [
        {
          id: GROUP_ID_10,
          attributes: [
            {
              name: 'ATTRIBUTE_10_DROPDOWN',
              uiType: Configurator.UiType.DROPDOWN,
              required: true,
              incomplete: false,
            },
          ],
          subGroups: [],
        },
      ],
    },
  ],
  flatGroups: [
    { id: GROUP_ID_1 },
    { id: GROUP_ID_2 },
    { id: GROUP_ID_4 },
    { id: GROUP_ID_6 },
    { id: GROUP_ID_7 },
    { id: GROUP_ID_10 },
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
  let configGroupStatusService: ConfiguratorGroupStatusService;

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
