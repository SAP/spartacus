import { TestBed } from '@angular/core/testing';

import { S4omService } from './s4om.service';

describe('S4omService', () => {
  let service: S4omService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S4omService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
