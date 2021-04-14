import { TestBed } from '@angular/core/testing';
import { MARKER_HEADER_CPQ_CONFIGURATOR } from '@spartacus/product-configurator/rulebased/root';
import { CpqConfiguratorEndpointConfig } from './cpq-configurator-endpoint.config';
import { CpqConfiguratorEndpointService } from './cpq-configurator-endpoint.service';
import { defaultCpqConfiguratorEndpointConfig } from './default-cpq-configurator-endpoint.config';

describe('CpqConfiguratorEndpointService', () => {
  let classUnderTest: CpqConfiguratorEndpointService;
  const CONFIG_ID = 'c-123';
  const ATTR_ID = 'a-456';
  const VALUE_ID = 'v-789';
  const TAB_ID = '5';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CpqConfiguratorEndpointConfig,
          useValue: defaultCpqConfiguratorEndpointConfig,
        },
      ],
    });
    classUnderTest = TestBed.inject(CpqConfiguratorEndpointService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return CPQ Marker header attribute', () => {
    expect(
      classUnderTest.CPQ_MARKER_HEADER.headers.has(
        MARKER_HEADER_CPQ_CONFIGURATOR
      )
    ).toBe(true);
  });

  it('should build configurations init url', () => {
    expect(classUnderTest.buildUrl('configurationInit')).toBe(
      '/api/configuration/v1/configurations'
    );
  });

  it('should build configurations display url', () => {
    expect(
      classUnderTest.buildUrl('configurationDisplay', { configId: CONFIG_ID })
    ).toBe(`/api/configuration/v1/configurations/${CONFIG_ID}/display`);
  });

  it('should build configurations display url with tab id', () => {
    expect(
      classUnderTest.buildUrl('configurationDisplay', { configId: CONFIG_ID }, [
        { name: 'tabId', value: TAB_ID },
      ])
    ).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/display?tabId=${TAB_ID}`
    );
  });

  it('should build configurations update attribute url', () => {
    expect(
      classUnderTest.buildUrl('attributeUpdate', {
        configId: CONFIG_ID,
        attributeCode: ATTR_ID,
      })
    ).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/attributes/${ATTR_ID}`
    );
  });

  it('should build configurations update value url', () => {
    expect(
      classUnderTest.buildUrl('valueUpdate', {
        configId: CONFIG_ID,
        attributeCode: ATTR_ID,
        valueCode: VALUE_ID,
      })
    ).toBe(
      `/api/configuration/v1/configurations/${CONFIG_ID}/attributes/${ATTR_ID}/attributeValues/${VALUE_ID}`
    );
  });
});
