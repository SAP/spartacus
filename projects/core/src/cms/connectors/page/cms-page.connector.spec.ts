import { TestBed } from '@angular/core/testing';

import { CmsPageConnector } from './cms-page.connector';

describe('CmsPageConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmsPageConnector = TestBed.get(CmsPageConnector);
    expect(service).toBeTruthy();
  });
});
