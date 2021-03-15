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

describe('ConfiguratorCartEntryBundleInfoService', () => {
  let configuratorCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorCartEntryBundleInfoService],
    });

    configuratorCartEntryBundleInfoService = TestBed.inject(
      ConfiguratorCartEntryBundleInfoService as Type<
        ConfiguratorCartEntryBundleInfoService
      >
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

  it('should retrieve number of line items', () => {
    expect(
      configuratorCartEntryBundleInfoService.retrieveNumberOfLineItems(
        orderEntry
      )
    ).toBe(4);
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
});
