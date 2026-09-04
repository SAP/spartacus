import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { LanguageService, TranslationService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { Observable, of } from 'rxjs';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';
import { CpqConfiguratorOverviewNormalizer } from './cpq-configurator-overview-normalizer';

const ATTR_NAME = 'name of attribute';
const attrBase: Cpq.Attribute = {
  name: ATTR_NAME,
  dataType: Cpq.DataType.INPUT_STRING,
  displayAs: Cpq.DisplayAs.INPUT,
  stdAttrCode: 11,
  pA_ID: 111,
  userInput: 'value',
  values: [],
};
let attr: Cpq.Attribute;

const GRP_DESCR = 'description of tab';
const GENERAL_GRP_DESCR = 'General';

const tab: Cpq.Tab = {
  id: 1,
  displayName: GRP_DESCR,
  attributes: [
    structuredClone(attrBase),
    { stdAttrCode: 12, pA_ID: 122, values: [] },
  ],
};

const PRODUCT_CODE = 'PCODE';

const ERROR_MSG = 'This is an error message';
const CONFLICT_MSG = 'conflict message';
const VALIDATION_MSG = 'this is a failed validation';
const INVALID_MSG = 'This is an invalid message';
const INCOMPLETE_ATTR_1 = 'Attribute1';
const INCOMPLETE_ATTR_2 = 'Attribute2';
const INCOMPLETE_MSG = 'incomplete message';

const completeAndConsistentInput: Cpq.Configuration = {
  productSystemId: PRODUCT_CODE,
  tabs: [structuredClone(tab), { id: 2 }],
  currencyISOCode: 'USD',
  currencySign: '$',
  responder: { totalPrice: '$3333.33', baseProductPrice: '1000' },
  numberOfConflicts: 0,
};

const input: Cpq.Configuration = {
  ...completeAndConsistentInput,
  incompleteMessages: [INCOMPLETE_MSG],
  incompleteAttributes: [INCOMPLETE_ATTR_1, INCOMPLETE_ATTR_2],
  invalidMessages: [INVALID_MSG],
  failedValidations: [VALIDATION_MSG],
  errorMessages: [ERROR_MSG],
  conflictMessages: [CONFLICT_MSG],
};

const singleSelectionValues: Cpq.Value[] = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
];

const valuepCode1: Cpq.Value = {
  paV_ID: 1,
  valueDisplay: 'another product',
  productSystemId: 'pCode1',
  selected: false,
};
const valuepCode1WoValueDisplay: Cpq.Value = {
  paV_ID: 1,
  productSystemId: 'pCode1',
  selected: false,
};

const singleSelectionProductValues: Cpq.Value[] = [
  valuepCode1,
  {
    paV_ID: 2,
    valueDisplay: 'selected product',
    productSystemId: 'pCode2',
    selected: true,
  },
  {
    paV_ID: 3,
    valueDisplay: 'yet another product',
    productSystemId: 'pCode3',
    selected: false,
  },
];

const multiSelectionValues: Cpq.Value[] = [
  { paV_ID: 1, valueDisplay: 'another value', selected: false },
  { paV_ID: 2, valueDisplay: 'selected value', selected: true },
  { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
  { paV_ID: 4, valueDisplay: 'another selected value', selected: true },
];

const multiSelectionProductValues: Cpq.Value[] = [
  {
    paV_ID: 1,
    valueDisplay: 'another product',
    productSystemId: 'pCode1',
    selected: false,
  },
  {
    paV_ID: 2,
    valueDisplay: 'selected product',
    productSystemId: 'pCode2',
    selected: true,
  },
  {
    paV_ID: 3,
    valueDisplay: 'yet another product',
    productSystemId: 'pCode3',
    selected: false,
  },
  {
    paV_ID: 4,
    valueDisplay: 'another selected product',
    productSystemId: 'pCode4',
    selected: true,
  },
];

const CURRENCY = 'USD';

const configurationId = '1234-56-7890';

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

class MockTranslationService {
  translate(): Observable<string> {
    return of('General');
  }
}

describe('CpqConfiguratorOverviewNormalizer', () => {
  let serviceUnderTest: CpqConfiguratorOverviewNormalizer;
  let featureToggles: MockFeatureTogglesController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        CpqConfiguratorOverviewNormalizer,
        CpqConfiguratorNormalizerUtilsService,
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        provideMockFeatureToggles({
          productConfiguratorCPQContainer: false,
        }),
      ],
    });

    serviceUnderTest = TestBed.inject(
      CpqConfiguratorOverviewNormalizer as Type<CpqConfiguratorOverviewNormalizer>
    );
    featureToggles = TestBed.inject(MockFeatureTogglesController);
    attr = structuredClone(attrBase);
  }));

  it('should be created', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should map product code', () => {
    expect(serviceUnderTest.convert(input).productCode).toEqual(PRODUCT_CODE);
  });

  it('should set empty configuration id if not provided', () => {
    expect(serviceUnderTest.convert(input).configId).toBe('');
  });

  it('should set configuration id if provided', () => {
    const inputWithConfigId = {
      ...structuredClone(input),
      configurationId: configurationId,
    };
    expect(serviceUnderTest.convert(inputWithConfigId).configId).toBe(
      configurationId
    );
  });

  it('should calculate total number of issues', () => {
    expect(serviceUnderTest.convert(input).totalNumberOfIssues).toBe(6);
  });

  it('should have zero issues if complete and consistent', () => {
    expect(
      serviceUnderTest.convert(completeAndConsistentInput).totalNumberOfIssues
    ).toBe(0);
  });

  it('should include nested container-row issues in totalNumberOfIssues', () => {
    const configurationWithNestedIssues: Cpq.Configuration = {
      ...completeAndConsistentInput,
      sapContainers: [
        {
          stdAttrCode: 11,
          rows: [
            {
              id: '018',
              productSystemId: 'LENS_ZOOM',
              configuration: {
                completed: false,
                errorMessages: [ERROR_MSG],
                invalidMessages: [INVALID_MSG],
                failedValidations: [VALIDATION_MSG],
                incompleteMessages: [INCOMPLETE_MSG],
                messages: [
                  {
                    message: 'Check zoom range',
                    severity: Cpq.MessageSeverity.WARNING,
                  },
                  {
                    message: 'Info only',
                    severity: Cpq.MessageSeverity.INFO,
                  },
                ],
              },
            },
          ],
        },
      ],
    };
    expect(
      serviceUnderTest.convert(configurationWithNestedIssues)
        .totalNumberOfIssues
    ).toBe(6);
  });

  it('should include incomplete nested tab attributes in totalNumberOfIssues', () => {
    const configurationWithNestedIssues: Cpq.Configuration = {
      ...completeAndConsistentInput,
      sapContainers: [
        {
          stdAttrCode: 11,
          rows: [
            {
              id: '018',
              productSystemId: 'LENS_ZOOM',
              configuration: {
                completed: false,
                tabs: [
                  {
                    id: 1,
                    attributes: [
                      { pA_ID: 1, stdAttrCode: 11, incomplete: true },
                      { pA_ID: 2, stdAttrCode: 12, incomplete: true },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    };
    expect(
      serviceUnderTest.convert(configurationWithNestedIssues)
        .totalNumberOfIssues
    ).toBe(2);
  });

  it('should prepare price summary', () => {
    const convertedPriceSummary = serviceUnderTest.convert(input).priceSummary;
    expect(convertedPriceSummary?.currentTotal?.formattedValue).toBe(
      '$3,333.33'
    );
    expect(convertedPriceSummary?.basePrice?.formattedValue).toBe('$1,000.00');
    expect(convertedPriceSummary?.selectedOptions?.formattedValue).toBe(
      '$2,333.33'
    );
  });

  it('should convert tabs to groups ignoring empty one', () => {
    expect(serviceUnderTest.convert(input).groups?.length).toBe(1);
  });

  it('should map tab ID', () => {
    expect(serviceUnderTest['convertTab'](tab, CURRENCY).id).toBe('1');
  });

  it('should map tab description', () => {
    expect(serviceUnderTest['convertTab'](tab, CURRENCY).groupDescription).toBe(
      GRP_DESCR
    );
  });

  it('should map tab description for General group', () => {
    const generalTab: Cpq.Tab = {
      id: 0,
    };
    expect(
      serviceUnderTest['convertTab'](generalTab, CURRENCY).groupDescription
    ).toBe(GENERAL_GRP_DESCR);
  });

  it('should convert attributes', () => {
    expect(
      serviceUnderTest['convertTab'](tab, CURRENCY).attributes?.length
    ).toBe(1);
  });

  it('should map attribute name', () => {
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].attribute
    ).toEqual(ATTR_NAME);
  });

  it('should map attribute name for every value', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs[0].attribute).toEqual(ATTR_NAME);
    expect(ovAttrs[1].attribute).toEqual(ATTR_NAME);
    expect(ovAttrs[0].attribute).toEqual(ovAttrs[1].attribute);
  });

  it('should map attribute type GENREAL', () => {
    attr.values = singleSelectionValues;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].type
    ).toEqual(Configurator.AttributeOverviewType.GENERAL);
  });

  it('should map attribute type BUNDLE', () => {
    attr.values = singleSelectionProductValues;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].type
    ).toEqual(Configurator.AttributeOverviewType.BUNDLE);
  });

  it('should map attribute type BUNDLE in mix case', () => {
    const mixedValues: Cpq.Value[] = [
      {
        paV_ID: 1,
        valueDisplay: 'first value',
        productSystemId: 'productSystemId',
        selected: false,
      },
      { paV_ID: 2, valueDisplay: 'second value', selected: true },
    ];
    attr.values = mixedValues;
    expect(
      serviceUnderTest['convertAttribute'](attr, CURRENCY)[0].type
    ).toEqual(Configurator.AttributeOverviewType.BUNDLE);
  });

  it('should map user input as attribute value', () => {
    attr.userInput = 'input';
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_STRING;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('input');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should filter user input with not supported DataType', () => {
    attr.userInput = 'input';
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_NUMBER;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(0);
  });

  it('should map RB selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.RADIO_BUTTON;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map RB selected product', () => {
    attr.values = singleSelectionProductValues;
    attr.displayAs = Cpq.DisplayAs.RADIO_BUTTON;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected product');
    expect(ovAttrs[0].productCode).toEqual('pCode2');
  });

  it('should filter ReadOnly', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.READ_ONLY;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(0);
  });

  it('should map DDLB selected value', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
  });

  it('should map DDLB selected value ignoring "No option selected"', () => {
    attr.values = [
      { paV_ID: 0, valueDisplay: 'No option selected', selected: true },
      { paV_ID: 2, valueDisplay: 'another value', selected: false },
      { paV_ID: 3, valueDisplay: 'yet another value', selected: false },
    ];
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(0);
  });

  it('should map CHECK_BOX selected values', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].value).toEqual('selected value');
    expect(ovAttrs[1].value).toEqual('another selected value');
    expect(ovAttrs[0].productCode).toBeUndefined();
    expect(ovAttrs[1].productCode).toBeUndefined();
  });

  it('should map CHECK_BOX selected products', () => {
    attr.values = multiSelectionProductValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].value).toEqual('selected product');
    expect(ovAttrs[1].value).toEqual('another selected product');
    expect(ovAttrs[0].productCode).toEqual('pCode2');
    expect(ovAttrs[1].productCode).toEqual('pCode4');
  });

  it('should filter LIST_BOX as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.LIST_BOX;
    expect(serviceUnderTest['convertAttribute'](attr, CURRENCY).length).toBe(0);
  });

  it('should filter LIST_BOX_MULTI as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.LIST_BOX_MULTI;
    expect(serviceUnderTest['convertAttribute'](attr, CURRENCY).length).toBe(0);
  });

  it('should filter AUTO_COMPLETE_CUSTOM as not implemented', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.AUTO_COMPLETE_CUSTOM;
    expect(serviceUnderTest['convertAttribute'](attr, CURRENCY).length).toBe(0);
  });

  it('should map quantity and price for attribute with quantity on attribute level', () => {
    attr.values = singleSelectionValues;
    attr.displayAs = Cpq.DisplayAs.DROPDOWN;
    attr.dataType = Cpq.DataType.QTY_ATTRIBUTE_LEVEL;
    attr.quantity = '3';
    attr.values[1].quantity = '1';
    attr.values[1].price = '123.45';
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].quantity).toEqual(3);
    expect(ovAttrs[0].valuePrice?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice?.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice?.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal?.value).toBe(370.35);
    expect(ovAttrs[0].valuePriceTotal?.formattedValue).toBe('$370.35');
  });

  it('should map quantity and price for attribute with quantity on value level', () => {
    attr.values = multiSelectionValues;
    attr.displayAs = Cpq.DisplayAs.CHECK_BOX;
    attr.dataType = Cpq.DataType.QTY_VALUE_LEVEL;
    attr.isLineItem = true;
    attr.quantity = '1';
    attr.values[1].quantity = '3';
    attr.values[1].price = '123.45';
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(2);
    expect(ovAttrs[0].quantity).toEqual(3);
    expect(ovAttrs[0].valuePrice?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice?.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice?.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal?.value).toBe(370.35);
    expect(ovAttrs[0].valuePriceTotal?.formattedValue).toBe('$370.35');
  });

  it('should map price for user input attribute', () => {
    attr.displayAs = Cpq.DisplayAs.INPUT;
    attr.dataType = Cpq.DataType.INPUT_STRING;
    attr.userInput = 'User Input';
    attr.values = [{ paV_ID: 1, selected: true, price: '123.45' }];
    const ovAttrs = serviceUnderTest['convertAttribute'](attr, CURRENCY);
    expect(ovAttrs.length).toBe(1);
    expect(ovAttrs[0].quantity).toEqual(1);
    expect(ovAttrs[0].valuePrice?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePrice?.value).toBe(123.45);
    expect(ovAttrs[0].valuePrice?.formattedValue).toBe('$123.45');
    expect(ovAttrs[0].valuePriceTotal?.currencyIso).toBe(CURRENCY);
    expect(ovAttrs[0].valuePriceTotal?.value).toBe(123.45);
    expect(ovAttrs[0].valuePriceTotal?.formattedValue).toBe('$123.45');
  });

  describe('containers', () => {
    const containerAttributeCode = 500;
    const nestedContainerAttributeCode = 600;
    const rootTabId = 1;
    const nestedTabId = rootTabId;

    const containerAttribute: Cpq.Attribute = {
      pA_ID: 50,
      stdAttrCode: containerAttributeCode,
      name: 'Lenses',
      displayAs: Cpq.DisplayAs.CONTAINER,
      values: [],
    };

    const nestedInputAttribute: Cpq.Attribute = {
      pA_ID: 60,
      stdAttrCode: 601,
      name: 'Lens Color',
      displayAs: Cpq.DisplayAs.INPUT,
      dataType: Cpq.DataType.INPUT_STRING,
      userInput: 'Black',
      values: [],
    };

    const nestedContainerAttribute: Cpq.Attribute = {
      pA_ID: 61,
      stdAttrCode: nestedContainerAttributeCode,
      name: 'Filters',
      displayAs: Cpq.DisplayAs.CONTAINER,
      values: [],
    };

    const deepInputAttribute: Cpq.Attribute = {
      pA_ID: 70,
      stdAttrCode: 701,
      name: 'Filter Color',
      displayAs: Cpq.DisplayAs.INPUT,
      dataType: Cpq.DataType.INPUT_STRING,
      userInput: 'Clear',
      values: [],
    };

    function createConfigurationWithContainers(): Cpq.Configuration {
      return {
        productSystemId: PRODUCT_CODE,
        currencyISOCode: CURRENCY,
        tabs: [
          {
            id: rootTabId,
            displayName: 'Camera',
            attributes: [structuredClone(containerAttribute)],
          },
        ],
        sapContainers: [
          {
            stdAttrCode: containerAttributeCode,
            rows: [
              {
                id: 'unselected',
                productSystemId: 'UNSELECTED',
                productName: 'Unselected Lens',
                selected: false,
              },
              {
                id: 'add',
                productSystemId: 'ADD',
                productName: 'Add Lens',
                selected: true,
                actions: [Cpq.ContainerRowAction.ADD],
              },
              {
                id: 'fixed',
                productSystemId: 'FIXED_LENS',
                productName: '50mm Lens',
                selected: true,
              },
              {
                id: 'zoom',
                productSystemId: 'ZOOM_LENS',
                productName: 'Zoom Lens',
                selected: true,
                configuration: {
                  tabs: [
                    {
                      id: nestedTabId,
                      displayName: 'Lens Details',
                      attributes: [
                        structuredClone(nestedInputAttribute),
                        structuredClone(nestedContainerAttribute),
                      ],
                    },
                  ],
                  containers: [
                    {
                      stdAttrCode: nestedContainerAttributeCode,
                      rows: [
                        {
                          id: 'filter',
                          productSystemId: 'UV_FILTER',
                          productName: 'UV Filter',
                          selected: true,
                          configuration: {
                            tabs: [
                              {
                                id: 2,
                                displayName: 'Filter Details',
                                attributes: [
                                  structuredClone(deepInputAttribute),
                                ],
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      };
    }

    it('should preserve legacy behavior when the feature toggle is disabled', () => {
      const loggerWarn = spyOn(serviceUnderTest['logger'], 'warn');

      const result = serviceUnderTest.convert(
        createConfigurationWithContainers()
      );

      expect(result.groups).toEqual([]);
      expect(loggerWarn).toHaveBeenCalled();
    });

    it('should convert only selected container rows without nested configurations into bundle attributes', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);

      const result = serviceUnderTest.convert(
        createConfigurationWithContainers()
      );
      const attributes = result.groups?.[0].attributes;

      expect(attributes?.length).toBe(1);
      expect(attributes?.[0]).toEqual(
        jasmine.objectContaining({
          attribute: 'Lenses',
          attributeId: containerAttributeCode.toString(),
          value: '50mm Lens',
          valueId: 'fixed',
          productCode: 'FIXED_LENS',
          type: Configurator.AttributeOverviewType.BUNDLE,
        })
      );
      expect(
        attributes?.some((attribute) => attribute.value === 'Unselected Lens')
      ).toBe(false);
      expect(
        attributes?.some((attribute) => attribute.value === 'Add Lens')
      ).toBe(false);
      expect(
        attributes?.some((attribute) => attribute.value === 'Zoom Lens')
      ).toBe(false);
    });

    it('should flatten a single nested group into its container row group', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);

      const result = serviceUnderTest.convert(
        createConfigurationWithContainers()
      );
      const rootGroup = result.groups?.[0];
      const rowGroup = rootGroup?.subGroups?.[0];
      const nestedRowGroup = rowGroup?.subGroups?.[0];
      const expectedRowGroupId = `${Configurator.ContainerRowGroupIdPrefix}@${containerAttributeCode}@zoom`;
      const expectedNestedRowGroupId = `${Configurator.ContainerRowGroupIdPrefix}@${nestedContainerAttributeCode}@filter`;

      expect(rootGroup?.id).toBe(rootTabId.toString());
      expect(rowGroup?.id).toBe(expectedRowGroupId);
      expect(rowGroup?.groupDescription).toBe('Zoom Lens');
      expect(rowGroup?.attributes?.length).toBe(1);
      expect(rowGroup?.attributes?.[0].value).toBe('Black');
      expect(nestedRowGroup?.id).toBe(expectedNestedRowGroupId);
      expect(nestedRowGroup?.groupDescription).toBe('UV Filter');
      expect(nestedRowGroup?.attributes?.[0].value).toBe('Clear');
      expect(nestedRowGroup?.subGroups).toEqual([]);
    });

    it('should preserve nested groups when a configuration contains multiple groups', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      const source = createConfigurationWithContainers();
      const nestedConfiguration = source.sapContainers?.[0].rows?.find(
        (row) => row.id === 'zoom'
      )?.configuration;
      if (!nestedConfiguration?.tabs) {
        fail();
        return;
      }
      nestedConfiguration.tabs.push({
        id: 3,
        displayName: 'Additional Lens Details',
        attributes: [structuredClone(deepInputAttribute)],
      });

      const result = serviceUnderTest.convert(source);
      const rowGroup = result.groups?.[0].subGroups?.[0];
      const expectedRowGroupId = `${Configurator.ContainerRowGroupIdPrefix}@${containerAttributeCode}@zoom`;

      expect(rowGroup?.attributes).toEqual([]);
      expect(rowGroup?.subGroups?.length).toBe(2);
      expect(rowGroup?.subGroups?.[0].id).toBe(
        `${expectedRowGroupId}@${nestedTabId}`
      );
      expect(rowGroup?.subGroups?.[0].groupDescription).toBe('Lens Details');
      expect(rowGroup?.subGroups?.[1].id).toBe(`${expectedRowGroupId}@3`);
      expect(rowGroup?.subGroups?.[1].groupDescription).toBe(
        'Additional Lens Details'
      );
    });

    it('should not attach a container with a non-matching attribute code', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      const source = createConfigurationWithContainers();
      source.sapContainers = [{ stdAttrCode: 999, rows: [] }];

      const result = serviceUnderTest.convert(source);

      expect(result.groups).toEqual([]);
    });

    it('should not log an unsupported warning for containers when the feature toggle is enabled', () => {
      featureToggles.set('productConfiguratorCPQContainer', true);
      const loggerWarn = spyOn(serviceUnderTest['logger'], 'warn');

      serviceUnderTest.convert(createConfigurationWithContainers());

      expect(loggerWarn).not.toHaveBeenCalled();
    });
  });

  describe('extractValue', () => {
    it('should fill attribute overview value with valueDisplay if available', () => {
      attr.values = singleSelectionProductValues;
      const attributeOverview = serviceUnderTest['extractValue'](
        valuepCode1,
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(valuepCode1.valueDisplay);
    });
    it('should fill attribute overview value with id if valueDisplay is not available', () => {
      attr.values = [valuepCode1WoValueDisplay];
      const attributeOverview = serviceUnderTest['extractValue'](
        valuepCode1WoValueDisplay,
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(
        valuepCode1WoValueDisplay.paV_ID.toString()
      );
    });
  });

  describe('extractValueUserInput', () => {
    it('should fill attribute overview value with userInput if available', () => {
      attr.userInput = 'Hullo';
      const attributeOverview = serviceUnderTest['extractValueUserInput'](
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(attr.userInput);
    });
  });

  describe('extractValueUserInput', () => {
    it('should fill attribute overview value with id if userInput is not available', () => {
      attr.userInput = undefined;
      attr.stdAttrCode = 23;
      const attributeOverview = serviceUnderTest['extractValueUserInput'](
        attr,
        CURRENCY
      );
      expect(attributeOverview.value).toBe(attr.stdAttrCode.toString());
    });
  });
});
