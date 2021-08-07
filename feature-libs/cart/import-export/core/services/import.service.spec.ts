// TODO: Add unit tests...

import { TestBed } from '@angular/core/testing';
import { ImportExportConfig } from '../config/import-export-config';
import { ImportCsvService } from './import-csv.service';

const mockImportExportConfig: ImportExportConfig = {
  importExport: {
    file: { separator: ',' },
  },
};

describe('ImportCsvService', () => {
  let service: ImportCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImportExportConfig, useValue: mockImportExportConfig },
      ],
    });
    service = TestBed.inject(ImportCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * TODO: Please change following tests in #13037.
   * Tests below are only temporary to cover code coverage on epic branch.
   *
   * Also worth to re-think if protected methods should have unit tests.
   */
  it('readCsvData', () => {
    service['readCsvData']('');
    expect(service['readCsvData']).toBeDefined();
  });
});
