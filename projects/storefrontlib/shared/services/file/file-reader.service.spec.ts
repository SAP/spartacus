import { TestBed } from '@angular/core/testing';
import { FileReaderService } from './file-reader.service';

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockFile: File = new File([mockCsvString], 'mockFile', {
  type: 'text/csv',
});

describe('FileReaderService', () => {
  let service: FileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return extracted CSV string', (done: DoneFn) => {
    service.loadTextFile(mockFile).subscribe((data) => {
      expect(data).toEqual(mockCsvString);

      done();
    });
  });
});
