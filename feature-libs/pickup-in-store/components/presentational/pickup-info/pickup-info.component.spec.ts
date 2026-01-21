import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  PointOfService,
  TranslatePipe,
} from '@spartacus/core';
import { StoreAddressComponent, StoreScheduleComponent } from '../store';
import { StoreAddressStubComponent } from '../store/store-address/store-address.component.spec';
import { StoreScheduleStubComponent } from '../store/store-schedule/store-schedule.component.spec';
import { PickupInfoComponent } from './pickup-info.component';

describe('PickupInfoComponent', () => {
  let component: PickupInfoComponent;
  let fixture: ComponentFixture<PickupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
    })
      .overrideComponent(PickupInfoComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            StoreAddressComponent,
            StoreScheduleComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            StoreAddressStubComponent,
            StoreScheduleStubComponent,
          ],
        },
      })
      .compileComponents();
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
