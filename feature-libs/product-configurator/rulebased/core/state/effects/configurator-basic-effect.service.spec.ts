import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import {
  ATTRIBUTE_1_CHECKBOX,
  CONFIG_ID,
  GROUP_ID_1,
  GROUP_ID_2,
  GROUP_ID_3,
  GROUP_ID_4,
  GROUP_ID_5,
  GROUP_ID_6,
  GROUP_ID_7,
  GROUP_ID_8,
  GROUP_ID_9,
  PRODUCT_CODE,
} from '../../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorBasicEffectService } from './configurator-basic-effect.service';

const group: Configurator.Group = {
  id: GROUP_ID_8,
  attributes: [{ name: ATTRIBUTE_1_CHECKBOX }],
  subGroups: [],
};

const groupWithSubGroup: Configurator.Group = {
  id: GROUP_ID_9,
  attributes: [
    {
      name: ATTRIBUTE_1_CHECKBOX,
      values: [{ name: 'val', valueCode: '1' }],
    },
  ],
  subGroups: [group],
};
const productConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    CONFIG_ID,
    ConfiguratorModelUtils.createInitialOwner()
  ),
  productCode: PRODUCT_CODE,
  groups: [group, groupWithSubGroup],
  flatGroups: [group],
  priceSummary: {},
  priceSupplements: [],
};
describe('ConfiguratorBasicEffectService', () => {
  let classUnderTest: ConfiguratorBasicEffectService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [ConfiguratorBasicEffectService],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorBasicEffectService as Type<ConfiguratorBasicEffectService>
    );
  });

  describe('getFirstGroupWithAttributes', () => {
    it('should find group in single level config', () => {
      expect(
        classUnderTest.getFirstGroupWithAttributes(productConfiguration)
      ).toBe(GROUP_ID_9);
    });
    it('should throw error in case configuration has no attribute at all', () => {
      expect(function () {
        classUnderTest.getFirstGroupWithAttributes(
          ConfiguratorTestUtils.createConfiguration(
            'a',
            ConfiguratorModelUtils.createInitialOwner()
          )
        );
      }).toThrow();
    });
  });

  describe('getFirstGroupWithAttributesForList', () => {
    it('should find group in multi level config', () => {
      const groups: Configurator.Group[] = [
        {
          id: GROUP_ID_1,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_2,
              attributes: [],
              subGroups: [],
            },
            {
              id: GROUP_ID_3,
              attributes: [],
              subGroups: [],
            },
          ],
        },
        {
          id: GROUP_ID_4,
          attributes: [],
          subGroups: productConfiguration.groups,
        },
        {
          id: GROUP_ID_5,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_6,
              attributes: [],
              subGroups: [],
            },
          ],
        },
      ];
      expect(classUnderTest['getFirstGroupWithAttributesForList'](groups)).toBe(
        GROUP_ID_9
      );
    });

    it('should find no group in multi level config in case no attributes exist at all', () => {
      const groups: Configurator.Group[] = [
        {
          id: GROUP_ID_1,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_2,
              attributes: [],
              subGroups: [],
            },
            {
              id: GROUP_ID_3,
              attributes: [],
              subGroups: [],
            },
          ],
        },
        {
          id: GROUP_ID_5,
          attributes: [],
          subGroups: [{ id: GROUP_ID_4, attributes: [], subGroups: [] }],
        },
        {
          id: GROUP_ID_6,
          attributes: [],
          subGroups: [
            {
              id: GROUP_ID_7,
              attributes: [],
              subGroups: [],
            },
          ],
        },
      ];
      expect(
        classUnderTest['getFirstGroupWithAttributesForList'](groups)
      ).toBeUndefined();
    });
  });
});
