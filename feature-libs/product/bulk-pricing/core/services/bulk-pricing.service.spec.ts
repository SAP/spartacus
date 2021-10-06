import { TestBed } from '@angular/core/testing';
import { ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { BulkPricingService } from './bulk-pricing.service';
const mockProductCode = '2221933';

const mockBulkPrices = {
  price: {
    currencyIso: 'USD',
    formattedValue: '$4.00',
    priceType: 'BUY',
    value: 4.0,
  },
  volumePrices: [
    {
      currencyIso: 'USD',
      formattedValue: '$4.00',
      maxQuantity: 9,
      minQuantity: 1,
      priceType: 'BUY',
      value: 4.0,
    },
    {
      currencyIso: 'USD',
      formattedValue: '$3.89',
      maxQuantity: 29,
      minQuantity: 10,
      priceType: 'BUY',
      value: 3.89,
    },
    {
      currencyIso: 'USD',
      formattedValue: '$3.69',
      maxQuantity: 49,
      minQuantity: 30,
      priceType: 'BUY',
      value: 3.69,
    },
    {
      currencyIso: 'USD',
      formattedValue: '$3.49',
      maxQuantity: 99,
      minQuantity: 50,
      priceType: 'BUY',
      value: 3.49,
    },
    {
      currencyIso: 'USD',
      formattedValue: '$2.99',
      minQuantity: 100,
      priceType: 'BUY',
      value: 2.99,
    },
  ],
};

const expectedPrices = [
  {
    currencyIso: 'USD',
    formattedValue: '$4.00',
    maxQuantity: 9,
    minQuantity: 1,
    priceType: 'BUY',
    value: 4,
    formattedDiscount: '0%',
    discount: 0,
  },
  {
    currencyIso: 'USD',
    formattedValue: '$3.89',
    maxQuantity: 29,
    minQuantity: 10,
    priceType: 'BUY',
    value: 3.89,
    formattedDiscount: '-3%',
    discount: 3,
  },
  {
    currencyIso: 'USD',
    formattedValue: '$3.69',
    maxQuantity: 49,
    minQuantity: 30,
    priceType: 'BUY',
    value: 3.69,
    formattedDiscount: '-8%',
    discount: 8,
  },
  {
    currencyIso: 'USD',
    formattedValue: '$3.49',
    maxQuantity: 99,
    minQuantity: 50,
    priceType: 'BUY',
    value: 3.49,
    formattedDiscount: '-13%',
    discount: 13,
  },
  {
    currencyIso: 'USD',
    formattedValue: '$2.99',
    maxQuantity: undefined,
    minQuantity: 100,
    priceType: 'BUY',
    value: 2.99,
    formattedDiscount: '-25%',
    discount: 25,
  },
];

class MockProductService implements Partial<ProductService> {
  get(): Observable<any> {
    return of(mockBulkPrices);
  }
}

describe('BulkPricesService', () => {
  let service: BulkPricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
    });

    service = TestBed.inject(BulkPricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly format bulk prices', () => {
    let actualPrices;

    service
      .getBulkPrices(mockProductCode)
      .subscribe((formattedPrices) => {
        actualPrices = formattedPrices;
      })
      .unsubscribe();

    expect(actualPrices).toEqual(expectedPrices);
  });
});
