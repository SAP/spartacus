import { TestBed } from '@angular/core/testing';
import { FileOptions } from '../../models/file';
import { ExportCsvService } from './export-csv.service';
import { ExportService } from './export.service';

const separator = ',';
const fileOptions: FileOptions = {
  fileName: 'data',
  extension: 'csv',
  type: 'string',
};

const mockEntries = [
  ['Sku', 'Quantity', 'Name', 'Price'],
  ['4567133', '1', 'PSM 80 A', '$12.00'],
  ['3881027', '1', 'Screwdriver BT-SD 3,6/1 Li', '$26.00'],
  ['3794609', '1', '2.4V Şarjli Tornavida, Tüp Ambalaj', '$30,200.00'],
];

const mockCsvString =
  'Sku,Quantity,Name,Price\r\n4567133,1,PSM 80 A,$12.00\r\n3881027,1,"Screwdriver BT-SD 3,6/1 Li",$26.00\r\n3794609,1,"2.4V Şarjli Tornavida, Tüp Ambalaj","$30,200.00"\r\n';

class MockExportService {
  download(_fileContent: string, _fileOptions: FileOptions) {}
}

describe('ExportCsvService', () => {
  let service: ExportCsvService;
  let exportService: ExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ExportService, useClass: MockExportService }],
    });
    service = TestBed.inject(ExportCsvService);
    exportService = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert array to csv string', () => {
    expect(service.dataToCsv(mockEntries, separator)).toBe(mockCsvString);
  });

  it('should convert data and download', () => {
    spyOn(service, 'dataToCsv').and.callThrough();
    spyOn(service, 'downloadCsv').and.callThrough();
    spyOn(exportService, 'download').and.callThrough();
    service.downloadCsv(mockEntries, separator, fileOptions);
    expect(service.dataToCsv).toHaveBeenCalledWith(mockEntries, separator);
    expect(exportService.download).toHaveBeenCalledWith(
      service.dataToCsv(mockEntries, separator),
      fileOptions
    );
  });
});
