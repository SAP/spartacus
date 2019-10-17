import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfiguratorTextfieldAdapter } from './configurator-textfield.adapter';
import { ConfiguratorTextfieldConnector } from './configurator-textfield.connector';

import createSpy = jasmine.createSpy;

class MockConfiguratorTextfieldAdapter implements ConfiguratorTextfieldAdapter {
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

describe('ConfiguratorTextfieldConnector', () => {
  let service: ConfiguratorTextfieldConnector;
  const PRODUCT_CODE = 'CONF_LAPTOP';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorTextfieldAdapter,
          useClass: MockConfiguratorTextfieldAdapter,
        },
      ],
    });

    service = TestBed.get(ConfiguratorTextfieldConnector as Type<
      ConfiguratorTextfieldConnector
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter on createConfiguration', () => {
    const adapter = TestBed.get(ConfiguratorTextfieldAdapter as Type<
      ConfiguratorTextfieldAdapter
    >);

    let result;
    service.createConfiguration(PRODUCT_CODE).subscribe(res => (result = res));
    expect(result).toBe('createConfiguration' + PRODUCT_CODE);
    expect(adapter.createConfiguration).toHaveBeenCalledWith(PRODUCT_CODE);
  });
});
