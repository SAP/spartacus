import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StoreFinderListComponent } from './store-finder-list.component';
import { PaginationComponent } from '../../../ui/components/pagination-and-sorting/pagination/pagination.component';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import * as fromServices from '../../services';
import { StoreFinderMapComponent } from '../store-finder-map/store-finder-map.component';
import { OccModuleConfig } from '../../../occ';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';
import { StoreDataService } from '../../services';
import { GoogleMapRendererService } from '../../services/google-map-renderer.service';

const location = {};
const stores = [location];
const locations = { stores: stores };

class StoreDataServiceMock {
  getStoreLatitude(_location: any): number {
    return 35.528984;
  }

  getStoreLongitude(_location: any): number {
    return 139.700168;
  }
}

class GoogleMapRendererServiceMock {
  centerMap(_latitute: number, _longitude: number) {}
  renderMap(
    mapElement: HTMLElement,
    _locations: any[],
    selectMarkerHandler?: Function
  ) {}
}

describe('StoreFinderListComponent', () => {
  let component: StoreFinderListComponent;
  let fixture: ComponentFixture<StoreFinderListComponent>;
  let store: Store<fromReducers.StoresState>;
  let storeMapComponent: StoreFinderMapComponent;
  let storeDataService: StoreDataService;
  let googleMapRendererService: GoogleMapRendererService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoreFinderListComponent, StoreFinderMapComponent],
      providers: [
        ...fromServices.services,
        {
          provide: GoogleMapRendererService,
          useClass: GoogleMapRendererServiceMock
        },
        { provide: StoreDataService, useClass: StoreDataServiceMock },
        OccE2eConfigurationService,
        OccModuleConfig
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    storeDataService = TestBed.get(StoreDataService);
    googleMapRendererService = TestBed.get(GoogleMapRendererService);

    spyOn(store, 'dispatch');
    spyOn(storeDataService, 'getStoreLatitude');
    spyOn(storeDataService, 'getStoreLongitude');
    spyOn(googleMapRendererService, 'centerMap');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change pages', done => {
    const pagination = new PaginationComponent();
    pagination.viewPageEvent.subscribe(event => {
      expect(event).toEqual(3);
      component.viewPage(event);
      expect(store.dispatch).toHaveBeenCalled();
      expect(component.searchConfig.currentPage).toBe(event);
      done();
    });
    pagination.pageChange(4);
  });

  it('should center store on map', () => {
    // given
    component.locations = locations;
    fixture.detectChanges();
    storeMapComponent = fixture.debugElement.query(By.css('y-store-finder-map'))
      .componentInstance;
    spyOn(storeMapComponent, 'centerMap').and.callThrough();

    // when
    component.centerStoreOnMapByIndex(0);

    // then
    expect(storeMapComponent.centerMap).toHaveBeenCalled();
    expect(storeDataService.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataService.getStoreLongitude).toHaveBeenCalled();
    expect(googleMapRendererService.centerMap).toHaveBeenCalled();
  });
});
