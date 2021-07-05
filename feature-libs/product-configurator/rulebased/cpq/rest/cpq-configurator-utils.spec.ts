import { TestBed } from '@angular/core/testing';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorTestUtils } from '../../shared/testing';
import {
  attributeCheckbox,
  productConfiguration,
} from '../../shared/testing/configurator-test-data';
import { CpqConfiguratorEndpointService } from './cpq-configurator-endpoint.service';
import { CpqConfiguratorUtils } from './cpq-configurator-utils';

describe('CpqConfiguratorUtils', () => {
  let classUnderTest: CpqConfiguratorUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    classUnderTest = TestBed.inject(CpqConfiguratorEndpointService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should find first attribute correctly', () => {
    const attribute: Configurator.Attribute = CpqConfiguratorUtils.findFirstChangedAttribute(
      productConfiguration
    );
    expect(attribute).toBe(attributeCheckbox);
  });

  it('should throw an error in case no attribute is available', () => {
    const emptyConfiguration = ConfiguratorTestUtils.createConfiguration('1');
    expect(() =>
      CpqConfiguratorUtils.findFirstChangedAttribute(emptyConfiguration)
    ).toThrowError();
  });
});
