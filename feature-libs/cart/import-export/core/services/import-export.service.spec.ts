// TODO: Add unit tests...

import { TestBed } from '@angular/core/testing';
import { FileValidityConfig, ImportExportConfig } from '../config';
import { ImportExportService } from './import-export.service';

const mockImportExportConfig: ImportExportConfig = {
  fileValidity: {},
  file: { separator: ',' },
};

const data = {
  products: {
    arr: [],
    expectedString: '',
  },
};

describe('ImportExportService', () => {
  let service: ImportExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FileValidityConfig, useValue: mockImportExportConfig },
      ],
    });
    service = TestBed.inject(ImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('dataToCsv', () => {
    it('should convert array to csv string', () => {
      expect(service.dataToCsv()).toEqual();
    });
  });
});
