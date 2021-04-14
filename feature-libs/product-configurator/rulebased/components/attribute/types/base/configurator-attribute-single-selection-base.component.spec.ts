import { ConfiguratorAttributeSingleSelectionBaseComponent } from './configurator-attribute-single-selection-base.component';
import { Configurator } from '../../../../core/model/configurator.model';

const attributeQuantity = 4;
const selectedValue = 'a';

const createImage = (url: string, altText: string): Configurator.Image => {
  const image: Configurator.Image = {
    url: url,
    altText: altText,
  };
  return image;
};

const createValue = (
  description: string,
  images: Configurator.Image[],
  name: string,
  quantity: number,
  selected: boolean,
  valueCode: string,
  valueDisplay: string
): Configurator.Value => {
  const value: Configurator.Value = {
    description,
    images,
    name,
    quantity,
    selected,
    valueCode,
    valueDisplay,
  };
  return value;
};

describe('ConfiguratorAttributeSingleSelectionBaseComponent', () => {
  let classUnderTest: ConfiguratorAttributeSingleSelectionBaseComponent;
  let values: Configurator.Value[];

  beforeEach(() => {
    classUnderTest = new ConfiguratorAttributeSingleSelectionBaseComponent();

    values = [
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '1111',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '2222',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '3333',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '4444',
        'Lorem Ipsum Dolor'
      ),
    ];

    classUnderTest.attribute = {
      name: 'attributeName',
      attrCode: 1111,
      uiType: Configurator.UiType.RADIOBUTTON_PRODUCT,
      required: true,
      groupId: 'testGroup',
      values,
      dataType: Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL,
    };
  });

  describe('onSelect', () => {
    it('should call emit of event onSelect', () => {
      spyOn(classUnderTest.selectionChange, 'emit').and.callThrough();

      classUnderTest.onSelect('1111');

      expect(classUnderTest.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            ...classUnderTest.attribute,
            selectedSingleValue: '1111',
          }),
          ownerKey: classUnderTest.ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE,
        })
      );
    });
  });

  describe('onDeselect', () => {
    it('should call emit of event onDeselect', () => {
      spyOn(classUnderTest.selectionChange, 'emit').and.callThrough();

      classUnderTest.onDeselect();

      expect(classUnderTest.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            ...classUnderTest.attribute,
            selectedSingleValue: '',
          }),
          ownerKey: classUnderTest.ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE,
        })
      );
    });
  });

  describe('onHandleQuantity', () => {
    it('should call emit of event onHandleQuantity', () => {
      spyOn(classUnderTest.selectionChange, 'emit').and.callThrough();

      classUnderTest.onHandleQuantity(2);

      expect(classUnderTest.selectionChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          changedAttribute: jasmine.objectContaining({
            ...classUnderTest.attribute,
            quantity: 2,
          }),
          ownerKey: classUnderTest.ownerKey,
          updateType: Configurator.UpdateType.ATTRIBUTE_QUANTITY,
        })
      );
    });
  });

  describe('onChangeQuantity', () => {
    it('should call onDeselect of event onChangeQuantity', () => {
      spyOn(classUnderTest, 'onDeselect');
      classUnderTest.onChangeQuantity(0);
      expect(classUnderTest.onDeselect).toHaveBeenCalled();
    });
  });

  describe('extractQuantityParameters', () => {
    it('should return 0 as initial if no selected value is specified  ', () => {
      const quantityParameters = classUnderTest.extractQuantityParameters();
      expect(quantityParameters.initialQuantity).toBe(0);
    });

    it('should return 0 as initial if a selected value but no attribute quantity is specified', () => {
      classUnderTest.attribute.selectedSingleValue = selectedValue;
      const quantityParameters = classUnderTest.extractQuantityParameters();
      expect(quantityParameters.initialQuantity).toBe(0);
    });

    it('should return attribute quantity as initial if a selected value is specified', () => {
      classUnderTest.attribute.selectedSingleValue = selectedValue;
      classUnderTest.attribute.quantity = attributeQuantity;
      const quantityParameters = classUnderTest.extractQuantityParameters();
      expect(quantityParameters.initialQuantity).toBe(attributeQuantity);
    });
  });
});
