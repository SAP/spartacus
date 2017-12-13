import { TestBed, inject } from '@angular/core/testing';
import { ComponentMapperService } from './component-mapper.service';

describe('ComponentMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentMapperService]
    });
  });

  it('should ...', inject([ComponentMapperService], (service: ComponentMapperService) => {
    expect(service).toBeTruthy();
  }));
});
