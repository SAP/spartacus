import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkPrice } from '../../core/model/bulk-price.model';

import { BulkPricingTableComponent } from './bulk-pricing-table.component';

import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { BulkPricingService } from '../../core/services/bulk-pricing.service';
import { Observable, of } from 'rxjs';

const mockState = {
  state: {
    params: {
      productCode: 'testCode',
    },
  },
};

const mockTierWithMaxQuantity: BulkPrice = {
  minQuantity: 1,
  maxQuantity: 5,
  value: 200,
  discount: 20,
};

const mockTierWithoutMaxQuantity: BulkPrice = {
  minQuantity: 1,
  value: 200,
  discount: 20,
};

const mockBulkPrices = [
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

class MockRoutingService implements Partial<RoutingService> {
  getRouterState(): Observable<any> {
    return of(mockState);
  }
}

class MockBulkPricingService implements Partial<BulkPricingService> {
  getBulkPrices(): Observable<BulkPrice[]> {
    return of(mockBulkPrices);
  }
}

describe('BulkPricingTableComponent', () => {
  let component: BulkPricingTableComponent;
  let fixture: ComponentFixture<BulkPricingTableComponent>;
  let bulkPricingService: BulkPricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [BulkPricingTableComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BulkPricingService, useClass: MockBulkPricingService },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkPricingTableComponent);
    component = fixture.componentInstance;
    bulkPricingService = TestBed.inject(BulkPricingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formatQuantity', () => {
    it('should format mockTierWithMaxQuantity', () => {
      const expectedFormattedQuantity = '1 - 5';
      const formattedQuantity = component.formatQuantity(
        mockTierWithMaxQuantity
      );

      expect(formattedQuantity).toBe(expectedFormattedQuantity);
    });

    it('should format mockTierWithoutMaxQuantity', () => {
      const expectedFormattedQuantity = '1+';
      const formattedQuantity = component.formatQuantity(
        mockTierWithoutMaxQuantity
      );

      expect(formattedQuantity).toBe(expectedFormattedQuantity);
    });
  });

  describe('getPrices', () => {
    it('should call getBulkPrices with a right parameter', () => {
      spyOn(bulkPricingService, 'getBulkPrices').and.callThrough();

      component
        .getPrices()
        .subscribe(() => {})
        .unsubscribe();

      expect(bulkPricingService.getBulkPrices).toHaveBeenCalledWith('testCode');
    });
  });
});
