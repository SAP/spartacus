import { TestBed } from '@angular/core/testing';
import { I18nextBackendService } from './i18next-backend.service';
import { I18nextDefaultBackendService } from './i18next-default-backend.service';

describe('I18nextBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18nextDefaultBackendService,
          useValue: { test: 'test' },
        },
      ],
    });
  });

  it('should resolve to I18nextHttpBackendService by default', () => {
    const backendService = TestBed.inject(I18nextBackendService);
    expect(backendService).toEqual({ test: 'test' });
  });
});
