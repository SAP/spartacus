import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FileReaderService } from '../file-reader.service';
import { ImportCsvFileService } from './import-csv-file.service';

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

class MockFileReaderService {
  loadTextFile(_file: File): Observable<string | ProgressEvent<FileReader>> {
    return of('');
  }
}

describe('ImportCsvFileService', () => {
  let service: ImportCsvFileService;
  let fileReaderService: FileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FileReaderService, useClass: MockFileReaderService },
      ],
    });
    service = TestBed.inject(ImportCsvFileService);
    fileReaderService = TestBed.inject(FileReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parse', () => {
    service['parse']('', separator);
    expect(service['parse']).toBeDefined();
  });

  it('should return extracted CSV string', (done: DoneFn) => {
    spyOn(fileReaderService, 'loadTextFile').and.callThrough();

    service.loadFile(mockFile, separator).subscribe(() => {
      expect(fileReaderService.loadTextFile).toHaveBeenCalledWith(mockFile);
      done();
    });
  });

  it('should parse csv data', () => {
    const result = service['parse'](mockCsvString, separator);
    expect(result).toEqual(mockLoadFileData);
  });
});
