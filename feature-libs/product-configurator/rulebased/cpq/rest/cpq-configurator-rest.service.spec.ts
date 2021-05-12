import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorType } from 'feature-libs/product-configurator/common';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from './converters/cpq-configurator.converters';
import { CpqConfiguratorEndpointConfig } from './cpq-configurator-endpoint.config';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';
import { Cpq } from './cpq.models';
import { defaultCpqConfiguratorEndpointConfig } from './default-cpq-configurator-endpoint.config';

const productCode = 'CONF_LAPTOP';
const tabId = '2';
const tabIdUpdatedAttribute = '1';
const configId = '1234-56-7890';

const configCreatedResponse: Cpq.ConfigurationCreatedResponseData = {
  configurationId: configId,
};

const configResponseOnlyOneTab: Cpq.Configuration = {
  productSystemId: productCode,
  completed: false,
  tabs: [{ id: 1, isSelected: true }],
  attributes: [{ pA_ID: 11, stdAttrCode: 111 }],
};

const configResponseNoTab: Cpq.Configuration = {
  productSystemId: productCode,
  completed: false,
  tabs: [],
  attributes: [{ pA_ID: 11, stdAttrCode: 111 }],
};

const configResponseTab1: Cpq.Configuration = {
  productSystemId: productCode,
  completed: false,
  errorMessages: [],
  tabs: [
    { id: 1, isSelected: true },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
  ],
  attributes: [{ pA_ID: 11, stdAttrCode: 111 }],
};

const configResponseTab2: Cpq.Configuration = {
  productSystemId: productCode,
  completed: false,
  errorMessages: [],
  tabs: [
    { id: 1, isSelected: false },
    { id: 2, isSelected: true },
    { id: 3, isSelected: false },
  ],
  attributes: [{ pA_ID: 21, stdAttrCode: 211 }],
};

const configResponseTab3: Cpq.Configuration = {
  productSystemId: productCode,
  completed: false,
  errorMessages: [],
  tabs: [
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: true },
  ],
  attributes: [{ pA_ID: 31, stdAttrCode: 311 }],
};

const configResponsesByTab = {
  1: configResponseTab1,
  2: configResponseTab2,
  3: configResponseTab3,
};

const configUpdateResponse = {};
const attrCode = '111';
const attrValueId = 'abc';
const configuration: Configurator.Configuration = {
  configId: configId,
  productCode: productCode,
  owner: { key: 'A', configuratorType: ConfiguratorType.CPQ },
};
const updateAttribute: Cpq.UpdateAttribute = {
  configurationId: configId,
  standardAttributeCode: attrCode,
  changeAttributeValue: {
    attributeValueIds: attrValueId,
  },
  tabId: tabIdUpdatedAttribute,
};
const updateValue: Cpq.UpdateValue = {
  configurationId: configId,
  standardAttributeCode: attrCode,
  attributeValueId: attrValueId,
  quantity: 5,
  tabId: tabIdUpdatedAttribute,
};

describe('CpqConfiguratorRestService', () => {
  let serviceUnderTest: CpqConfiguratorRestService;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorRestAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        {
          provide: CpqConfiguratorEndpointConfig,
          useValue: defaultCpqConfiguratorEndpointConfig,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    serviceUnderTest = TestBed.inject(CpqConfiguratorRestService);

    configResponseTab1.errorMessages = [];
    configResponseTab2.errorMessages = [];
    configResponseTab3.errorMessages = [];
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a configuration and call normalizer', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    serviceUnderTest.createConfiguration(productCode).subscribe((config) => {
      expect(config.configId).toEqual(configId);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CPQ_CONFIGURATOR_NORMALIZER
      );
    });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url === `/api/configuration/v1/configurations`
      );
    });
    mockReq.flush(configCreatedResponse);

    mockDisplayConfig();
  });

  it('should read a configuration and call normalizer', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    serviceUnderTest.readConfiguration(configId).subscribe((config) => {
      expect(config.configId).toEqual(configId);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CPQ_CONFIGURATOR_NORMALIZER
      );
    });

    mockDisplayConfig();
  });

  it('should read all tabs individually for OV and merge results', () => {
    serviceUnderTest['getConfigurationWithAllTabsAndAttributes'](
      configId
    ).subscribe((mergedConfig) => {
      const expectedInput: Cpq.Configuration = {
        ...configResponseTab1,
        attributes: undefined,
        tabs: [
          {
            ...configResponseTab1.tabs[0],
            attributes: configResponseTab1.attributes,
          },
          {
            ...configResponseTab2.tabs[1],
            attributes: configResponseTab2.attributes,
          },
          {
            ...configResponseTab3.tabs[2],
            attributes: configResponseTab3.attributes,
          },
        ],
      };
      expect(mergedConfig).toEqual(expectedInput);
    });

    mockDisplayConfig();
    mockDisplayConfigWithTabId('2');
    mockDisplayConfigWithTabId('3');
  });

  it('should read all tabs individually for OV and merge results for only one group', () => {
    serviceUnderTest['getConfigurationWithAllTabsAndAttributes'](
      configId
    ).subscribe((mergedConfig) => {
      const expectedInput: Cpq.Configuration = {
        ...configResponseOnlyOneTab,
        attributes: undefined,
        tabs: [
          {
            ...configResponseOnlyOneTab.tabs[0],
            attributes: configResponseOnlyOneTab.attributes,
          },
        ],
      };
      expect(mergedConfig).toEqual(expectedInput);
    });

    mockDisplayConfig(configResponseOnlyOneTab);
  });

  it('should not read error messages from first tab ', () => {
    configResponseTab1.errorMessages = [];
    configResponseTab2.errorMessages = ['error'];
    configResponseTab3.errorMessages = ['error'];
    serviceUnderTest['getConfigurationWithAllTabsAndAttributes'](
      configId
    ).subscribe((mergedConfig) => {
      expect(mergedConfig.errorMessages.length).toEqual(1);
    });

    mockDisplayConfig();
    mockDisplayConfigWithTabId('2');
    mockDisplayConfigWithTabId('3');
  });

  it('should merge results for configuration without group', () => {
    serviceUnderTest['getConfigurationWithAllTabsAndAttributes'](
      configId
    ).subscribe((mergedConfig) => {
      const expectedInput: Cpq.Configuration = {
        ...configResponseNoTab,
        attributes: undefined,
        tabs: [
          {
            id: 0,
            attributes: configResponseOnlyOneTab.attributes,
          },
        ],
      };
      expect(mergedConfig).toEqual(expectedInput);
    });

    mockDisplayConfig(configResponseNoTab);
  });

  it('should read overview and call normalizer for config with only one group', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    serviceUnderTest.readConfigurationOverview(configId).subscribe((config) => {
      expect(config.configId).toEqual(configId);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER
      );
    });
    mockDisplayConfig(configResponseOnlyOneTab);
  });

  it('should read a configuration with tab id and call normalizer', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    serviceUnderTest.readConfiguration(configId, tabId).subscribe((config) => {
      expect(config.configId).toEqual(configId);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CPQ_CONFIGURATOR_NORMALIZER
      );
    });

    mockDisplayConfigWithTabId(tabId);
  });

  it('should call serializer, update attribute and call normalizer', () => {
    spyOn(converterService, 'convert').and.returnValue(updateAttribute);
    spyOn(converterService, 'pipeable').and.callThrough();
    serviceUnderTest.updateAttribute(configuration).subscribe((config) => {
      expect(config.configId).toEqual(configId);
      expect(converterService.convert).toHaveBeenCalledWith(
        configuration,
        CPQ_CONFIGURATOR_SERIALIZER
      );
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CPQ_CONFIGURATOR_NORMALIZER
      );
    });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PATCH' &&
        req.url ===
          `/api/configuration/v1/configurations/${configId}/attributes/${attrCode}` &&
        req.body === updateAttribute.changeAttributeValue
      );
    });
    mockReq.flush(configUpdateResponse);
    mockDisplayConfigWithTabId(tabIdUpdatedAttribute);
  });

  it('should call serializer, update value quantity and call normalizer', () => {
    spyOn(converterService, 'convert').and.returnValue(updateValue);
    spyOn(converterService, 'pipeable').and.callThrough();
    serviceUnderTest.updateValueQuantity(configuration).subscribe((config) => {
      expect(config.configId).toEqual(configId);
      expect(converterService.convert).toHaveBeenCalledWith(
        configuration,
        CPQ_CONFIGURATOR_QUANTITY_SERIALIZER
      );
      expect(converterService.pipeable).toHaveBeenCalledWith(
        CPQ_CONFIGURATOR_NORMALIZER
      );
    });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PATCH' &&
        req.url ===
          `/api/configuration/v1/configurations/${configId}/attributes/${attrCode}/attributeValues/${attrValueId}` &&
        req.body.Quantity === 5
      );
    });
    mockReq.flush(configUpdateResponse);
    mockDisplayConfigWithTabId(tabIdUpdatedAttribute);
  });

  function mockDisplayConfig(response?: Cpq.Configuration) {
    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === `/api/configuration/v1/configurations/${configId}/display`
      );
    });
    if (!response) {
      response = configResponseTab1;
    }
    mockReq.flush(response);
  }

  function mockDisplayConfigWithTabId(currentTabId: string) {
    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url ===
          `/api/configuration/v1/configurations/${configId}/display?tabId=${currentTabId}`
      );
    });
    mockReq.flush(configResponsesByTab[currentTabId]);
  }
});
