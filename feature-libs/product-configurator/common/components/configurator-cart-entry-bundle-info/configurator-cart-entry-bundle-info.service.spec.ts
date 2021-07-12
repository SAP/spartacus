import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfiguratorCartEntryBundleInfoService } from './configurator-cart-entry-bundle-info.service';
import { LineItem } from './configurator-cart-entry-bundle-info.model';
import { ConfigurationInfo } from '../../core/model/common-configurator.model';
import { OrderEntry } from '@spartacus/core';

const confInfo1: ConfigurationInfo = {
  configurationLabel: 'name:',
  configurationValue: 'quantity x price',
};

const confInfo2: ConfigurationInfo = {
  configurationValue: 'quantity x price',
};

const confInfo3: ConfigurationInfo = {
  configurationLabel: 'name:',
  configurationValue: 'quantity',
};

const confInfo4: ConfigurationInfo = {
  configurationLabel: 'name:',
};

const confInfoNotLineItem: ConfigurationInfo = {
  status: 'status',
};

const expectedLineItem1: LineItem = {
  name: 'name',
  formattedQuantity: 'quantity',
  formattedPrice: 'price',
};

const expectedLineItem2: LineItem = {
  name: '',
  formattedQuantity: 'quantity',
  formattedPrice: 'price',
};

const expectedLineItem3: LineItem = {
  name: 'name',
  formattedQuantity: 'quantity',
  formattedPrice: '',
};

const expectedLineItem4: LineItem = {
  name: 'name',
  formattedQuantity: '',
  formattedPrice: '',
};

const orderEntry: OrderEntry = {
  configurationInfos: [
    confInfo1,
    confInfo2,
    confInfo3,
    confInfo4,
    confInfoNotLineItem,
  ],
};

const productName0 = 'PRODUCT_NAME_0';
const productQty0: string = '1';
const productFormattedPrice0: string = '$100.00';
const productKey0: string = 'PRODUCT_KEY_0';
const productPriceValue0: string = '100.00';
const productName1: string = 'PRODUCT_NAME_1';
const productQty1: string = '1';
const productFormattedPrice1: string = '$100.00';
const productKey1: string = 'PRODUCT_KEY_1';
const productPriceValue1: string = '100.00';
const v2_confInfo_version: ConfigurationInfo = {
  configurationLabel: 'CONFIGURATION_INFO_##_VERSION',
  configurationValue: '2',
};

const v2_confInfo0_name_novalue: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_0_##_NAME',
  configurationValue: '',
};

const v2_confInfo0_unexpected: ConfigurationInfo = {
  configurationLabel: 'UNEXPECTED_##_0_##_NAME',
  configurationValue: 'VALUE',
};

const v2_confInfo0_name: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_0_##_NAME',
  configurationValue: productName0,
};

const v2_confInfo0_qty: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_0_##_QTY',
  configurationValue: productQty0,
};

const v2_confInfo0_formattedprice: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_0_##_FORMATTED_PRICE',
  configurationValue: productFormattedPrice0,
};

const v2_confInfo0_key: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_0_##_KEY',
  configurationValue: productKey0,
};

const v2_confInfo0_pricevalue: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_0_##_PRICE_VALUE',
  configurationValue: productPriceValue0,
};

const v2_confInfo1_name: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_1_##_NAME',
  configurationValue: productName1,
};

const v2_confInfo1_qty: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_1_##_QTY',
  configurationValue: productQty1,
};

const v2_confInfo1_formattedprice: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_1_##_FORMATTED_PRICE',
  configurationValue: productFormattedPrice1,
};

const v2_confInfo1_key: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_1_##_KEY',
  configurationValue: productKey1,
};

const v2_confInfo1_pricevalue: ConfigurationInfo = {
  configurationLabel: 'LINEITEM_##_1_##_PRICE_VALUE',
  configurationValue: productPriceValue1,
};

const v2_expectedLineItem0: LineItem = {
  name: productName0,
  formattedQuantity: productQty0,
  formattedPrice: productFormattedPrice0,
};

const v2_expectedLineItem1: LineItem = {
  name: productName1,
  formattedQuantity: productQty1,
  formattedPrice: productFormattedPrice1,
};

const v2_initializedLineItem: LineItem = {
  name: '',
  formattedQuantity: '',
  formattedPrice: '',
};

const v2_orderEntry: OrderEntry = {
  configurationInfos: [
    v2_confInfo_version,
    v2_confInfo0_key,
    v2_confInfo0_name,
    v2_confInfo0_qty,
    v2_confInfo0_formattedprice,
    v2_confInfo0_pricevalue,
    v2_confInfo1_key,
    v2_confInfo1_name,
    v2_confInfo1_qty,
    v2_confInfo1_formattedprice,
    v2_confInfo1_pricevalue,
  ],
};

describe('ConfiguratorCartEntryBundleInfoService', () => {
  let configuratorCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorCartEntryBundleInfoService],
    });

    configuratorCartEntryBundleInfoService = TestBed.inject(
      ConfiguratorCartEntryBundleInfoService as Type<ConfiguratorCartEntryBundleInfoService>
    );
  });

  it('should be created', () => {
    expect(ConfiguratorCartEntryBundleInfoService).toBeTruthy();
  });

  it('should remove delimiter', () => {
    expect(
      configuratorCartEntryBundleInfoService['removeDelimiter']('xxx:')
    ).toBe('xxx');
  });

  it('should retrive unchanged string if there is no delimiter', () => {
    expect(
      configuratorCartEntryBundleInfoService['removeDelimiter']('xxx')
    ).toBe('xxx');
  });

  it('should prepare line item', () => {
    expect(
      configuratorCartEntryBundleInfoService['prepareLineItem'](confInfo1)
    ).toEqual(expectedLineItem1);
  });

  it('should prepare line item when there is no label/name', () => {
    expect(
      configuratorCartEntryBundleInfoService['prepareLineItem'](confInfo2)
    ).toEqual(expectedLineItem2);
  });

  it('should prepare line item when there is no price', () => {
    expect(
      configuratorCartEntryBundleInfoService['prepareLineItem'](confInfo3)
    ).toEqual(expectedLineItem3);
  });

  it('should prepare line item when there is neither quantity nor price', () => {
    expect(
      configuratorCartEntryBundleInfoService['prepareLineItem'](confInfo4)
    ).toEqual(expectedLineItem4);
  });

  it('should retrieve line items', () => {
    const lineItems: LineItem[] = configuratorCartEntryBundleInfoService.retrieveLineItems(
      orderEntry
    );
    expect(lineItems.length).toBe(4);
    expect(lineItems[0]).toEqual(expectedLineItem1);
    expect(lineItems[1]).toEqual(expectedLineItem2);
    expect(lineItems[2]).toEqual(expectedLineItem3);
    expect(lineItems[3]).toEqual(expectedLineItem4);
  });

  describe('for enhanced OCC API format: ', () => {
    it('should retrieve an existing lineitem for requested lineitemNumber from lineitemMap', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      const lineItemNumber  = 123;
      lineItemMap.set(lineItemNumber, v2_expectedLineItem0);
      const lineItem: LineItem = configuratorCartEntryBundleInfoService[
        'getOrCreateLineItem'
      ](lineItemMap, lineItemNumber);
      expect(lineItem).toEqual(v2_expectedLineItem0);
      expect(lineItemMap.size).toBe(1);
      expect(lineItemMap.get(lineItemNumber)).toEqual(v2_expectedLineItem0);
    });

    it('should retrieve a new lineitem for requested lineitemNumber if it doesnt exist in lineItemMap yet', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      const lineItemNumber: number = 123;
      const lineItem: LineItem = configuratorCartEntryBundleInfoService[
        'getOrCreateLineItem'
      ](lineItemMap, lineItemNumber);
      expect(lineItem).toEqual(v2_initializedLineItem);
      expect(lineItemMap.size).toBe(1);
      expect(lineItemMap.get(lineItemNumber)).toEqual(v2_initializedLineItem);
    });

    it('should add lineItemData for expected Fields(NAME, QTY, FORMATTED_PRICE): ', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      const lineItemNumber: number = 123;
      const lineItemNumberAsString: string = '123';
      const configurationInfosSplittedName: string[] = [
        'LINEITEM',
        lineItemNumberAsString,
        'NAME',
      ];
      const configurationInfosSplittedQty: string[] = [
        'LINEITEM',
        lineItemNumberAsString,
        'QTY',
      ];
      const configurationInfosSplittedFormattedPrice: string[] = [
        'LINEITEM',
        lineItemNumberAsString,
        'FORMATTED_PRICE',
      ];

      const configurationInfoValueName: string = 'Name';
      const configurationInfoValueQty: string = 'QtY';
      const configurationInfoValueFormattedPrice: string = 'FormattedPrice';

      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedName,
        configurationInfoValueName
      );
      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedQty,
        configurationInfoValueQty
      );
      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedFormattedPrice,
        configurationInfoValueFormattedPrice
      );

      expect(lineItemMap.size).toBe(1);
      expect(lineItemMap.get(lineItemNumber)?.name).toBe(
        configurationInfoValueName
      );
      expect(lineItemMap.get(lineItemNumber)?.formattedQuantity).toBe(
        configurationInfoValueQty
      );
      expect(lineItemMap.get(lineItemNumber)?.formattedPrice).toBe(
        configurationInfoValueFormattedPrice
      );
    });

    it('should not add lineItem data for unexpected fields ', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      const lineItemNumberAsString: string = '123';
      const configurationInfosSplittedUnexpectedFieldName: string[] = [
        'LINEITEM',
        lineItemNumberAsString,
        'UNEXPECTED_FIELD_NAME',
      ];

      const configurationInfosSplittedKey: string[] = [
        'LINEITEM',
        lineItemNumberAsString,
        'KEY',
      ];

      const configurationInfosSplittedPriceValue: string[] = [
        'LINEITEM',
        lineItemNumberAsString,
        'PRICE_VALUE',
      ];

      const configurationInfoValueUnexpectedField: string =
        'ValueOfUnexpectedField';
      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedUnexpectedFieldName,
        configurationInfoValueUnexpectedField
      );

      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedKey,
        configurationInfoValueUnexpectedField
      );

      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedPriceValue,
        configurationInfoValueUnexpectedField
      );

      expect(lineItemMap.size).toBe(0);
    });

    it('should not add lineItem data for unexpected format ', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      const configurationInfosSplittedUnexpectedFormat: string[] = [
        'LINEITEM',
        '0',
        'NAME',
        'unexpectedField',
      ];
      const configurationInfoValue: string = 'Value of unexpected Field';
      configuratorCartEntryBundleInfoService['addLineItemData'](
        lineItemMap,
        configurationInfosSplittedUnexpectedFormat,
        configurationInfoValue
      );
      expect(lineItemMap.size).toBe(0);
    });

    it('should add lineItemData if configurationSplitted[0] is "LINEITEM" ', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      configuratorCartEntryBundleInfoService['processConfigurationInfoEntry'](
        lineItemMap,
        v2_confInfo0_name
      );
      expect(lineItemMap.size).toBe(1);
      expect(lineItemMap.get(0)?.name).toBe(productName0);
    });

    it('should not add lineItem Data if configurationSplitted[0] is not "LINEITEM" ', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      configuratorCartEntryBundleInfoService['processConfigurationInfoEntry'](
        lineItemMap,
        v2_confInfo0_unexpected
      );
      expect(lineItemMap.size).toBe(0);
    });

    it('should not add lineItem Data to Map if configurationLabel is empty or undefined', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      configuratorCartEntryBundleInfoService['processConfigurationInfoEntry'](
        lineItemMap,
        {
          configurationLabel: '',
          configurationValue: 'VALUE',
        }
      );
      configuratorCartEntryBundleInfoService['processConfigurationInfoEntry'](
        lineItemMap,
        {
          configurationLabel: undefined,
          configurationValue: 'VALUE',
        }
      );
      expect(lineItemMap.size).toBe(0);
    });

    it('should set configurationValue to empty String if configurationInfo has no configurationValue set', () => {
      const lineItemMap: Map<number, LineItem> = new Map();
      configuratorCartEntryBundleInfoService['processConfigurationInfoEntry'](
        lineItemMap,
        v2_confInfo0_name_novalue
      );
      expect(lineItemMap.get(0)?.name).toEqual('');
    });

    it('should deliver a correctly sorted lineItem Array when a sorted configurationInfo Array is given', () => {
      const configurationInfoArraySorted: ConfigurationInfo[] = [
        v2_confInfo0_key,
        v2_confInfo0_name,
        v2_confInfo0_qty,
        v2_confInfo0_formattedprice,
        v2_confInfo0_pricevalue,
        v2_confInfo1_key,
        v2_confInfo1_name,
        v2_confInfo1_qty,
        v2_confInfo1_formattedprice,
        v2_confInfo1_pricevalue,
      ];
      const lineItemArray: LineItem[] = configuratorCartEntryBundleInfoService[
        'processConfigurationInfos'
      ](configurationInfoArraySorted);
      expect(lineItemArray.length).toBe(2);
      expect(lineItemArray[0]).toEqual(v2_expectedLineItem0);
      expect(lineItemArray[1]).toEqual(v2_expectedLineItem1);
    });

    it('should deliver a correctly sorted lineItem Array when an unsorted configurationInfo Array is given', () => {
      const configurationInfoArrayUnSorted: ConfigurationInfo[] = [
        v2_confInfo1_key,
        v2_confInfo0_key,
        v2_confInfo0_qty,
        v2_confInfo1_name,
        v2_confInfo1_qty,
        v2_confInfo0_name,
        v2_confInfo0_formattedprice,
        v2_confInfo0_pricevalue,
        v2_confInfo1_formattedprice,
        v2_confInfo1_pricevalue,
      ];
      const lineItemArray: LineItem[] = configuratorCartEntryBundleInfoService[
        'processConfigurationInfos'
      ](configurationInfoArrayUnSorted);
      expect(lineItemArray.length).toBe(2);
      expect(lineItemArray[0]).toEqual(v2_expectedLineItem0);
      expect(lineItemArray[1]).toEqual(v2_expectedLineItem1);
    });

    it('should retrieve line items', () => {
      const lineItems: LineItem[] = configuratorCartEntryBundleInfoService.retrieveLineItems(
        v2_orderEntry
      );
      expect(lineItems.length).toBe(2);
      expect(lineItems[0]).toEqual(v2_expectedLineItem0);
      expect(lineItems[1]).toEqual(v2_expectedLineItem1);
    });
  });
});
