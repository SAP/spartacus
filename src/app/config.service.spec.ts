import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
  });

  it('should ...', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
