import { TestBed } from '@angular/core/testing';
import { ImportService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ImportCsvService } from './import-csv.service';

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockLoadFileData = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockFile: File = new File([mockCsvString], 'mockFile', {
  type: 'text/csv',
});

const separator = ',';

class MockImportService {
  loadTextFile(_file: File): Observable<string | ProgressEvent<FileReader>> {
    return of('');
  }
}

describe('ImportCsvService', () => {
  let service: ImportCsvService;
  let importService: ImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ImportService, useClass: MockImportService }],
    });
    service = TestBed.inject(ImportCsvService);
    importService = TestBed.inject(ImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('readCsvData', () => {
    service['readCsvData']('', separator);
    expect(service['readCsvData']).toBeDefined();
  });

  it('should return extracted CSV string', (done: DoneFn) => {
    spyOn(importService, 'loadTextFile').and.callThrough();

    service.loadCsvData(mockFile, separator).subscribe(() => {
      expect(importService.loadTextFile).toHaveBeenCalledWith(mockFile);
      done();
    });
  });

  it('should convert csv to data', () => {
    const result = service.readCsvData(mockCsvString, separator);
    expect(result).toEqual(mockLoadFileData);
  });
});
