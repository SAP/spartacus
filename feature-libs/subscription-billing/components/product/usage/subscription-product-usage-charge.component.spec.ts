import { Pipe, PipeTransform, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslatePipe, TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UsageChargeType } from '../../../root/model';
import { SubscriptionProductUsageChargeComponent } from './subscription-product-usage-charge.component';
@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(_value: string): any {
    return '';
  }
}

class MockTranslateService implements Partial<TranslationService> {
  translate(
    _key: string | string[],
    _options?: any,
    _whitespaceUntilLoaded?: boolean
  ): Observable<string> {
    return of('');
  }
}

const mockTierEntries1 = [
  { tierStart: 0, tierEnd: 10, usageChargeType: UsageChargeType.TIER },
  { tierStart: 10, tierEnd: 20, usageChargeType: UsageChargeType.TIER },
  { tierStart: 20, usageChargeType: UsageChargeType.TIER },
];
const mockTierEntries2 = [
  { tierStart: 0, tierEnd: 10, usageChargeType: UsageChargeType.TIER },
  { tierStart: 10, tierEnd: 20, usageChargeType: UsageChargeType.TIER },
  { tierStart: 20, tierEnd: 30, usageChargeType: UsageChargeType.TIER },
];
const mockPerUnit = [
  {
    usageChargeType: UsageChargeType.BLOCK,
    perUnitUsageChargeEntries: [],
    includedQty: 10,
    usageUnit: { namePlural: 'KGs', name: 'KG' },
  },
  {
    usageChargeType: UsageChargeType.BLOCK,
    perUnitUsageChargeEntries: [],
    includedQty: 1,
    usageUnit: { namePlural: 'KGs', name: 'KG' },
  },
  {
    usageChargeType: UsageChargeType.BLOCK,
    perUnitUsageChargeEntries: [],
    usageUnit: { namePlural: 'KGs', name: 'KG' },
  },
];
const mockVolume = [
  { tierUsageChargeEntries: mockTierEntries1, overageUsageChargeEntries: [] },
];
const mockPercentage = [
  {
    usageChargeType: UsageChargeType.PERCENTAGE,
    perUnitUsageChargeEntries: [],
  },
];
const mockTier = [
  {
    usageChargeType: UsageChargeType.TIER,
    tierUsageChargeEntries: mockTierEntries1,
  },
];

const mockProduct1 = signal({
  sapPricePlan: {
    perUnitUsageCharges: [...mockPerUnit, ...mockPercentage, ...mockTier],
    volumeUsageCharges: mockVolume,
  },
});
const mockProduct2 = signal({ sapPricePlan: {} });

describe('SubscriptionProductUsageChargeComponent', () => {
  let component: SubscriptionProductUsageChargeComponent;
  let fixture: ComponentFixture<SubscriptionProductUsageChargeComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SubscriptionProductUsageChargeComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslateService },
      ],
    })
      .overrideComponent(SubscriptionProductUsageChargeComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(SubscriptionProductUsageChargeComponent);
    component = fixture.componentInstance;
  }));
  it('should be created', () => {
    Object.defineProperty(component, 'product', {
      get: () => signal(null),
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should return last tier value', () => {
    Object.defineProperty(component, 'product', {
      get: () => signal(null),
    });
    fixture.detectChanges();
    expect(component.getLastTierValue(mockTierEntries1)).toEqual(0);
    expect(component.getLastTierValue(mockTierEntries2)).toEqual(30);
  });
  it('should return included quantity', () => {
    Object.defineProperty(component, 'product', {
      get: () => signal(null),
    });
    fixture.detectChanges();
    expect(component.getIncludedQuantity(mockPerUnit[0])).toEqual('10 KGs');
    expect(component.getIncludedQuantity(mockPerUnit[1])).toEqual('1 KG');
    expect(component.getIncludedQuantity(mockPerUnit[2])).toEqual('');
  });
  describe('with null product', () => {
    beforeEach(() => {
      Object.defineProperty(component, 'product', {
        get: () => signal(null),
      });
      fixture.detectChanges();
    });
    it('should return per unit usage charges', () => {
      expect(component.blockUsageCharges()).toEqual([]);
    });
    it('should return volumne usage charges', () => {
      expect(component.volumeUsageCharges()).toEqual([]);
    });
    it('should return percentage usage charges', () => {
      expect(component.percentageUsageCharges()).toEqual([]);
    });
    it('should return tier usage charges', () => {
      expect(component.tierUsageCharges()).toEqual([]);
    });
  });
  describe('with defined product with empty price plan', () => {
    beforeEach(() => {
      Object.defineProperty(component, 'product', {
        get: () => mockProduct1,
      });
      fixture.detectChanges();
    });
    it('should return per unit usage charges', () => {
      expect(component.blockUsageCharges()).toEqual(mockPerUnit);
    });
    it('should return volumne usage charges', () => {
      expect(component.volumeUsageCharges()).toEqual(mockVolume);
    });
    it('should return percentage usage charges', () => {
      expect(component.percentageUsageCharges()).toEqual(mockPercentage);
    });
    it('should return tier usage charges', () => {
      expect(component.tierUsageCharges()).toEqual(mockTier);
    });
  });
  describe('with defined product with non-empty price plan', () => {
    beforeEach(() => {
      Object.defineProperty(component, 'product', {
        get: () => mockProduct2,
      });
      fixture.detectChanges();
    });
    it('should return per unit usage charges', () => {
      expect(component.blockUsageCharges()).toEqual([]);
    });
    it('should return volumne usage charges', () => {
      expect(component.volumeUsageCharges()).toEqual([]);
    });
    it('should return percentage usage charges', () => {
      expect(component.percentageUsageCharges()).toEqual([]);
    });
    it('should return tier usage charges', () => {
      expect(component.tierUsageCharges()).toEqual([]);
    });
  });
});
