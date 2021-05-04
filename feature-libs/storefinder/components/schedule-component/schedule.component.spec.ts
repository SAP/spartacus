import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, PointOfService } from '@spartacus/core';
import { ScheduleComponent } from './schedule.component';

const openDay1 = new Date();
openDay1.setHours(10);
openDay1.setMinutes(15);

const closeDay1 = new Date();
closeDay1.setHours(18);
closeDay1.setMinutes(20);

const openDay2 = new Date();
openDay2.setHours(9);
openDay2.setMinutes(30);

const closeDay2 = new Date();
closeDay2.setHours(17);
closeDay2.setMinutes(45);

const mockLocation: PointOfService = {
  openingHours: {
    weekDayOpeningList: [
      { closed: true, weekDay: 'Sun' },
      {
        closed: false,
        weekDay: 'Mon',
        openingTime: { formattedHour: '09:00' },
        closingTime: { formattedHour: '20:00' },
      },
      {
        closed: false,
        weekDay: 'Tue',
        openingTime: { formattedHour: '09:00' },
        closingTime: { formattedHour: '20:00' },
      },
      {
        closed: false,
        weekDay: 'Wed',
        openingTime: { formattedHour: '09:00' },
        closingTime: { formattedHour: '20:00' },
      },
    ],
  },
};

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ScheduleComponent],
    });

    fixture = bed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the schedule', () => {
    component.location = mockLocation;
    component.ngOnInit();
    fixture.detectChanges();

    // then verify the rendered schedule
    const renderedScheduleRows: HTMLCollection = fixture.debugElement.query(
      By.css('div.container')
    ).nativeElement.children;

    verifyScheduleRow(
      renderedScheduleRows.item(0),
      'Sun',
      'storeFinder.closed'
    );
    verifyScheduleRow(renderedScheduleRows.item(1), 'Mon', '09:00 - 20:00');
    verifyScheduleRow(renderedScheduleRows.item(2), 'Tue', '09:00 - 20:00');
    verifyScheduleRow(renderedScheduleRows.item(3), 'Wed', '09:00 - 20:00');
  });

  it('should not render the schedule when there is no opening hours', () => {
    // given location with no opening hours
    component.location = {};

    // when
    component.ngOnInit();
    fixture.detectChanges();

    // then verify the schedule has not been rendered
    expect(fixture.debugElement.query(By.css('div.container'))).toBeNull();
  });
});

function verifyScheduleRow(
  element: Element,
  expectedDayValue: string,
  expectedScheduleValue: string
): void {
  expect(element.children[0].innerHTML).toContain(expectedDayValue);
  expect(element.children[1].innerHTML).toContain(expectedScheduleValue);
}
