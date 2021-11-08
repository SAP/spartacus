import { TestBed } from '@angular/core/testing';
import { ProductData } from '@spartacus/storefront';
import { ImportProductsFromCsvService } from './import-products-from-csv.service';

const mockFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

describe('ImportProductsFromCsvService', () => {
  let service: ImportProductsFromCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportProductsFromCsvService],
    });
    service = TestBed.inject(ImportProductsFromCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if data is parsable', () => {
    const result = service.isDataParsableToProducts(mockFileData);
    expect(result).toBe(true);
  });

  it('should return false if data is not parsable', () => {
    const result = service.isDataParsableToProducts([['abc', '11.22']]);
    expect(result).toBe(false);
  });

  it('should convert csv extracted data according to product and quantity', () => {
    expect(service.csvDataToProduct(mockFileData)).toEqual(mockProductData);
  });
});
