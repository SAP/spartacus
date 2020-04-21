import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  I18nTestingModule,
  StoreDataService,
  RoutingService,
} from '@spartacus/core';
import { StoreFinderListItemComponent } from './store-finder-list-item.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

const weekday = {
  closingTime: {
    formattedHour: '20:00',
    hour: 8,
    minute: 0,
  },
  openingTime: {
    formattedHour: '09:00',
    hour: 9,
    minute: 0,
  },
  closed: false,
};

const name = 'Tokyu Hotel';
const displayName = 'Tokio Cerulean Tower Tokyu Hotel';

const sampleStore: any = {
  name,
  displayName,
  address: {
    country: { isocode: 'JP' },
    line1: 'Sakuragaokacho Shibuya',
    line2: '26-01',
    phone: '+81 5141 3298',
    postalCode: '150-8512',
    town: 'Tokio',
  },
  geoPoint: {
    latitude: 35.656347,
    longitude: 139.69956,
  },
  openingHours: {
    weekDayOpeningList: [
      {
        ...weekday,
        weekDay: 'Mon',
      },
      {
        ...weekday,
        weekDay: 'Tue',
      },
      {
        ...weekday,
        weekDay: 'Wed',
      },
      {
        ...weekday,
        weekDay: 'Thu',
      },
      {
        ...weekday,
        weekDay: 'Fri',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '10:00',
          hour: 10,
          minute: 0,
        },
        closed: false,
        weekDay: 'Sat',
      },
      {
        closed: true,
        weekDay: 'Sun',
      },
    ],
  },
};

const mockRoutingService = {
  go: jasmine.createSpy('go'),
};

describe('StoreFinderListItemComponent', () => {
  let component: StoreFinderListItemComponent;
  let fixture: ComponentFixture<StoreFinderListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        I18nTestingModule,
        RouterTestingModule,
      ],
      declarations: [StoreFinderListItemComponent],
      providers: [
        StoreDataService,
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListItemComponent);
    component = fixture.componentInstance;
    component.location = sampleStore;
    component.locationIndex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit item index', () => {
    spyOn(component.storeItemClick, 'emit');
    component.handleStoreItemClick();
    fixture.detectChanges();
    expect(component.storeItemClick.emit).toHaveBeenCalledWith(1);
  });

  it('should prepare proper link', () => {
    fixture.detectChanges();
    const encodedName = name.replace(' ', '%20');
    const link = fixture.debugElement
      .queryAll(By.css('.cx-store-name > a'))
      .find((el) => el.nativeElement.innerText === displayName).nativeElement;
    expect(link.getAttribute('href')).toEqual(`/${encodedName})}`);
    expect(link.getAttribute('ng-reflect-router-link')).toEqual(name);
  });
});
