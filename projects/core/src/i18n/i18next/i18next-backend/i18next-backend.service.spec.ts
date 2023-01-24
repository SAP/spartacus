import { TestBed } from '@angular/core/testing';
import { I18nextBackendService } from './i18next-backend.service';
import { I18nextHttpBackendService } from './i18next-http-backend.service';

describe('I18nextBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18nextHttpBackendService,
          useValue: { test: 'test' },
        },
      ],
    });
  });

  it('should resolve to I18nextHttpBackendService by default', () => {
    const backendService = TestBed.inject(I18nextBackendService);
    const httpBackendService = TestBed.inject(I18nextHttpBackendService);
    expect(backendService).toBe(httpBackendService);
  });
});
