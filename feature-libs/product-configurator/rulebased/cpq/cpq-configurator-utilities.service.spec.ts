import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CpqConfiguratorUtilitiesService } from './cpq-configurator-utilities.service';
import { Cpq } from './cpq.models';
import { Configurator } from '../core/model/configurator.model';
import { LanguageService } from '@spartacus/core';

const CURRENCY = 'USD';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('CpqConfiguratorUtilitiesService', () => {
  let cpqConfiguratorUtilitiesService: CpqConfiguratorUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorUtilitiesService,
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });

    cpqConfiguratorUtilitiesService = TestBed.inject(
      CpqConfiguratorUtilitiesService as Type<CpqConfiguratorUtilitiesService>
    );
  });

  it('should be created', () => {
    expect(CpqConfiguratorUtilitiesService).toBeTruthy();
  });

  it('should prepare price', () => {
    const valueSelected: Cpq.Value = { paV_ID: 1, price: '123.45' };
    const valuePrice = cpqConfiguratorUtilitiesService.prepareValuePrice(
      valueSelected,
      CURRENCY
    );
    expect(valuePrice.currencyIso).toBe(CURRENCY);
    expect(valuePrice.value).toBe(123.45);
    expect(valuePrice.formattedValue).toBe('$123.45');
  });

  it('should prepare price when no price exists', () => {
    const valueSelected: Cpq.Value = { paV_ID: 1 };
    const valuePrice = cpqConfiguratorUtilitiesService.prepareValuePrice(
      valueSelected,
      CURRENCY
    );
    expect(valuePrice).toBeNull();
  });

  it('should calculate value price total', () => {
    const quantity = 3;
    const valuePrice: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    const valuePriceTotal = cpqConfiguratorUtilitiesService.calculateValuePriceTotal(
      quantity,
      valuePrice
    );
    expect(valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(valuePriceTotal.value).toBe(370.35);
    expect(valuePriceTotal.formattedValue).toBe('$370.35');
  });

  it('should calculate value price total when no quantity', () => {
    const quantity = null;
    const valuePrice: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    const valuePriceTotal = cpqConfiguratorUtilitiesService.calculateValuePriceTotal(
      quantity,
      valuePrice
    );
    expect(valuePriceTotal.currencyIso).toBe(CURRENCY);
    expect(valuePriceTotal.value).toBe(123.45);
    expect(valuePriceTotal.formattedValue).toBe('$123.45');
  });

  it('should calculate value price total when no value price', () => {
    const quantity = 3;
    const valuePrice: Configurator.PriceDetails = null;
    const valuePriceTotal = cpqConfiguratorUtilitiesService.calculateValuePriceTotal(
      quantity,
      valuePrice
    );
    expect(valuePriceTotal).toBeNull();
  });

  it('should prepare quantity for attribute with quantity on attribute level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '2',
      dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
      values: [{ paV_ID: 1, selected: true, quantity: '1' }],
    };
    const quantity = cpqConfiguratorUtilitiesService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBe(2);
  });

  it('should prepare quantity for attribute with quantity on value level', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      values: [{ paV_ID: 1, selected: true, quantity: '3' }],
    };
    const quantity = cpqConfiguratorUtilitiesService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBe(3);
  });

  it('should retrieve quantity null for attribute without quantity', () => {
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.N_A,
      values: [{ paV_ID: 1, selected: true, quantity: '1' }],
    };
    const quantity = cpqConfiguratorUtilitiesService.prepareQuantity(
      cpqAttr.values[0],
      cpqAttr
    );
    expect(quantity).toBeNull();
  });

  it('should format price retriving locale from language service', () => {
    const price: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    cpqConfiguratorUtilitiesService['formatPrice'](price);
    expect(price.formattedValue).toBe('$123.45');
  });

  it('should format price', () => {
    const price: Configurator.PriceDetails = {
      value: 1123.45,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilitiesService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('$1,123.45');
  });

  it('should format price with missing fraction digits', () => {
    const price: Configurator.PriceDetails = {
      value: 123,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilitiesService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('$123.00');
  });

  it('should format price with to many fraction digits', () => {
    const price: Configurator.PriceDetails = {
      value: 123.456,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilitiesService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('$123.46');
  });

  it('should format negative price ', () => {
    const price: Configurator.PriceDetails = {
      value: -123.45,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorUtilitiesService['formatPriceForLocale'](price, locale);
    expect(price.formattedValue).toBe('-$123.45');
  });

  it('should calculate attribute price total', () => {
    const attribute: Configurator.Attribute = {
      name: 'AttributeName',
      values: [
        {
          selected: true,
          valuePriceTotal: { currencyIso: CURRENCY, value: 100 },
        },
        {
          selected: true,
          valuePriceTotal: { currencyIso: CURRENCY, value: 0.01 },
        },
        {
          selected: true,
        },
        {
          selected: false,
          valuePriceTotal: { currencyIso: CURRENCY, value: 200 },
        },
      ],
    };

    const attributePriceTotal = cpqConfiguratorUtilitiesService.calculateAttributePriceTotal(
      attribute,
      CURRENCY
    );
    expect(attributePriceTotal.currencyIso).toBe(CURRENCY);
    expect(attributePriceTotal.value).toBe(100.01);
    expect(attributePriceTotal.formattedValue).toBe('$100.01');
  });
});
