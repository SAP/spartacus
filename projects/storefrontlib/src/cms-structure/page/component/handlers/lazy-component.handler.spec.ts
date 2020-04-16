import { TestBed } from '@angular/core/testing';

import { LazyComponentHandler } from './lazy-component.handler';

describe('LazyComponentHandler', () => {
  let service: LazyComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyComponentHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
