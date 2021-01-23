import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkPrice } from '../../core/model/bulk-price.model';

import { BulkPricingTableComponent } from './bulk-pricing-table.component';

describe('BulkPricingTableComponent', () => {
  let component: BulkPricingTableComponent;
  let fixture: ComponentFixture<BulkPricingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkPricingTableComponent],
    }).compileComponents();
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
    const mockTierWithMaxQuantity: BulkPrice = {
      minQuantity : 1,
      maxQuantity : 5,
      value: 200,
      discount: 20
    };

    const mockTierWithoutMaxQuantity = {
      minQuantity : 1
    };

    it('should bla', () => {

      const expectedFormattedQuantity = component.formatQuantity(mockTierWithMaxQuantity)
      expect(component).toBeTruthy();
    });
  });

});
