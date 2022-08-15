import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxPickupDeliveryInfoComponent } from './pickup-delivery-info.component';

describe('CxPickupDeliveryInfoComponent', () => {
  let component: CxPickupDeliveryInfoComponent;
  let fixture: ComponentFixture<CxPickupDeliveryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CxPickupDeliveryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CxPickupDeliveryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
