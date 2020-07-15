import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, StoreDataService } from '@spartacus/core';
import { ScheduleComponent } from './schedule.component';

const WEEK_DAYS_NUMBER = 7;
const HOURS_9 = 9;
const HOURS_10 = 10;
const HOURS_17 = 17;
const HOURS_18 = 18;
const MINUTES_15 = 15;
const MINUTES_20 = 20;
const MINUTES_30 = 30;
const MINUTES_45 = 45;
const CASE_TWO = 2;
const ROW_2 = 2;
const ROW_3 = 3;
const ROW_4 = 4;
const ROW_5 = 5;
const ROW_6 = 6;

const openDay1 = new Date();
openDay1.setHours(HOURS_10);
openDay1.setMinutes(MINUTES_15);

const closeDay1 = new Date();
closeDay1.setHours(HOURS_18);
closeDay1.setMinutes(MINUTES_20);

const openDay2 = new Date();
openDay2.setHours(HOURS_9);
openDay2.setMinutes(MINUTES_30);

const closeDay2 = new Date();
closeDay2.setHours(HOURS_17);
closeDay2.setMinutes(MINUTES_45);

class StoreDataServiceMock {
  getTime(date: Date): string {
    return date.getHours() + ':' + date.getMinutes();
  }

  getStoreOpeningTime(_location: any, date: Date): string {
    switch (date.getDay()) {
      case 1: {
        // Monday
        return this.getTime(openDay1);
      }
      case CASE_TWO: {
        // Tuesday
        return this.getTime(openDay2);
      }

      default: {
        // closed other days
        return null;
      }
    }
  }

  getStoreClosingTime(_location: any, date: Date): string {
    switch (date.getDay()) {
      case 1: {
        // Monday
        return this.getTime(closeDay1);
      }
      case CASE_TWO: {
        // Tuesday
        return this.getTime(closeDay2);
      }

      default: {
        // closed other days
        return null;
      }
    }
  }
}

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let storeDataService: StoreDataService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ScheduleComponent],
      providers: [
        { provide: StoreDataService, useClass: StoreDataServiceMock },
      ],
    });

    fixture = bed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    storeDataService = bed.get(StoreDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the schedule', () => {
    // given the schedule descibed in StoreDataServiceMock
    spyOn(storeDataService, 'getStoreClosingTime').and.callThrough();
    spyOn(storeDataService, 'getStoreOpeningTime').and.callThrough();

    // when location is changed
    component.location = { openingHours: {} };
    component.ngOnChanges({
      location: new SimpleChange(undefined, {}, false),
    });
    fixture.detectChanges();

    // then verify storeDataService mock
    expect(storeDataService.getStoreClosingTime).toHaveBeenCalled();
    expect(storeDataService.getStoreOpeningTime).toHaveBeenCalled();

    // then verify the rendered schedule
    const renderedScheduleRows: HTMLCollection = fixture.debugElement.query(
      By.css('div.container')
    ).nativeElement.children;

    expect(renderedScheduleRows.length).toBe(WEEK_DAYS_NUMBER);

    verifyScheduleRow(renderedScheduleRows.item(0), 'Sun', '  -  ');
    verifyScheduleRow(renderedScheduleRows.item(1), 'Mon', '10:15 - 18:20');
    verifyScheduleRow(renderedScheduleRows.item(ROW_2), 'Tue', '9:30 - 17:45');
    verifyScheduleRow(renderedScheduleRows.item(ROW_3), 'Wed', '  -  ');
    verifyScheduleRow(renderedScheduleRows.item(ROW_4), 'Thu', '  -  ');
    verifyScheduleRow(renderedScheduleRows.item(ROW_5), 'Fri', '  -  ');
    verifyScheduleRow(renderedScheduleRows.item(ROW_6), 'Sat', '  -  ');
  });

  it('should not render the schedule when there is no opening hours', () => {
    // given location with no opening hours
    component.location = {};

    // when
    component.ngOnChanges({
      location: new SimpleChange(undefined, {}, false),
    });
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
