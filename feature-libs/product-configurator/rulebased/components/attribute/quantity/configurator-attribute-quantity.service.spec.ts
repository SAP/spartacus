import { TestBed } from '@angular/core/testing';

import { ConfiguratorAttributeQuantityService } from './configurator-attribute-quantity.service';

describe('ConfiguratorAttributeQuantityService', () => {
  let service: ConfiguratorAttributeQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguratorAttributeQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
