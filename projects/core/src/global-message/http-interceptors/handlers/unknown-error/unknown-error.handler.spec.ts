import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Priority } from '@spartacus/core';
import { GlobalMessageService } from '../../../facade';
import { UnknownErrorHandler } from './unknown-error.handler';

class MockGlobalMessageService {}
describe('UnknownErrorHandler', () => {
  let service: UnknownErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnknownErrorHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(UnknownErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should match -1 responseStatus ', () => {
    expect(service.hasMatch({} as HttpErrorResponse)).toBeTruthy();
  });

  it('should have fallback priority ', () => {
    expect(service.getPriority()).toBe(Priority.FALLBACK);
  });
});
