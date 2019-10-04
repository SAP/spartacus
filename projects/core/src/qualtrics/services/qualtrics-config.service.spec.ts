import { TestBed } from '@angular/core/testing';
import { QualtricsConfig } from '../config/qualtrics-config';
import { QualtricsConfigService } from './qualtrics-config.service';

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {
    active: false,
    multi: false,
  },
};

describe('QualtricsConfigService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: QualtricsConfig, useValue: mockQualtricsConfig }],
    })
  );

  it('should be created', () => {
    const service: QualtricsConfigService = TestBed.get(QualtricsConfigService);
    expect(service).toBeTruthy();
  });
});
