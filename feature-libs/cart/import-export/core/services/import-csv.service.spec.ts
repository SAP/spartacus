import { TestBed } from '@angular/core/testing';
import { ImportExportConfig } from '../config/import-export-config';
import { ImportCsvService } from './import-csv.service';

const mockImportExportConfig: ImportExportConfig = {
  cartImportExport: {
    file: { separator: ',' },
  },
};

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockLoadFileData = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockFile: File = new File([mockCsvString], 'mockFile', {
  type: 'text/csv',
});

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

  it('readCsvData', () => {
    service['readCsvData']('');
    expect(service['readCsvData']).toBeDefined();
  });

  it('should return extracted CSV string', (done: DoneFn) => {
    service.loadFile(mockFile).subscribe((data) => {
      expect(data).toEqual(mockCsvString);

      done();
    });
  });

  it('should convert csv to data', () => {
    const result = service.readCsvData(mockCsvString);
    expect(result).toEqual(mockLoadFileData);
  });
});
