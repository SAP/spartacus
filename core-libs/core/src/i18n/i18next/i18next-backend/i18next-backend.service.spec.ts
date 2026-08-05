import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { InitOptions } from 'i18next';
import { I18nextBackendInitializer } from './i18next-backend.initializer';
import { I18nextBackendService } from './i18next-backend.service';

class TestBackendInitializer implements Partial<I18nextBackendInitializer> {
  hasMatch = () => true;

  initialize = vi
    .fn()
    .mockReturnValue({ backend: { loadPath: 'testLoadPath' } } as InitOptions);
}

describe('I18nextBackendService', () => {
  let testBackendInitializer: TestBackendInitializer;
  let service: I18nextBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestBackendInitializer,
        {
          provide: I18nextBackendInitializer,
          useExisting: TestBackendInitializer,
          multi: true,
        },
      ],
    });

    testBackendInitializer = TestBed.inject(TestBackendInitializer);
    service = TestBed.inject(I18nextBackendService);
  });

  it('should use a backend initializer when it is applicable', () => {
    vi.spyOn(testBackendInitializer, 'hasMatch').mockReturnValue(true);

    const result = service.initialize();

    expect(result).toEqual({ backend: { loadPath: 'testLoadPath' } });
    expect(testBackendInitializer.initialize).toHaveBeenCalled();
    expect(testBackendInitializer.hasMatch).toHaveBeenCalled();
  });

  it('should not use a backend initializer when it is not applicable', () => {
    vi.spyOn(testBackendInitializer, 'hasMatch').mockReturnValue(false);

    const result = service.initialize();

    expect(result).toEqual({});
    expect(testBackendInitializer.initialize).not.toHaveBeenCalled();
  });
});
