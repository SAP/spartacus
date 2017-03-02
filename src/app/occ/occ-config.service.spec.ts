import { TestBed, inject } from '@angular/core/testing';
import { OccConfigService } from './occ-config.service';

describe('OccConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccConfigService]
    });
  });

  it('should ...', inject([OccConfigService], (service: OccConfigService) => {
    expect(service).toBeTruthy();
  }));
});
