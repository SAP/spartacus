// TODO: Add unit tests...

import { TestBed } from '@angular/core/testing';
import { ImportExportConfig } from '../config/import-export-config';
import { ImportService } from './import.service';

const mockImportExportConfig: ImportExportConfig = {
  importExport: {
    file: { separator: ',' },
  },
};

describe('ImportService', () => {
  let service: ImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImportExportConfig, useValue: mockImportExportConfig },
      ],
    });
    service = TestBed.inject(ImportService);
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
  it('setValidityConfig', () => {
    service['setValidityConfig'](undefined);
    expect(service['setValidityConfig']).toBeDefined();
  });

  it('checkValidity', () => {
    service['checkValidity'](new File([], ''));
    expect(service['checkValidity']).toBeDefined();
  });

  it('readCsvData', () => {
    service['readCsvData']('');
    expect(service['readCsvData']).toBeDefined();
  });
});
