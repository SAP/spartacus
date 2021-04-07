import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '@spartacus/core';
import { ImportExportConfig } from '../../config/import-export-config.service';
import { ImportExportService } from './import-export.service';
import createSpy = jasmine.createSpy;

class MockMessageService {
  add = createSpy();
  remove = createSpy();
}

const mockFileValidityConfig: ImportExportConfig = {
  fileValidity: {},
};

describe('ImportExportService', () => {
  let service: ImportExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GlobalMessageService, useClass: MockMessageService },
        { provide: ImportExportConfig, useValue: mockFileValidityConfig },
      ],
    });
    service = TestBed.inject(ImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
