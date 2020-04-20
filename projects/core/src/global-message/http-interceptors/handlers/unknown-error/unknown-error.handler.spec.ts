import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { UnknownErrorHandler } from './unknown-error.handler';
import { Priority } from '@spartacus/core';

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
    expect(service.hasMatch({ status: -1 })).toBeTruthy();
  });

  it('should have fallback priority ', () => {
    expect(service.getPriority()).toBe(Priority.FALLBACK);
  });
});
