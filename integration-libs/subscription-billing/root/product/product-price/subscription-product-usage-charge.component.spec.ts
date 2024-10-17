import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SubscriptionProductUsageChargeComponent } from './subscription-product-usage-charge.component';
import { Pipe, PipeTransform } from '@angular/core';
import { TierUsageChargeEntry } from '../../model';
@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(_value: string): any {
    return '';
  }
}
const mockTierEntries1: TierUsageChargeEntry[] = [
  { tierStart: 0, tierEnd: 10 },
  { tierStart: 10, tierEnd: 20 },
  { tierStart: 20 },
];
const mockTierEntries2: TierUsageChargeEntry[] = [
  { tierStart: 0, tierEnd: 10 },
  { tierStart: 10, tierEnd: 20 },
  { tierStart: 20, tierEnd: 30 },
];
const mockPerUnit = [
  {
    perUnitUsageChargeEntries: [],
    includedQty: 10,
    usageUnit: { namePlural: 'KGs', name: 'KG' },
  },
  {
    perUnitUsageChargeEntries: [],
    includedQty: 1,
    usageUnit: { namePlural: 'KGs', name: 'KG' },
  },
  {
    perUnitUsageChargeEntries: [],
    usageUnit: { namePlural: 'KGs', name: 'KG' },
  },
];
const mockVolume = [
  { tierUsageChargeEntries: mockTierEntries1, overageUsageChargeEntries: [] },
];
const mockPercentage = [{ percentageUsageChargeEntries: [] }];
const mockTier = [{ tierUsageChargeEntries: mockTierEntries1 }];

const mockProduct1 = {
  sapPricePlan: {
    perUnitUsageCharges: mockPerUnit,
    percentageUsageCharges: mockPercentage,
    tierUsageCharges: mockTier,
    volumeUsageCharges: mockVolume,
  },
};
const mockProduct2 = { sapPricePlan: {} };

describe('SubscriptionProductUsageChargeComponent', () => {
  let component: SubscriptionProductUsageChargeComponent;
  let fixture: ComponentFixture<SubscriptionProductUsageChargeComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SubscriptionProductUsageChargeComponent,
        MockTranslatePipe,
      ],
      providers: [],
    }).compileComponents();
    fixture = TestBed.createComponent(SubscriptionProductUsageChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should return per unit usage charges', () => {
    component.product = mockProduct1;
    expect(component.getPerUnitUsageCharges()).toEqual(mockPerUnit);
    component.product = mockProduct2;
    expect(component.getPerUnitUsageCharges()).toEqual([]);
  });
  it('should return volumne usage charges', () => {
    component.product = mockProduct1;
    expect(component.getVolumeUsageCharges()).toEqual(mockVolume);
    component.product = mockProduct2;
    expect(component.getVolumeUsageCharges()).toEqual([]);
  });
  it('should return percentage usage charges', () => {
    component.product = mockProduct1;
    expect(component.getPercentageUsageCharges()).toEqual(mockPercentage);
    component.product = mockProduct2;
    expect(component.getPercentageUsageCharges()).toEqual([]);
  });
  it('should return tier usage charges', () => {
    component.product = mockProduct1;
    expect(component.getTierUsageCharges()).toEqual(mockTier);
    component.product = mockProduct2;
    expect(component.getTierUsageCharges()).toEqual([]);
  });
  it('should return last tier value', () => {
    expect(component.getLastTierValue(mockTierEntries1)).toEqual(0);
    expect(component.getLastTierValue(mockTierEntries2)).toEqual(30);
  });
  it('should return included quantity', () => {
    expect(component.getIncludedQuantity(mockPerUnit[0])).toEqual('10 KGs');
    expect(component.getIncludedQuantity(mockPerUnit[1])).toEqual('1 KG');
    expect(component.getIncludedQuantity(mockPerUnit[2])).toEqual('');
  });
});
