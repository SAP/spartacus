import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '@spartacus/core';
import { FileValidityConfig } from '../../config/file-validity-config';
import { ImportExportService } from './import-export.service';
import createSpy = jasmine.createSpy;

class MockMessageService {
  add = createSpy();
  remove = createSpy();
}

const mockFileValidityConfig: FileValidityConfig = {
  fileValidity: {},
};

describe('ImportExportService', () => {
  let service: ImportExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GlobalMessageService, useClass: MockMessageService },
        { provide: FileValidityConfig, useValue: mockFileValidityConfig },
      ],
    });
    service = TestBed.inject(ImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
