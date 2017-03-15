import { TestBed, inject } from '@angular/core/testing';
import { SvgLoaderService } from './svg-loader.service';

describe('SvgLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgLoaderService]
    });
  });

  it('should ...', inject([SvgLoaderService], (service: SvgLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
