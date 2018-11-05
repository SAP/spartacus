import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { combineReducers, StoreModule } from '@ngrx/store';

import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreFinderSearchComponent } from '../../store-finder-search/store-finder-search.component';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { StoreFinderListItemComponent } from './store-finder-list-item.component';
import { StoreFinderListComponent } from '../store-finder-list.component';

import * as fromReducers from '../../../store';
import * as fromRoot from '../../../../routing/store';
import * as fromServices from '../../../services/index';

describe('StoreFinderListItemComponent', () => {
  let component: StoreFinderListItemComponent;
  let fixture: ComponentFixture<StoreFinderListItemComponent>;
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
          closed: false,
          weekDay: 'Mon'
        },
        {
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
          closed: false,
          weekDay: 'Tue'
        },
        {
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
          closed: false,
          weekDay: 'Wed'
        },
        {
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
          closed: false,
          weekDay: 'Thu'
        },
        {
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
          closed: false,
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
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbTabsetModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StoreFinderListItemComponent,
        StoreFinderListComponent,
        StoreFinderSearchComponent,
        StoreFinderMapComponent
      ],
      providers: [fromServices.services]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListItemComponent);
    component = fixture.componentInstance;
    component.location = sampleStore;
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
    if (openTime != null) {
      expect(openTime.getHours()).toEqual(9);
    }
  });
});
