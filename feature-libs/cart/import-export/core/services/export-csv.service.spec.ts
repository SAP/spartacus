import { TestBed } from '@angular/core/testing';
import { ImportExportConfig } from '../config/import-export-config';
import { ExportCsvService } from './export-csv.service';

const mockImportExportConfig: ImportExportConfig = {
  cartImportExport: {
    file: { separator: ',' },
  },
};

const mockEntries = [
  ['Sku', 'Quantity', 'Name', 'Price'],
  ['4567133', '1', 'PSM 80 A', '$12.00'],
  ['3881027', '1', 'Screwdriver BT-SD 3,6/1 Li', '$26.00'],
  ['3794609', '1', '2.4V Şarjli Tornavida, Tüp Ambalaj', '$30,200.00'],
];

const mockCsvString =
  'Sku,Quantity,Name,Price\r\n4567133,1,PSM 80 A,$12.00\r\n3881027,1,"Screwdriver BT-SD 3,6/1 Li",$26.00\r\n3794609,1,"2.4V Şarjli Tornavida, Tüp Ambalaj","$30,200.00"\r\n';

describe('ExportCsvService', () => {
  let service: ExportCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImportExportConfig, useValue: mockImportExportConfig },
      ],
    });
    service = TestBed.inject(ExportCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert array to CSV string', () => {
    expect(service.dataToCsv(mockEntries)).toBe(mockCsvString);
  });

  it('should convert array to CSV string and set maxLines limit', () => {
    const maxLines = 2;

    expect(service.dataToCsv(mockEntries, maxLines)).toBe(
      `Sku,Quantity,Name,Price\r\n4567133,1,PSM 80 A,$12.00\r\n`
    );
  });

  it('should convert data and download', () => {
    spyOn(service, 'dataToCsv').and.callThrough();
    spyOn(service, 'downloadCsv').and.callThrough();
    service.downloadCsv(service.dataToCsv(mockEntries));
    expect(service.dataToCsv).toHaveBeenCalledWith(mockEntries);
    expect(service.downloadCsv).toHaveBeenCalledWith(mockCsvString);
  });
});
