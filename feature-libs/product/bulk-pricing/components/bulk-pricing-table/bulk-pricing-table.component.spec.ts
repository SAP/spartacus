import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPricingTableComponent } from './bulk-pricing-table.component';

describe('BulkPricingTableComponent', () => {
  let component: BulkPricingTableComponent;
  let fixture: ComponentFixture<BulkPricingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkPricingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkPricingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
