import { TestBed } from '@angular/core/testing';
import { provideFeatureToggles } from '@spartacus/core';
import { defaultOccConfig } from './default-occ-config';
import { defaultOccConfigFactory } from './default-occ-config-factory';

describe('defaultOccConfigFactory', () => {
  it('should not modify useWithCredentials when no feature toggle is provided', () => {
    TestBed.configureTestingModule({
      providers: [],
    });

    const result = TestBed.runInInjectionContext(defaultOccConfigFactory);

    expect(result).toEqual(defaultOccConfig);
    expect(result.backend?.occ?.useWithCredentials).toBeUndefined();
  });

  it('should not modify useWithCredentials when feature toggle is disabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFeatureToggles({ enableWithCredentialsByDefault: false }),
      ],
    });

    const result = TestBed.runInInjectionContext(defaultOccConfigFactory);

    expect(result).toEqual(defaultOccConfig);
    expect(result.backend?.occ?.useWithCredentials).toBeUndefined();
  });

  it('should set useWithCredentials to true when feature toggle is enabled', () => {
    TestBed.configureTestingModule({
      providers: [
        provideFeatureToggles({ enableWithCredentialsByDefault: true }),
      ],
    });

    const result = TestBed.runInInjectionContext(defaultOccConfigFactory);

    const expectedConfig = {
      ...defaultOccConfig,
      backend: {
        ...defaultOccConfig.backend,
        occ: {
          ...defaultOccConfig.backend?.occ,
          useWithCredentials: true,
        },
      },
    };

    expect(result).toEqual(expectedConfig);
    expect(result.backend?.occ?.useWithCredentials).toBe(true);
  });
});
