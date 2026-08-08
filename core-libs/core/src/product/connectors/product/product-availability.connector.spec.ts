import { firstValueFrom, of } from 'rxjs';
import { Mock, vi } from 'vitest';
import { ProductAvailabilities } from '../../../model/product.model';
import { ProductAvailabilityConnector } from './product-availability.connector';

describe('ProductAvailabilityConnector', () => {
  let connector: ProductAvailabilityConnector;
  let adapter: { loadRealTimeStock: Mock };

  const mockProductCode = '12345';
  const mockUnitSapCode = 'SAP001';
  const mockProductAvailabilities: ProductAvailabilities = {
    quantity: '10',
    status: 'inStock',
  };

  beforeEach(() => {
    adapter = { loadRealTimeStock: vi.fn() };
    connector = new ProductAvailabilityConnector(adapter as any);
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  it('should fetch real-time stock using the adapter', async () => {
    adapter.loadRealTimeStock.mockReturnValue(of(mockProductAvailabilities));

    const data = await firstValueFrom(
      connector.getRealTimeStock(mockProductCode, mockUnitSapCode)
    );
    expect(data).toEqual(mockProductAvailabilities);
    expect(adapter.loadRealTimeStock).toHaveBeenCalledWith(
      mockProductCode,
      mockUnitSapCode
    );
  });

  it('should handle an empty response gracefully', async () => {
    adapter.loadRealTimeStock.mockReturnValue(of(null as any));

    const data = await firstValueFrom(
      connector.getRealTimeStock(mockProductCode, mockUnitSapCode)
    );
    expect(data).toBeNull();
    expect(adapter.loadRealTimeStock).toHaveBeenCalledWith(
      mockProductCode,
      mockUnitSapCode
    );
  });
});
