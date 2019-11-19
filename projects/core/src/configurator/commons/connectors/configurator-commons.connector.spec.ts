import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Configurator } from '../../../model/configurator.model';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';
import { ConfiguratorCommonsConnector } from './configurator-commons.connector';
import createSpy = jasmine.createSpy;

class MockConfiguratorCommonsAdapter implements ConfiguratorCommonsAdapter {
  readPriceSummary = createSpy().and.callFake(configId =>
    of('readPriceSummary' + configId)
  );

  readConfiguration = createSpy().and.callFake(configId =>
    of('readConfiguration' + configId)
  );

  updateConfiguration = createSpy().and.callFake(configuration =>
    of('updateConfiguration' + configuration.configId)
  );

  createConfiguration = createSpy().and.callFake(productCode =>
    of('createConfiguration' + productCode)
  );
}

describe('ConfiguratorCommonsConnector', () => {
  let service: ConfiguratorCommonsConnector;
  const PRODUCT_CODE = 'CONF_LAPTOP';
  const CONFIG_ID = '1234-56-7890';
  const GROUP_ID = 'GROUP1';
  const productConfiguration: Configurator.Configuration = {
    configId: CONFIG_ID,
    productCode: PRODUCT_CODE,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorCommonsAdapter,
          useClass: MockConfiguratorCommonsAdapter,
        },
      ],
    });

    service = TestBed.get(ConfiguratorCommonsConnector as Type<
      ConfiguratorCommonsConnector
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter on createConfiguration', () => {
    const adapter = TestBed.get(ConfiguratorCommonsAdapter as Type<
      ConfiguratorCommonsAdapter
    >);

    let result;
    service.createConfiguration(PRODUCT_CODE).subscribe(res => (result = res));
    expect(result).toBe('createConfiguration' + PRODUCT_CODE);
    expect(adapter.createConfiguration).toHaveBeenCalledWith(PRODUCT_CODE);
  });

  it('should call adapter on readConfiguration', () => {
    const adapter = TestBed.get(ConfiguratorCommonsAdapter as Type<
      ConfiguratorCommonsAdapter
    >);

    let result;
    service
      .readConfiguration(CONFIG_ID, GROUP_ID)
      .subscribe(res => (result = res));
    expect(result).toBe('readConfiguration' + CONFIG_ID);
    expect(adapter.readConfiguration).toHaveBeenCalledWith(CONFIG_ID, GROUP_ID);
  });

  it('should call adapter on updateConfiguration', () => {
    const adapter = TestBed.get(ConfiguratorCommonsAdapter as Type<
      ConfiguratorCommonsAdapter
    >);

    let result;
    service
      .updateConfiguration(productConfiguration)
      .subscribe(res => (result = res));
    expect(result).toBe('updateConfiguration' + CONFIG_ID);
    expect(adapter.updateConfiguration).toHaveBeenCalledWith(
      productConfiguration
    );
  });

  it('should call adapter on readConfigurationPrice', () => {
    const adapter = TestBed.get(ConfiguratorCommonsAdapter as Type<
      ConfiguratorCommonsAdapter
    >);

    let result;
    service.readPriceSummary(CONFIG_ID).subscribe(res => (result = res));
    expect(result).toBe('readPriceSummary' + CONFIG_ID);
    expect(adapter.readPriceSummary).toHaveBeenCalledWith(CONFIG_ID);
  });
});
