import { async, TestBed } from '@angular/core/testing';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { Configurator } from './../../../model/configurator.model';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { of } from 'rxjs';
import { StateWithConfiguration, UiState } from '../store/configuration-state';
import { Store, StoreModule } from '@ngrx/store';
import { Type } from '@angular/core';
import * as UiActions from '../store/actions/configurator-ui.action';

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

describe('ConfiguratorGroupStatusService', () => {
  let classUnderTest: ConfiguratorGroupStatusService;
  let store: Store<StateWithConfiguration>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    }).compileComponents();
  }));
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorGroupStatusService as Type<ConfiguratorGroupStatusService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(uiState));
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('Group Status Tests', () => {
    it('should call setGroupVisisted action on setGroupStatus method call', () => {
      classUnderTest.setGroupStatus(
        productConfiguration,
        productConfiguration.groups[0].id,
        true
      );

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_1]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get parent group, when all subgroups are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));
      classUnderTest.setGroupStatus(productConfiguration, GROUP_ID_4, true);

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_4, GROUP_ID_3]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should not get parent group, when not all subgroups are visited', () => {
      //Not all subgroups are visited
      spyOn(store, 'select').and.returnValue(of(false));

      classUnderTest.setGroupStatus(productConfiguration, GROUP_ID_6, true);

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_6]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get all parent groups, when lowest subgroup are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));

      classUnderTest.setGroupStatus(productConfiguration, GROUP_ID_8, true);

      const expectedAction = new UiActions.SetGroupsVisited(
        productConfiguration.owner.key,
        [GROUP_ID_8, GROUP_ID_7, GROUP_ID_5]
      );

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should return status completed if required fields are filled', () => {
      // required checkbox not filled
      expect(
        classUnderTest.checkIsGroupComplete(productConfiguration.groups[0])
      ).toBe(false);
      //no required attributes in group
      expect(
        classUnderTest.checkIsGroupComplete(productConfiguration.groups[1])
      ).toBe(true);
      // two required attributes, only one is filled
      expect(
        classUnderTest.checkIsGroupComplete(productConfiguration.groups[3])
      ).toBe(false);
      //required single selection image not filled
      expect(
        classUnderTest.checkIsGroupComplete(productConfiguration.groups[2])
      ).toBe(false);
    });

    it('should return status completed if required fields are filled', () => {
      // required checkbox not filled
      expect(
        classUnderTest.checkIsGroupComplete(productConfiguration.groups[0])
      ).toBe(false);
    });
  });
});
