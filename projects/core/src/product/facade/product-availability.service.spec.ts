import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
    it('should call getRealTimeStockCommand.execute with correct parameters', (done) => {
      const productUnitPairs = [
        { productCode: 'testProductCode', unitCode: 'testUnitSapCode' },
      ];
      const expectedStockData: ProductAvailabilities = {
        availabilityItems: [
          {
            productCode: 'testProductCode',
            unitAvailabilities: [
              {
                quantity: 100,
                status: 'IN_STOCK',
                unit: 'testUnitSapCode',
              },
            ],
          },
        ],
      };

      commandSpy.execute.and.returnValue(of(expectedStockData));

      service.getRealTimeStock(productUnitPairs).subscribe((stockData) => {
        expect(commandSpy.execute).toHaveBeenCalledWith(productUnitPairs);
        expect(stockData).toEqual(expectedStockData);
        done();
      });
    });

    it('should return observable of ProductAvailabilities when command executes successfully', (done) => {
      const productUnitPairs = [
        { productCode: 'testProductCode', unitCode: 'testUnitSapCode' },
      ];
      const mockStockData: ProductAvailabilities = {
        availabilityItems: [
          {
            productCode: 'testProductCode',
            unitAvailabilities: [
              {
                quantity: 100,
                status: 'IN_STOCK',
                unit: 'testUnitSapCode',
              },
            ],
          },
        ],
      };

      commandSpy.execute.and.returnValue(of(mockStockData));

      service.getRealTimeStock(productUnitPairs).subscribe((result) => {
        expect(result).toEqual(mockStockData);
        done();
      });
    });
  });
});
