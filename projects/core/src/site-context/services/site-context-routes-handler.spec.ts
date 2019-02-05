import { TestBed } from '@angular/core/testing';

import { SiteContextRoutesHandler } from './site-context-routes-handler.';

describe('SiteContextRoutesHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteContextRoutesHandler = TestBed.get(
      SiteContextRoutesHandler
    );
    expect(service).toBeTruthy();
  });
});
