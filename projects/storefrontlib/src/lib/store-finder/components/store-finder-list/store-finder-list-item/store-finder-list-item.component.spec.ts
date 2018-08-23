import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderListItemComponent } from './store-finder-list-item.component';
import { StoreFinderListComponent } from '../store-finder-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';
import * as fromServices from './../../../services';
// import { StoreDataService, StoreFinderService } from '../../../services';
import { StoreFinderPagingComponent } from '../../store-finder-paging/store-finder-paging.component';
import { StoreFinderSearchComponent } from '../../store-finder-search/store-finder-search.component';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../../store/reducers';
import * as fromRoot from '../../../../routing/store';

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
        MaterialModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      declarations: [
        StoreFinderListItemComponent,
        StoreFinderListComponent,
        StoreFinderPagingComponent,
        StoreFinderSearchComponent
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
    expect(component.getClosingTime(sampleStore).getHours()).toEqual(20);
  });

  it('should get opening time', () => {
    expect(component.getOpeningTime(sampleStore).getHours()).toEqual(9);
  });
});
