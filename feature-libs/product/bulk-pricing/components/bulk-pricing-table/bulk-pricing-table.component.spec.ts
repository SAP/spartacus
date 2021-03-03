import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkPrice } from '../../core/model/bulk-price.model';

import { BulkPricingTableComponent } from './bulk-pricing-table.component';

import { RoutingService } from '@spartacus/core';
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
class MockRoutingService implements Partial<RoutingService> {
  go() {}
  getRouterState(): Observable<any> {
    return of(mockState);
  }
}

class MockBulkPricingService implements Partial<BulkPricingService> {
  getBulkPrices(): Observable<BulkPrice[]> {
    return of([]);
  }
}

describe('BulkPricingTableComponent', () => {
  let component: BulkPricingTableComponent;
  let fixture: ComponentFixture<BulkPricingTableComponent>;
  let bulkPricingService: BulkPricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkPricingTableComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: BulkPricingService, useClass: MockBulkPricingService },
      ],
    }).compileComponents();

    bulkPricingService = TestBed.inject(BulkPricingService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkPricingTableComponent);
    component = fixture.componentInstance;
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
      spyOn(bulkPricingService, 'getBulkPrices');

      component
        .getPrices()
        .subscribe(() => {})
        .unsubscribe();

      expect(bulkPricingService.getBulkPrices).toHaveBeenCalledWith('testCode');
    });
  });
});
