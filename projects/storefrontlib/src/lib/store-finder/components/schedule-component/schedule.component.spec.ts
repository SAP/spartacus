import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ScheduleComponent } from './schedule.component';
import { StoreDataService } from '../../services';

const WEEK_DAYS_NUMBER = 7;

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

class StoreDataServiceMock {
  getStoreOpeningTime(_location: any, date: Date): Date {
    switch (date.getDay()) {
      case 1: {
        // Monday
        return openDay1;
      }
      case 2: {
        // Tuesday
        return openDay2;
      }

      default: {
        // closed other days
        return null;
      }
    }
  }

  getStoreClosingTime(_location: any, date: Date): Date {
    switch (date.getDay()) {
      case 1: {
        // Monday
        return closeDay1;
      }
      case 2: {
        // Tuesday
        return closeDay2;
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
      declarations: [ScheduleComponent],
      providers: [{ provide: StoreDataService, useClass: StoreDataServiceMock }]
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
      location: new SimpleChange(undefined, {}, false)
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

    verifyScheduleRow(renderedScheduleRows.item(0), 'Sun', 'closed');
    verifyScheduleRow(renderedScheduleRows.item(1), 'Mon', '10:15 - 18:20');
    verifyScheduleRow(renderedScheduleRows.item(2), 'Tue', '09:30 - 17:45');
    verifyScheduleRow(renderedScheduleRows.item(3), 'Wed', 'closed');
    verifyScheduleRow(renderedScheduleRows.item(4), 'Thu', 'closed');
    verifyScheduleRow(renderedScheduleRows.item(5), 'Fri', 'closed');
    verifyScheduleRow(renderedScheduleRows.item(6), 'Sat', 'closed');
  });

  it('should not render the schedule when there is no opening hours', () => {
    // given location with no opening hours
    component.location = {};

    // when
    component.ngOnChanges({
      location: new SimpleChange(undefined, {}, false)
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
