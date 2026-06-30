import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { Command, CommandService } from '../../../src/util/command-query';
import { ProductAvailabilities } from '../../model/product.model';
import { ProductAvailabilityConnector } from '../connectors';
import { ProductAvailabilityService } from './product-availability.service';

describe('ProductAvailabilityService', () => {
  let service: ProductAvailabilityService;
  let connector: ProductAvailabilityConnector;
  let commandService: CommandService;
  let commandSpy: Command<any, ProductAvailabilities>;

  beforeEach(() => {
    commandSpy = { execute: vi.fn() };
    connector = { 
      getRealTimeStock: vi.fn() };
    commandService = { create: vi.fn() };

    commandService.create.mockReturnValue(commandSpy);

    TestBed.configureTestingModule({
      providers: [
        ProductAvailabilityService,
        { provide: ProductAvailabilityConnector, useValue: connector },
        { provide: CommandService, useValue: commandService },
      ],
    });

    service = TestBed.inject(ProductAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRealTimeStock', () => {
    it('should call getRealTimeStockCommand.execute with correct parameters', async () => {
      const productCode = 'testProductCode';
      const unitSapCode = 'testUnitSapCode';
      const expectedStockData: ProductAvailabilities = {
        quantity: '100',
        status: 'IN_STOCK',
      };

      connector.getRealTimeStock.mockReturnValue(of(expectedStockData));
      commandSpy.execute.mockReturnValue(of(expectedStockData));

      const stockData = await firstValueFrom(
        service.getRealTimeStock(productCode, unitSapCode)
      );
      expect(commandSpy.execute).toHaveBeenCalledWith({ productCode, unitSapCode });
      expect(stockData).toEqual(expectedStockData);
    });

    it('should return observable of ProductAvailabilities when command executes successfully', async () => {
      const productCode = 'testProductCode';
      const unitSapCode = 'testUnitSapCode';
      const mockStockData: ProductAvailabilities = {
        quantity: '100',
        status: 'IN_STOCK',
      };

      connector.getRealTimeStock.mockReturnValue(of(mockStockData));
      commandSpy.execute.mockReturnValue(of(mockStockData));

      const result = await firstValueFrom(
        service.getRealTimeStock(productCode, unitSapCode)
      );
      expect(result).toEqual(mockStockData);
    });
  });
});
