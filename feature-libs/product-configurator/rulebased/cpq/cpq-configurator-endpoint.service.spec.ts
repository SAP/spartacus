import { TestBed } from '@angular/core/testing';
import { HEADER_ATTR_CPQ_CONFIGURATOR } from '../root/interceptor/cpq-configurator-rest.interceptor';
import { CpqConfiguratorEndpointService } from './cpq-configurator-endpoint.service';

describe('CpqConfiguratorEndpointService', () => {
  let classUnderTest: CpqConfiguratorEndpointService;
  const CONFIG_ID = 'c-123';
  const ATTR_ID = 'a-456';
  const VALUE_ID = 'v-789';
  const TAB_ID = '5';

  beforeEach(() => {
    classUnderTest = TestBed.inject(CpqConfiguratorEndpointService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return CPQ Marker header attribute', () => {
    expect(
      classUnderTest.cpqHeaders.headers.has(HEADER_ATTR_CPQ_CONFIGURATOR)
    ).toBe(true);
  });

  it('should build configurations init url', () => {
    expect(classUnderTest.buildConfigurationInitUrl()).toBe(
      '/api/configuration/v1/configurations'
    );
  });

  it('should build configurations display url', () => {
    expect(classUnderTest.buildConfigurationDisplayUrl(CONFIG_ID)).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/display`
    );
  });

  it('should build configurations display url with tab id', () => {
    expect(classUnderTest.buildConfigurationDisplayUrl(CONFIG_ID, TAB_ID)).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/display?tabId=${TAB_ID}`
    );
  });

  it('should build configurations update attribute url', () => {
    expect(classUnderTest.buildAttributeUpdateUrl(CONFIG_ID, ATTR_ID)).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/attributes/${ATTR_ID}`
    );
  });

  it('should build configurations update value url', () => {
    expect(
      classUnderTest.buildValueUpdateUrl(CONFIG_ID, ATTR_ID, VALUE_ID)
    ).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/attributes/${ATTR_ID}/attributeValues/${VALUE_ID}`
    );
  });
});
