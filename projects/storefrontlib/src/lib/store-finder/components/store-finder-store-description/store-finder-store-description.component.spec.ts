import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';
import { ScheduleComponent } from '../schedule-component/schedule.component';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { StoreFinderService, StoreDataService } from '../../services';

import * as fromReducers from '../../store';

const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';

const mockActivatedRoute = {
  snapshot: {
    params: {}
  }
};

class StoreDataServiceMock {}

class StoreFinderServiceMock {
  findStores() {}
  viewAllStoresForCountry() {}
  viewAllStoresForRegion() {}
}

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;
  let storeFinderService: StoreFinderService;

  it('should call storeFinderService with country', () => {
    mockActivatedRoute.snapshot.params = {
      country: countryIsoCode
    };
    configureTestBed();
    spyOn(storeFinderService, 'viewAllStoresForCountry');

    createComponent();

    expect(component).toBeTruthy();
    expect(storeFinderService.viewAllStoresForCountry).toHaveBeenCalledWith(
      countryIsoCode
    );
  });

  it('should call storeFinderService with country and region', () => {
    mockActivatedRoute.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode
    };
    configureTestBed();
    spyOn(storeFinderService, 'viewAllStoresForRegion');

    createComponent();

    expect(component).toBeTruthy();
    expect(storeFinderService.viewAllStoresForRegion).toHaveBeenCalledWith(
      countryIsoCode,
      regionIsoCode
    );
  });

  function configureTestBed() {
    const bed = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.reducers)
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        ScheduleComponent,
        StoreFinderMapComponent
      ],
      providers: [
        StoreDataService,
        { provide: StoreDataService, useClass: StoreDataServiceMock },
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });
    bed.compileComponents();
    storeFinderService = bed.get(StoreFinderService);
  }

  function createComponent() {
    fixture = TestBed.createComponent(StoreFinderStoreDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
