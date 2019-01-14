import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreFinderListItemComponent } from './store-finder-list-item.component';

import { StoreDataService, StoreFinderService } from '@spartacus/core';

describe('StoreFinderListItemComponent', () => {
  let component: StoreFinderListItemComponent;
  let fixture: ComponentFixture<StoreFinderListItemComponent>;

  const weekday = {
    closingTime: {
      formattedHour: '20:00',
      hour: 8,
      minute: 0
    },
    openingTime: {
      formattedHour: '09:00',
      hour: 9,
      minute: 0
    },
    closed: false
  };

  const sampleStore: any = {
    address: {
      country: { isocode: 'JP' },
      line1: 'Sakuragaokacho Shibuya',
      line2: '26-01',
      phone: '+81 5141 3298',
      postalCode: '150-8512',
      town: 'Tokio'
    },
    displayName: 'Tokio Cerulean Tower Tokyu Hotel',
    geoPoint: {
      latitude: 35.656347,
      longitude: 139.69956
    },
    openingHours: {
      weekDayOpeningList: [
        {
          ...weekday,
          weekDay: 'Mon'
        },
        {
          ...weekday,
          weekDay: 'Tue'
        },
        {
          ...weekday,
          weekDay: 'Wed'
        },
        {
          ...weekday,
          weekDay: 'Thu'
        },
        {
          ...weekday,
          weekDay: 'Fri'
        },
        {
          closingTime: {
            formattedHour: '20:00',
            hour: 8,
            minute: 0
          },
          openingTime: {
            formattedHour: '10:00',
            hour: 10,
            minute: 0
          },
          closed: false,
          weekDay: 'Sat'
        },
        {
          closed: true,
          weekDay: 'Sun'
        }
      ]
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, NgbTabsetModule],
      declarations: [StoreFinderListItemComponent],
      providers: [StoreFinderService, StoreDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListItemComponent);
    component = fixture.componentInstance;
    component.location = sampleStore;
    (component as any).current_date = new Date('2018-12-05'); // override current date to make tests predictable
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get closing time', () => {
    const closeTime = component.getClosingTime(sampleStore);
    if (closeTime != null) {
      expect(closeTime.getHours()).toEqual(20);
    }
  });

  it('should get opening time', () => {
    const openTime = component.getOpeningTime(sampleStore);
    const day = component.current_date.getDay();
    switch (day) {
      case 0:
        expect(openTime.getHours()).toEqual(0);
        break;
      case 6:
        expect(openTime.getHours()).toEqual(10);
        break;
      default:
        expect(openTime.getHours()).toEqual(9);
    }
  });
});
