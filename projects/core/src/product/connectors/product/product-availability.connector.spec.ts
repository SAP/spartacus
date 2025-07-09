import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductAvailabilities } from '../../../model/product.model';
import { ProductAvailabilityAdapter } from './prduct-availability.adapter';
import { ProductAvailabilityConnector } from './product-availability.connector';

describe('ProductAvailabilityConnector', () => {
  let connector: ProductAvailabilityConnector;
  let adapter: jasmine.SpyObj<ProductAvailabilityAdapter>;

  const mockProductCode = '12345';
  const mockUnitSapCode = 'SAP001';
  const mockProductAvailabilities: ProductAvailabilities = {
    availabilityItems: [
      {
        productCode: mockProductCode,
        unitAvailabilities: [
          {
            quantity: 10,
            status: 'inStock',
            unit: mockUnitSapCode,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    const adapterSpy = jasmine.createSpyObj('ProductAvailabilityAdapter', [
      'loadRealTimeStock',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductAvailabilityConnector,
        { provide: ProductAvailabilityAdapter, useValue: adapterSpy },
      ],
    });

    connector = TestBed.inject(ProductAvailabilityConnector);
    adapter = TestBed.inject(
      ProductAvailabilityAdapter
    ) as jasmine.SpyObj<ProductAvailabilityAdapter>;
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  it('should fetch real-time stock using the adapter', (done) => {
    adapter.loadRealTimeStock.and.returnValue(of(mockProductAvailabilities));

    connector
      .getRealTimeStock([
        { productCode: mockProductCode, unitCode: mockUnitSapCode },
      ])
      .subscribe((data) => {
        expect(data).toEqual(mockProductAvailabilities);
        expect(adapter.loadRealTimeStock).toHaveBeenCalledWith(
          mockProductCode,
          mockUnitSapCode
        );
        done();
      });
  });

  it('should handle an empty response gracefully', (done) => {
    adapter.loadRealTimeStock.and.returnValue(of({ availabilityItems: [] }));

    connector
      .getRealTimeStock([
        { productCode: mockProductCode, unitCode: mockUnitSapCode },
      ])
      .subscribe((data) => {
        expect(data).toEqual({ availabilityItems: [] });
        expect(adapter.loadRealTimeStock).toHaveBeenCalledWith(
          mockProductCode,
          mockUnitSapCode
        );
        done();
      });
  });
});
