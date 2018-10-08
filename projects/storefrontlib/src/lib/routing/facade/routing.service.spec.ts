import { TestBed, inject } from '@angular/core/testing';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingService]
    });
  });

  it('should be created', inject([RoutingService], (service: RoutingService) => {
    expect(service).toBeTruthy();
  }));
});
