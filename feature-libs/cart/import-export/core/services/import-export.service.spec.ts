// TODO: Add unit tests...

import { TestBed } from '@angular/core/testing';
import { ImportExportConfig } from '../config/import-export-config';
import { ImportExportService } from './import-export.service';

const mockImportExportConfig: ImportExportConfig = {
  importExport: {
    file: { separator: ',' },
  },
};

const products = {
  arr: [
    {
      sku: 'Sku',
      quantity: 'Quantity',
      name: 'Name',
      price: 'Price',
    },
    {
      sku: '4567133',
      quantity: 1,
      name: 'PSM 80 A',
      price: '$12.00',
    },
    {
      sku: '3881027',
      quantity: 1,
      name: 'Screwdriver BT-SD 3,6/1 Li',
      price: '$26.00',
    },
    {
      sku: '3794609',
      quantity: 1,
      name: '2.4V Şarjli Tornavida, Tüp Ambalaj',
      price: '$30,200.00',
    },
  ],
  csvString:
    '"Sku","Quantity","Name","Price"\r\n"4567133","1","PSM 80 A","$12.00"\r\n"3881027","1","Screwdriver BT-SD 3,6/1 Li","$26.00"\r\n"3794609","1","2.4V Şarjli Tornavida, Tüp Ambalaj","$30,200.00"\r\n',
};

describe('ImportExportService', () => {
  let service: ImportExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImportExportConfig, useValue: mockImportExportConfig },
      ],
    });
    service = TestBed.inject(ImportExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('dataToCsv', () => {
    it('should convert array to csv string', () => {
      expect(service.dataToCsv(products.arr)).toBe(products.csvString);
    });
  });
});
