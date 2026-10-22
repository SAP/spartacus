import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageService } from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable, of } from 'rxjs';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';

const CURRENCY = 'USD';
const VALUE_CODE1 = '1';
const VALUE_CODE2 = '2';
const VALUE_CODE3 = '3';
const VALUE_CODE4 = '4';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('CpqConfiguratorNormalizerUtilsService', () => {
  let cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorNormalizerUtilsService,
        { provide: LanguageService, useClass: MockLanguageService },
        ...provideMockFeatureToggles({ productConfiguratorCPQContainer: true }),
      ],
    });

    cpqConfiguratorNormalizerUtilsService = TestBed.inject(
      CpqConfiguratorNormalizerUtilsService as Type<CpqConfiguratorNormalizerUtilsService>
    );
  });

  it('should be created', () => {
    expect(CpqConfiguratorNormalizerUtilsService).toBeTruthy();
  });

  it('should fall back to en when locale data is missing for the active language', () => {
    const warnSpy = vi.spyOn(
      cpqConfiguratorNormalizerUtilsService['logger'],
      'warn'
    );
    vi.spyOn(TestBed.inject(LanguageService), 'getActive').mockReturnValue(
      of('xx-INVALID')
    );

    expect(cpqConfiguratorNormalizerUtilsService['getLanguage']()).toBe('en');
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('No locale data registered')
    );
  });

  it('should convert price', () => {
    const valueSelected: Cpq.Value = { paV_ID: 1, price: '123.45' };
    const valuePrice = cpqConfiguratorNormalizerUtilsService.convertValuePrice(
      valueSelected,
      CURRENCY
    );
    expect(valuePrice?.currencyIso).toBe(CURRENCY);
    expect(valuePrice?.value).toBe(123.45);
    expect(valuePrice?.formattedValue).toBe('$123.45');
  });

  it('should convert price when no price exists', () => {
    const valueSelected: Cpq.Value = { paV_ID: 1 };
    const valuePrice = cpqConfiguratorNormalizerUtilsService.convertValuePrice(
      valueSelected,
      CURRENCY
    );
    expect(valuePrice).toBeUndefined();
  });

  it('should calculate value price total', () => {
    const quantity = 3;
    const valuePrice: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    const valuePriceTotal =
      cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(
        quantity,
        valuePrice
      );
    expect(valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(valuePriceTotal?.value).toBe(370.35);
    expect(valuePriceTotal?.formattedValue).toBe('$370.35');
  });

  it('should calculate value price total when no quantity', () => {
    const quantity = 0;
    const valuePrice: Configurator.PriceDetails = {
      currencyIso: CURRENCY,
      value: 123.45,
    };
    const valuePriceTotal =
      cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(
        quantity,
        valuePrice
      );
    expect(valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(valuePriceTotal?.value).toBe(123.45);
    expect(valuePriceTotal?.formattedValue).toBe('$123.45');
  });

  it('should convert quantity for attribute with quantity on attribute level', () => {
    const cpqValue = { paV_ID: 1, selected: true, quantity: '1' };
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '2',
      dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
      values: [cpqValue],
    };
    const quantity = cpqConfiguratorNormalizerUtilsService.convertQuantity(
      cpqValue,
      cpqAttr
    );
    expect(quantity).toBe(2);
  });

  it('should convert quantity for attribute with quantity on value level', () => {
    const cpqValue = { paV_ID: 1, selected: true, quantity: '3' };
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      values: [cpqValue],
    };
    const quantity = cpqConfiguratorNormalizerUtilsService.convertQuantity(
      cpqValue,
      cpqAttr
    );
    expect(quantity).toBe(3);
  });

  it('should convert quantity for Checkbox Lineitem attribute with quantity on value level', () => {
    const cpqValue = { paV_ID: 1, selected: true, quantity: '3' };
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: true,
      values: [cpqValue],
    };
    const quantity = cpqConfiguratorNormalizerUtilsService.convertQuantity(
      cpqValue,
      cpqAttr
    );
    expect(quantity).toBe(3);
  });

  it('should convert quantity for Checkbox Non-Lineitem attribute with quantity on value level', () => {
    const cpqValue = { paV_ID: 1, selected: true, quantity: '3' };
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: false,
      values: [cpqValue],
    };
    const quantity = cpqConfiguratorNormalizerUtilsService.convertQuantity(
      cpqValue,
      cpqAttr
    );
    expect(quantity).toBeUndefined();
  });

  it('should convert quantity for Radiobutton attribute with quantity on value level', () => {
    const cpqValue = { paV_ID: 1, selected: true, quantity: '3' };
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.RADIO_BUTTON,
      values: [cpqValue],
    };
    const quantity = cpqConfiguratorNormalizerUtilsService.convertQuantity(
      cpqValue,
      cpqAttr
    );
    expect(quantity).toBeUndefined();
  });

  it('should retrieve quantity null for attribute without quantity', () => {
    const cpqValue = { paV_ID: 1, selected: true, quantity: '1' };
    const cpqAttr: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      quantity: '1',
      dataType: Cpq.DataType.N_A,
      values: [cpqValue],
    };
    const quantity = cpqConfiguratorNormalizerUtilsService.convertQuantity(
      cpqValue,
      cpqAttr
    );
    expect(quantity).toBeUndefined();
  });

  it('should format price', () => {
    const price: Configurator.PriceDetails = {
      value: 1123.45,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorNormalizerUtilsService['formatPriceForLocale'](
      price,
      locale
    );
    expect(price.formattedValue).toBe('$1,123.45');
  });

  it('should format price with missing fraction digits', () => {
    const price: Configurator.PriceDetails = {
      value: 123,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorNormalizerUtilsService['formatPriceForLocale'](
      price,
      locale
    );
    expect(price.formattedValue).toBe('$123.00');
  });

  it('should format price with to many fraction digits', () => {
    const price: Configurator.PriceDetails = {
      value: 123.456,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorNormalizerUtilsService['formatPriceForLocale'](
      price,
      locale
    );
    expect(price.formattedValue).toBe('$123.46');
  });

  it('should format negative price ', () => {
    const price: Configurator.PriceDetails = {
      value: -123.45,
      currencyIso: 'USD',
    };
    const locale = 'en-US';
    cpqConfiguratorNormalizerUtilsService['formatPriceForLocale'](
      price,
      locale
    );
    expect(price.formattedValue).toBe('-$123.45');
  });

  it('should calculate attribute price total', () => {
    const attribute: Configurator.Attribute = {
      name: 'AttributeName',
      values: [
        {
          selected: true,
          valuePriceTotal: { currencyIso: CURRENCY, value: 100 },
          valueCode: VALUE_CODE1,
        },
        {
          selected: true,
          valuePriceTotal: { currencyIso: CURRENCY, value: 0.01 },
          valueCode: VALUE_CODE2,
        },
        {
          selected: true,
          valueCode: VALUE_CODE3,
        },
        {
          selected: false,
          valuePriceTotal: { currencyIso: CURRENCY, value: 200 },
          valueCode: VALUE_CODE4,
        },
      ],
    };

    const attributePriceTotal =
      cpqConfiguratorNormalizerUtilsService.calculateAttributePriceTotal(
        attribute,
        CURRENCY
      );
    expect(attributePriceTotal.currencyIso).toBe(CURRENCY);
    expect(attributePriceTotal.value).toBe(100.01);
    expect(attributePriceTotal.formattedValue).toBe('$100.01');
  });

  it('should convert CPQ dataType INPUT_STRING', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.INPUT_STRING,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.INPUT_STRING);
  });

  it('should convert CPQ dataType INPUT_NUMBER', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.INPUT_NUMBER,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.INPUT_NUMBER);
  });

  it('should convert CPQ dataType User Selection (N/A)', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.N_A,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.USER_SELECTION_NO_QTY);
  });

  it('should convert CPQ dataType User Selection with Quantity on attribute level (QTY_ATTRIBUTE_LEVEL)', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_ATTRIBUTE_LEVEL,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
  });

  it('should convert CPQ dataType User Selection with Quantity on value level (QTY_VALUE_LEVEL)', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: true,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL);
  });

  it('should convert CPQ dataType User Selection with Quantity on value level (QTY_VALUE_LEVEL) for non line item multi selection attribute', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.CHECK_BOX,
      isLineItem: false,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.USER_SELECTION_NO_QTY);
  });

  it('should convert CPQ dataType User Selection with Quantity on value level (QTY_VALUE_LEVEL) for single selection attribute', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.QTY_VALUE_LEVEL,
      displayAs: Cpq.DisplayAs.RADIO_BUTTON,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.USER_SELECTION_NO_QTY);
  });

  it('should convert CPQ dataType CONTAINER', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: Cpq.DataType.CONTAINER,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.CONTAINER);
  });

  it('should convert CPQ not supported dataType to NOT_IMPLEMENTED', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      dataType: undefined,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertDataType(attribute)
    ).toBe(Configurator.DataType.NOT_IMPLEMENTED);
  });

  it('should convert price summary', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { totalPrice: '$3333.33', baseProductPrice: '1000.00' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$1,000.00',
        value: 1000,
      },
      currentTotal: {
        currencyIso: 'USD',
        formattedValue: '$3,333.33',
        value: 3333.33,
      },
      selectedOptions: {
        currencyIso: 'USD',
        formattedValue: '$2,333.33',
        value: 2333.33,
      },
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertPriceSummary(
        cpqConfiguration
      )
    ).toEqual(expectedPriceSummary);
  });

  it('should convert price summary when no base price exists', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { totalPrice: '$3333.33' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      currentTotal: {
        currencyIso: 'USD',
        formattedValue: '$3,333.33',
        value: 3333.33,
      },
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertPriceSummary(
        cpqConfiguration
      )
    ).toEqual(expectedPriceSummary);
  });

  it('should convert price summary when no base price is 0', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { totalPrice: '$3333.33', baseProductPrice: '0.00' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      currentTotal: {
        currencyIso: 'USD',
        formattedValue: '$3,333.33',
        value: 3333.33,
      },
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        value: 0,
      },
      selectedOptions: {
        currencyIso: 'USD',
        formattedValue: '$3,333.33',
        value: 3333.33,
      },
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertPriceSummary(
        cpqConfiguration
      )
    ).toEqual(expectedPriceSummary);
  });

  it('should convert price summary when no total price exists', () => {
    const cpqConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: 'USD',
      currencySign: '$',
      responder: { baseProductPrice: '1000.00' },
    };
    const expectedPriceSummary: Configurator.PriceSummary = {
      basePrice: {
        currencyIso: 'USD',
        formattedValue: '$1,000.00',
        value: 1000,
      },
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertPriceSummary(
        cpqConfiguration
      )
    ).toEqual(expectedPriceSummary);
  });

  it('should convert attribute label', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      label: 'label',
      name: 'name',
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(attribute)
    ).toBe('label');
  });

  it('should retrieve attribute name if no label available', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
      name: 'name',
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(attribute)
    ).toBe('name');
  });

  it('should retrieve empty string if neither attribute label nor attribute name are available', () => {
    const attribute: Cpq.Attribute = {
      pA_ID: 1,
      stdAttrCode: 2,
    };
    expect(
      cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(attribute)
    ).toBe('');
  });

  describe('issue counting', () => {
    const ERROR_MSG = 'This is an error message';
    const VALIDATION_MSG = 'this is a failed validation';
    const INVALID_MSG = 'This is an invalid message';
    const INCOMPLETE_ATTR_1 = 'Attribute1';
    const INCOMPLETE_ATTR_2 = 'Attribute2';
    const INCOMPLETE_MSG = 'incomplete message';

    const rootConfiguration: Cpq.Configuration = {
      productSystemId: 'productSystemId',
      currencyISOCode: CURRENCY,
      incompleteMessages: [INCOMPLETE_MSG],
      incompleteAttributes: [INCOMPLETE_ATTR_1, INCOMPLETE_ATTR_2],
      invalidMessages: [INVALID_MSG],
      failedValidations: [VALIDATION_MSG],
      errorMessages: [ERROR_MSG],
      messages: [
        { message: 'Typed warning', severity: Cpq.MessageSeverity.WARNING },
        { message: 'Typed info', severity: Cpq.MessageSeverity.INFO },
        { message: '' },
      ],
    };

    const nestedConfiguration: Cpq.NestedProductConfiguration = {
      completed: false,
      errorMessages: [ERROR_MSG],
      invalidMessages: [INVALID_MSG],
      failedValidations: [VALIDATION_MSG],
      incompleteMessages: [INCOMPLETE_MSG],
      messages: [
        { message: 'Check zoom range', severity: Cpq.MessageSeverity.WARNING },
        { message: 'Info only', severity: Cpq.MessageSeverity.INFO },
      ],
    };

    it('should count root-level issues including typed warning messages', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService['countIssues'](rootConfiguration)
      ).toBe(7);
    });

    it('should count nested configuration issues from tab attributes marked incomplete', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService['countIssues'](
          nestedConfiguration
        )
      ).toBe(5);
      expect(
        cpqConfiguratorNormalizerUtilsService['countIssues']({
          ...nestedConfiguration,
          tabs: [
            {
              id: 1,
              attributes: [
                { pA_ID: 1, stdAttrCode: 11, incomplete: true },
                { pA_ID: 2, stdAttrCode: 12, incomplete: true },
                { pA_ID: 3, stdAttrCode: 13, incomplete: false },
              ],
            },
            {
              id: 2,
              attributes: [{ pA_ID: 4, stdAttrCode: 14, incomplete: true }],
            },
          ],
        })
      ).toBe(8);
    });

    it('should count issues in nested container configurations', () => {
      const containers: Cpq.Container[] = [
        {
          stdAttrCode: 1,
          rows: [
            {
              id: '1',
              configuration: nestedConfiguration,
            },
          ],
        },
      ];
      expect(
        cpqConfiguratorNormalizerUtilsService['countIssuesInContainers'](
          containers
        )
      ).toBe(5);
    });

    it('should not count container-level warning messages', () => {
      const containers: Cpq.Container[] = [
        {
          stdAttrCode: 1,
          messages: [
            {
              message: 'Container warning',
              severity: Cpq.MessageSeverity.WARNING,
            },
            { message: 'Info only', severity: Cpq.MessageSeverity.INFO },
            { message: '', severity: Cpq.MessageSeverity.WARNING },
          ],
          rows: [
            {
              id: '1',
              configuration: nestedConfiguration,
            },
          ],
        },
      ];
      expect(
        cpqConfiguratorNormalizerUtilsService['countIssuesInContainers'](
          containers
        )
      ).toBe(5);
    });

    describe('container warnings covered by incomplete attributes', () => {
      const trainContainerWarning: Cpq.Message = {
        message: 'Missing multi-unit control',
        severity: Cpq.MessageSeverity.WARNING,
      };

      it('should count train-like incomplete container attribute with one warning as one issue', () => {
        expect(
          cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
            productSystemId: 'CONF_TRAIN',
            currencyISOCode: CURRENCY,
            incompleteAttributes: ['Configurable Train Components'],
            sapContainers: [
              {
                stdAttrCode: 1067,
                messages: [trainContainerWarning],
                rows: [],
              },
            ],
          })
        ).toBe(1);
      });

      it('should count incomplete container attribute with two warnings as one issue', () => {
        expect(
          cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
            productSystemId: 'productSystemId',
            currencyISOCode: CURRENCY,
            incompleteAttributes: ['Grinder (Container)'],
            sapContainers: [
              {
                stdAttrCode: 1076,
                messages: [
                  trainContainerWarning,
                  { ...trainContainerWarning, message: 'Second validation' },
                ],
                rows: [],
              },
            ],
          })
        ).toBe(1);
      });

      it('should count non-container incomplete attribute plus train-like container as two issues', () => {
        expect(
          cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
            productSystemId: 'productSystemId',
            currencyISOCode: CURRENCY,
            incompleteAttributes: [
              'Track Gauge',
              'Configurable Train Components',
            ],
            sapContainers: [
              {
                stdAttrCode: 1067,
                messages: [trainContainerWarning],
                rows: [],
              },
            ],
          })
        ).toBe(2);
      });

      it('should not count container warnings when the linked attribute is not incomplete', () => {
        expect(
          cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
            productSystemId: 'productSystemId',
            currencyISOCode: CURRENCY,
            incompleteAttributes: [],
            sapContainers: [
              {
                stdAttrCode: 1067,
                messages: [trainContainerWarning],
                rows: [],
              },
            ],
          })
        ).toBe(0);
      });

      it('should count nested row container attribute with warning without double-counting the warning', () => {
        expect(
          cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
            productSystemId: 'productSystemId',
            currencyISOCode: CURRENCY,
            incompleteAttributes: ['Root incomplete'],
            sapContainers: [
              {
                stdAttrCode: 1,
                rows: [
                  {
                    id: 'row-1',
                    configuration: {
                      completed: false,
                      tabs: [
                        {
                          id: 1,
                          attributes: [
                            {
                              pA_ID: 1,
                              stdAttrCode: 99,
                              incomplete: true,
                            },
                          ],
                        },
                      ],
                      containers: [
                        {
                          stdAttrCode: 99,
                          messages: [trainContainerWarning],
                          rows: [],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          })
        ).toBe(2);
      });
    });

    it('should count root typed warning messages and incomplete attributes when messages are present', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues(
          rootConfiguration
        )
      ).toBe(3);
    });

    it('should count only typed warning messages when incomplete attributes are absent', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
          ...rootConfiguration,
          incompleteAttributes: undefined,
        })
      ).toBe(1);
    });

    it('should ignore legacy root message arrays when typed warning messages are present', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
          ...rootConfiguration,
          errorMessages: [ERROR_MSG, ERROR_MSG],
          invalidMessages: [INVALID_MSG, INVALID_MSG],
          failedValidations: [VALIDATION_MSG],
          incompleteMessages: [INCOMPLETE_MSG],
        })
      ).toBe(3);
    });

    it('should count all root message containers when messages are absent', () => {
      const rootWithoutMessages: Cpq.Configuration = {
        ...rootConfiguration,
        messages: undefined,
      };
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues(
          rootWithoutMessages
        )
      ).toBe(6);
    });

    it('should still count all nested message containers when nested warning messages are present', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
          productSystemId: 'productSystemId',
          currencyISOCode: CURRENCY,
          sapContainers: [
            {
              stdAttrCode: 1,
              rows: [
                {
                  id: '1',
                  configuration: nestedConfiguration,
                },
              ],
            },
          ],
        })
      ).toBe(5);
    });

    describe('productConfiguratorCPQContainer feature toggle', () => {
      it('should not count nested container issues when the toggle is disabled', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          providers: [
            CpqConfiguratorNormalizerUtilsService,
            { provide: LanguageService, useClass: MockLanguageService },
            ...provideMockFeatureToggles({
              productConfiguratorCPQContainer: false,
            }),
          ],
        });
        const utilsWithToggleOff = TestBed.inject(
          CpqConfiguratorNormalizerUtilsService as Type<CpqConfiguratorNormalizerUtilsService>
        );
        expect(
          utilsWithToggleOff.calculateTotalNumberOfIssues({
            productSystemId: 'productSystemId',
            currencyISOCode: CURRENCY,
            sapContainers: [
              {
                stdAttrCode: 1,
                rows: [
                  {
                    id: '1',
                    configuration: nestedConfiguration,
                  },
                ],
              },
            ],
          })
        ).toBe(0);
      });

      it('should count root typed messages and incomplete attributes but ignore nested containers when the toggle is disabled', () => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          providers: [
            CpqConfiguratorNormalizerUtilsService,
            { provide: LanguageService, useClass: MockLanguageService },
            ...provideMockFeatureToggles({
              productConfiguratorCPQContainer: false,
            }),
          ],
        });
        const utilsWithToggleOff = TestBed.inject(
          CpqConfiguratorNormalizerUtilsService as Type<CpqConfiguratorNormalizerUtilsService>
        );
        expect(
          utilsWithToggleOff.calculateTotalNumberOfIssues({
            ...rootConfiguration,
            sapContainers: [
              {
                stdAttrCode: 1,
                rows: [
                  {
                    id: '1',
                    configuration: nestedConfiguration,
                  },
                ],
              },
            ],
          })
        ).toBe(3);
      });
    });

    it('should count issues recursively in nested containers', () => {
      const containers: Cpq.Container[] = [
        {
          stdAttrCode: 1,
          rows: [
            {
              id: '1',
              configuration: {
                ...nestedConfiguration,
                containers: [
                  {
                    stdAttrCode: 2,
                    rows: [
                      {
                        id: '2',
                        configuration: {
                          completed: false,
                          errorMessages: [ERROR_MSG],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ];
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
          ...rootConfiguration,
          sapContainers: containers,
        })
      ).toBe(9);
    });

    it('should return zero when no issues exist', () => {
      expect(
        cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues({
          productSystemId: 'productSystemId',
          currencyISOCode: CURRENCY,
        })
      ).toBe(0);
    });
  });
});
