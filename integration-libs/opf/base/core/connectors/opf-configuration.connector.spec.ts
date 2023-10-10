import { TestBed } from '@angular/core/testing';
import { ActiveConfiguration } from '@spartacus/opf/base/root';
import { EMPTY, Observable } from 'rxjs';
import { OpfConfigurationAdapter } from './opf-configuration.adapter';
import { OpfConfigurationConnector } from './opf-configuration.connector';

class MockOpfConfigurationAdapter implements Partial<OpfConfigurationAdapter> {
  getActiveConfigurations(): Observable<ActiveConfiguration[]> {
    return EMPTY;
  }
}

describe('OpfConfigurationConnector', () => {
  let service: OpfConfigurationConnector;
  let adapter: OpfConfigurationAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfConfigurationConnector,
        {
          provide: OpfConfigurationAdapter,
          useClass: MockOpfConfigurationAdapter,
        },
      ],
    });

    service = TestBed.inject(OpfConfigurationConnector);
    adapter = TestBed.inject(OpfConfigurationAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getActiveConfigurations should call adapter', () => {
    spyOn(adapter, 'getActiveConfigurations').and.stub();
    service.getActiveConfigurations();
    expect(adapter.getActiveConfigurations).toHaveBeenCalled();
  });
});
