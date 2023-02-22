import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { StoreAddressStubComponent } from '../store/store-address/store-address.component.spec';
import { StoreScheduleStubComponent } from '../store/store-schedule/store-schedule.component.spec';
import { PickupInfoComponent } from './pickup-info.component';

describe('PickupInfoComponent', () => {
  let component: PickupInfoComponent;
  let fixture: ComponentFixture<PickupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PickupInfoComponent,
        StoreAddressStubComponent,
        StoreScheduleStubComponent,
      ],
      imports: [I18nTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

/**
 * This is a stub of the PickupInfoComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-pickup-info',
  template: '',
})
export class PickupInfoStubComponent {
  @Input() storeDetails: PointOfService;
}
