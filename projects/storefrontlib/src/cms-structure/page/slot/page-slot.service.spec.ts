import { TestBed } from '@angular/core/testing';

import { PageSlotService } from './page-slot.service';

describe('PageSlotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageSlotService = TestBed.get(PageSlotService);
    expect(service).toBeTruthy();
  });
});
