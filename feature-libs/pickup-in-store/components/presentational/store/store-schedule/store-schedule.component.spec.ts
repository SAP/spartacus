import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { StoreScheduleComponent } from './store-schedule.component';

describe('StoreScheduleComponent', () => {
  let component: StoreScheduleComponent;
  let fixture: ComponentFixture<StoreScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreScheduleComponent],
      imports: [I18nTestingModule, IconTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should fail gracefully when storeDetails input is undefined', () => {
    const storeDetails: PointOfService = undefined as unknown as PointOfService;
    component.storeDetails = storeDetails;
    component.ngOnChanges();
    expect(component.openingTimes).toEqual([]);
  });

  it('should fail gracefully when storeDetails input is an empty Object', () => {
    const storeDetails: PointOfService = {};
    component.storeDetails = storeDetails;
    component.ngOnChanges();
    expect(component.openingTimes).toEqual([]);
  });

  it('should fail gracefully when openingHours input is an empty Object', () => {
    const storeDetails: PointOfService = {
      openingHours: {},
    };
    component.storeDetails = storeDetails;
    component.ngOnChanges();
    expect(component.openingTimes).toEqual([]);
  });

  it('should create an openingTimes array from storeDetails input', () => {
    const storeDetails: PointOfService = {
      openingHours: {
        weekDayOpeningList: [
          {
            weekDay: 'Mon',
            closed: false,
            closingTime: { formattedHour: '18:30' },
            openingTime: { formattedHour: '09:00' },
          },
          {
            closed: false,
          },
        ],
      },
    };
    component.storeDetails = storeDetails;
    component.ngOnChanges();
    expect(component.openingTimes).toEqual([
      { weekDay: 'Mon', closed: false, openingHours: '09:00 - 18:30' },
      { weekDay: '', closed: false, openingHours: ' - ' },
    ]);
  });
});

/**
 * This is a stub of the StoreScheduleComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-store-schedule',
  template: '',
})
export class StoreScheduleStubComponent {
  @Input() storeDetails: PointOfService;
}
