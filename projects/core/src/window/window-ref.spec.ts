import { TestBed } from '@angular/core/testing';

import { WindowRef } from './window-ref';

describe('WindowRef service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowRef = TestBed.get(WindowRef);
    expect(service).toBeTruthy();
  });
});
