import { TestBed } from '@angular/core/testing';
import { QualtricsConfig } from '../config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {
    active: false,
    multi: false,
  },
};

describe('QualtricsLoaderService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: QualtricsConfig, useValue: mockQualtricsConfig }],
    })
  );

  it('should be created', () => {
    const service: QualtricsLoaderService = TestBed.get(QualtricsLoaderService);
    expect(service).toBeTruthy();
  });
});
