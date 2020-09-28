import { TestBed } from '@angular/core/testing';

import { UnifiedInjector } from './unified-injector';

describe('UnifiedInjector', () => {
  let service: UnifiedInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnifiedInjector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
