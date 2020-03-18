import { TestBed } from '@angular/core/testing';
import { FormErrorsService } from './form-errors.service';
import { GlobalMessageService } from '@spartacus/core';

class MockGlobalMessageService {
  add = jasmine.createSpy();
}

describe('FormErrors Service', () => {
  let service: FormErrorsService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormErrorsService,
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    });

    service = TestBed.inject(FormErrorsService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify', () => {
    service.notify();
    expect(globalMessageService.add).toHaveBeenCalled();
  });
});
