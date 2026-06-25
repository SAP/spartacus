import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { Command, CommandService } from '../../../src/util/command-query';
import { ProductAvailabilities } from '../../model/product.model';
import { ProductAvailabilityConnector } from '../connectors';
import { ProductAvailabilityService } from './product-availability.service';

describe('ProductAvailabilityService', () => {
  let service: ProductAvailabilityService;
  let connector: jasmine.SpyObj<ProductAvailabilityConnector>;
  let commandService: jasmine.SpyObj<CommandService>;
  let commandSpy: jasmine.SpyObj<Command<any, ProductAvailabilities>>;

  beforeEach(() => {
    commandSpy = jasmine.createSpyObj('Command', ['execute']);
    connector = jasmine.createSpyObj('ProductAvailabilityConnector', [
      'getRealTimeStock',
    ]);
    commandService = jasmine.createSpyObj('CommandService', ['create']);

    commandService.create.and.returnValue(commandSpy);

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

      connector.getRealTimeStock.and.returnValue(of(expectedStockData));
      commandSpy.execute.and.returnValue(of(expectedStockData));

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

      connector.getRealTimeStock.and.returnValue(of(mockStockData));
      commandSpy.execute.and.returnValue(of(mockStockData));

      const result = await firstValueFrom(
        service.getRealTimeStock(productCode, unitSapCode)
      );
      expect(result).toEqual(mockStockData);
    });
  });
});
