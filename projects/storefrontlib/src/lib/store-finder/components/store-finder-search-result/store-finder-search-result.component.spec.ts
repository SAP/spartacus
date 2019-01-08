import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreFinderSearchResultComponent } from './store-finder-search-result.component';

import {
  getStoreFinderReducers,
  StoreFinderService,
  StoresState
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

class ActivatedRouteMock {
  paramsSubscriptionHandler: Function;

  queryParams = {
    subscribe: (observer: Function) => {
      this.paramsSubscriptionHandler = observer;
    }
  };
}

const mockStoreFinderService = {
  findStores: jasmine.createSpy(),
  getStoresLoading: jasmine.createSpy(),
  getFindStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  findStoresAction: jasmine.createSpy().and.returnValue(of({}))
};

describe('StoreFinderListComponent', () => {
  let component: StoreFinderSearchResultComponent;
  let fixture: ComponentFixture<StoreFinderSearchResultComponent>;
  let store: Store<StoresState>;
  let storeFinderService: StoreFinderService;
  let activatedRoute: ActivatedRouteMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', getStoreFinderReducers)
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoreFinderSearchResultComponent],
      providers: [
        { provide: StoreFinderService, useValue: mockStoreFinderService },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        Store
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchResultComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    storeFinderService = TestBed.get(StoreFinderService);
    activatedRoute = TestBed.get(ActivatedRoute);

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find stores with query text', () => {
    // given component is called with quuery-text params
    const queryText = 'query-text';
    activatedRoute.paramsSubscriptionHandler({ query: queryText });

    // then verify storefinder
    expect(storeFinderService.findStores).toHaveBeenCalledWith(
      queryText,
      false
    );
  });

  it('should find stores with my geolocation', () => {
    // given component is called with quuery-text params
    activatedRoute.paramsSubscriptionHandler({
      useMyLocation: 'true'
    });

    // then verify storefinder
    expect(storeFinderService.findStores).toHaveBeenCalledWith('', true);
  });

  it('should change pages', () => {
    // given
    const pageNumber = 4;
    component.searchQuery = {
      queryText: '',
      useMyLocation: true
    };

    component.geolocation = {
      longitude: 0,
      latitude: 0
    };

    // when
    component.viewPage(pageNumber);

    // then
    expect(storeFinderService.findStoresAction).toHaveBeenCalledWith(
      '',
      { longitude: 0, latitude: 0 },
      { currentPage: pageNumber }
    );
  });
});
