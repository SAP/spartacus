import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { combineReducers, StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderListItemComponent } from '../store-finder-list/store-finder-list-item/store-finder-list-item.component';

import { StoreFinderService } from '../../services/store-finder.service';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import { services } from '../../services';

class StoreFinderServiceMock {
  viewAllStoresForCountry(countryIsoCode: string) {}
  viewAllStoresForRegion(countryIsoCode: string, regionIsoCode: string) {}
}

const countryIsoCode: string = 'CA';
const regionIsoCode: string = 'CA-QC';

const location = {
  name: 'testName'
};

const mockActivatedRoute = {
  snapshot: {
    params: {
      country: countryIsoCode,
      region: regionIsoCode
    }
  }
};

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderServiceMock: StoreFinderServiceMock;
  let store: Store<fromReducers.StoresState>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    const bed = TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        }),
        RouterTestingModule
      ],
      declarations: [StoreFinderGridComponent, StoreFinderListItemComponent],
      providers: [
        ...services,
        StoreFinderServiceMock,
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    });
    bed.compileComponents();

    this.storeFinderServiceMock = bed.get(StoreFinderService);
    this.store = bed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call storeFinderService with country', () => {
    spyOn(
      this.storeFinderServiceMock,
      'viewAllStoresForCountry'
    ).and.callThrough();

    component.viewAllStoresForCountry(countryIsoCode);
    expect(
      this.storeFinderServiceMock.viewAllStoresForCountry
    ).toHaveBeenCalledWith(countryIsoCode);
  });

  it('should call storeFinderService with country and region', () => {
    spyOn(
      this.storeFinderServiceMock,
      'viewAllStoresForRegion'
    ).and.callThrough();

    component.viewAllStoresForRegion(countryIsoCode, regionIsoCode);
    expect(
      this.storeFinderServiceMock.viewAllStoresForRegion
    ).toHaveBeenCalledWith(countryIsoCode, regionIsoCode);
  });

  it('should route when viewStore is called', () => {
    component.viewStore(location);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'store-finder',
      'country',
      mockActivatedRoute.snapshot.params.country,
      'region',
      mockActivatedRoute.snapshot.params.region,
      location.name
    ]);
  });
});
