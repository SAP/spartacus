import { TestBed, inject } from '@angular/core/testing';

import { SearchBoxComponentService } from './search-box-component.service';

describe('SearchBoxComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchBoxComponentService]
    });
  });

  it('should be created', inject([SearchBoxComponentService], (service: SearchBoxComponentService) => {
    expect(service).toBeTruthy();
  }));
});
