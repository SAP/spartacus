import { TestBed } from '@angular/core/testing';
import { FileOptions } from '@spartacus/storefront';
import { ExportService } from './export.service';

const fileOptions: FileOptions = {
  fileName: 'data',
  extension: 'csv',
  type: 'string',
};

const fileContent = 'text to save';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download the file', () => {
    service.download(fileContent, fileOptions);
  });
});
