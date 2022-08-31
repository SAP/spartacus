import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { StoreAddressStubComponent } from '../store/store-address/store-address.component.spec';
import { StoreScheduleStubComponent } from '../store/store-schedule/store-schedule.component.spec';
import { PickupDeliveryInfoComponent } from './pickup-delivery-info.component';

describe('PickupDeliveryInfoComponent', () => {
  let component: PickupDeliveryInfoComponent;
  let fixture: ComponentFixture<PickupDeliveryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PickupDeliveryInfoComponent,
        StoreAddressStubComponent,
        StoreScheduleStubComponent,
      ],
      imports: [I18nTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDeliveryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

/**
 * This is a stub of the PickupDeliveryInfoComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-pickup-delivery-info',
  template: '',
})
export class PickupDeliveryInfoStubComponent {
  @Input() storeDetails: PointOfService;
}
