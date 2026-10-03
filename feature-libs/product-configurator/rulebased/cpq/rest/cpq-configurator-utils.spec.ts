import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import {
  attributeCheckBoxes,
  attrCode,
  groupId,
  attributeRadioButtons,
  productConfiguration,
} from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CpqConfiguratorUtils } from './cpq-configurator-utils';

describe('CpqConfiguratorUtils', () => {
  let classUnderTest: CpqConfiguratorUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    classUnderTest = new CpqConfiguratorUtils();
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('findFirstChangedAttribute', () => {
    it('should find first attribute correctly', () => {
      const attribute: Configurator.Attribute =
        CpqConfiguratorUtils.findFirstChangedAttribute(productConfiguration);
      expect(attribute).toBe(attributeCheckBoxes);
    });

    it('should throw an error in case no attribute is available', () => {
      const emptyConfiguration = ConfiguratorTestUtils.createConfiguration('1');
      expect(() =>
        CpqConfiguratorUtils.findFirstChangedAttribute(emptyConfiguration)
      ).toThrow();
    });

    it('should find the changed attribute on a nested container-row extract', () => {
      const nestedGroupId = `${Configurator.ContainerRowGroupIdPrefix}@1067@c7764679-8b9c@57`;
      const nestedAttribute: Configurator.Attribute = {
        ...attributeCheckBoxes,
        groupId: nestedGroupId,
        containerRowId: 'c7764679-8b9c',
      };
      const nestedExtract: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration('1'),
        groups: [
          {
            ...ConfiguratorTestUtils.createGroup('1'),
            subGroups: [
              {
                ...ConfiguratorTestUtils.createGroup(
                  `${Configurator.ContainerRowGroupIdPrefix}@1067@c7764679-8b9c`
                ),
                groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
                subGroups: [
                  {
                    ...ConfiguratorTestUtils.createGroup(nestedGroupId),
                    attributes: [nestedAttribute],
                  },
                ],
              },
            ],
          },
        ],
      };

      expect(
        CpqConfiguratorUtils.findFirstChangedAttribute(nestedExtract)
      ).toBe(nestedAttribute);
    });
  });

  describe('getUpdateInformation', () => {
    it('should get attribute fields we need to do the CPQ update', () => {
      const updateInformation =
        CpqConfiguratorUtils.getUpdateInformation(attributeCheckBoxes);

      expect(updateInformation.standardAttributeCode).toBe(attrCode.toString());
      expect(updateInformation.tabId).toBe(groupId);
    });

    it('should throw an error if the necessary fields are not available on attribute level', () => {
      expect(() =>
        CpqConfiguratorUtils.getUpdateInformation(attributeRadioButtons)
      ).toThrow();
    });

    it('should extract tabId and rowId from a nested container-row attribute', () => {
      const nestedGroupId = `${Configurator.ContainerRowGroupIdPrefix}@1067@c7764679-8b9c@57`;
      const nestedAttribute: Configurator.Attribute = {
        ...attributeCheckBoxes,
        groupId: nestedGroupId,
        containerRowId: 'c7764679-8b9c',
      };

      const updateInformation =
        CpqConfiguratorUtils.getUpdateInformation(nestedAttribute);

      expect(updateInformation.standardAttributeCode).toBe(attrCode.toString());
      expect(updateInformation.tabId).toBe('57');
      expect(updateInformation.rowId).toBe('c7764679-8b9c');
    });

    it('should omit rowId when containerRowId is not set', () => {
      const updateInformation =
        CpqConfiguratorUtils.getUpdateInformation(attributeCheckBoxes);

      expect(updateInformation.rowId).toBeUndefined();
    });
  });

  describe('getTabId', () => {
    it('should return the group ID unchanged for a tab of the root configuration', () => {
      expect(CpqConfiguratorUtils.getTabId('57')).toBe('57');
    });

    it('should return the trailing CPQ tab ID for a tab of a nested configuration', () => {
      const nestedTabGroupId = `${Configurator.ContainerRowGroupIdPrefix}@1067@c7764679-8b9c@57`;
      expect(CpqConfiguratorUtils.getTabId(nestedTabGroupId)).toBe('57');
    });

    it('should not touch group IDs that only happen to contain a separator', () => {
      expect(CpqConfiguratorUtils.getTabId('SOME_GROUP@57')).toBe(
        'SOME_GROUP@57'
      );
    });
  });
});
