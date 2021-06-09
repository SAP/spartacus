import { NO_ERRORS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { StoreFinderSearchResultComponent } from './store-finder-search-result.component';
import {
  StoreFinderConfig,
  StoreFinderService,
} from '@spartacus/storefinder/core';

class ActivatedRouteMock {
  paramsSubscriptionHandler: Function;

  queryParams = {
    subscribe: (observer: Function) => {
      this.paramsSubscriptionHandler = observer;
    },
  };
}
const queryText = 'query-text';

const mockStoreFinderService = {
  getStoresLoading: jasmine.createSpy(),
  getFindStoresEntities: jasmine.createSpy().and.returnValue(of(Observable)),
  findStoresAction: jasmine.createSpy().and.returnValue(of({})),
};

const mockStoreFinderConfig = {
  googleMaps: {
    radius: 50000,
  },
};

describe('StoreFinderListComponent', () => {
  let component: StoreFinderSearchResultComponent;
  let fixture: ComponentFixture<StoreFinderSearchResultComponent>;
  let storeFinderService: StoreFinderService;
  let activatedRoute: ActivatedRoute | ActivatedRouteMock;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [StoreFinderSearchResultComponent],
        providers: [
          { provide: StoreFinderService, useValue: mockStoreFinderService },
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: StoreFinderConfig, useValue: mockStoreFinderConfig },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchResultComponent);
    component = fixture.componentInstance;
    storeFinderService = TestBed.inject(StoreFinderService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find stores with query text', () => {
    (activatedRoute as ActivatedRouteMock).paramsSubscriptionHandler({
      query: queryText,
    });

    // then verify storefinder
    expect(storeFinderService.findStoresAction).toHaveBeenCalled();
  });

  it('should find stores with my geolocation', () => {
    // given component is called with quuery-text params
    (activatedRoute as ActivatedRouteMock).paramsSubscriptionHandler({
      useMyLocation: 'true',
    });

    // then verify storefinder
    expect(storeFinderService.findStoresAction).toHaveBeenCalled();
  });

  it('should change pages', () => {
    // given
    const pageNumber = 4;
    component.searchQuery = {
      queryText: '',
      useMyLocation: true,
    };

    component.geolocation = {
      longitude: 0,
      latitude: 0,
    };

    // when
    component.viewPage(pageNumber);

    // then
    expect(storeFinderService.findStoresAction).toHaveBeenCalledWith(
      '',
      { currentPage: pageNumber },
      { longitude: 0, latitude: 0 },
      null,
      undefined,
      undefined
    );
  });
});
