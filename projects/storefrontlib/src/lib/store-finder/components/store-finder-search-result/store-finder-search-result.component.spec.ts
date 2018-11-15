import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreFinderService } from '../../services';
import { StoreFinderSearchResultComponent } from './store-finder-search-result.component';

import * as fromReducers from '../../store';

class ActivatedRouteMock {
  paramsSubscriptionHandler: Function;

  queryParams = {
    subscribe: (observer: Function) => {
      this.paramsSubscriptionHandler = observer;
    }
  };
}

class StoreFinderServiceMock {
  findStores() {}
}

describe('StoreFinderListComponent', () => {
  let component: StoreFinderSearchResultComponent;
  let fixture: ComponentFixture<StoreFinderSearchResultComponent>;
  let store: Store<fromReducers.StoresState>;
  let storeFinderService: StoreFinderService;
  let activatedRoute: ActivatedRouteMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.reducers)
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoreFinderSearchResultComponent],
      providers: [
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
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
    spyOn(storeFinderService, 'findStores');

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
      undefined
    );
  });

  it('should find stores with geodata', () => {
    // given component is called with quuery-text params
    const latitude = 10.1;
    const longitude = 21.8;
    activatedRoute.paramsSubscriptionHandler({
      latitude: latitude,
      longitude: longitude
    });

    // then verify storefinder
    expect(storeFinderService.findStores).toHaveBeenCalledWith('', {
      latitude: latitude,
      longitude: longitude
    });
  });

  it('should change pages', () => {
    // given
    const pageNumber = 4;
    component.searchQuery = {
      queryText: '',
      longitudeLatitude: { longitude: 0, latitude: 0 }
    };

    // when
    component.viewPage(pageNumber);

    // then
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromReducers.FindStores({
        queryText: '',
        longitudeLatitude: { longitude: 0, latitude: 0 },
        searchConfig: { currentPage: pageNumber }
      })
    );
  });
});
