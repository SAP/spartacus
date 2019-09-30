import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfiguratorCommonsAdapter } from './configurator-commons.adapter';
import { ConfiguratorCommonsConnector } from './configurator-commons.connector';
import createSpy = jasmine.createSpy;

class MockConfiguratorCommonsAdapter implements ConfiguratorCommonsAdapter {
  readConfiguration = createSpy().and.callFake(configId =>
    of('readConfiguration' + configId)
  );

  updateConfiguration = createSpy().and.callFake(configuration =>
    of('updateConfiguration' + configuration)
  );

  createConfiguration = createSpy().and.callFake(productCode =>
    of('createConfiguration' + productCode)
  );
}

describe('ConfiguratorCommonsConnector', () => {
  let service: ConfiguratorCommonsConnector;
  const productCode = 'CONF_LAPTOP';

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
    service.createConfiguration(productCode).subscribe(res => (result = res));
    expect(result).toBe('createConfiguration' + productCode);
    expect(adapter.createConfiguration).toHaveBeenCalledWith(productCode);
  });
});
