import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule } from '@ngrx/store';

import { StoreFinderGridComponent } from './store-finder-grid.component';
import { StoreFinderListItemComponent } from '../store-finder-list/store-finder-list-item/store-finder-list-item.component';
import { StoreFinderService } from '../../services/store-finder.service';
import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';
import { services } from '../../services';

const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';

class StoreFinderServiceMock {
  viewAllStoresForCountry(countryIso: string) {}
  viewAllStoresForRegion(countryIso: string, regionIso: string) {}
}

const location = {
  name: 'testName'
};

const mockActivatedRoute = {
  snapshot: {
    params: {}
  }
};

describe('StoreFinderGridComponent', () => {
  let component: StoreFinderGridComponent;
  let fixture: ComponentFixture<StoreFinderGridComponent>;
  let storeFinderServiceMock: StoreFinderServiceMock;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  it('should create with country routing parameter', () => {
    mockActivatedRoute.snapshot.params = { country: countryIsoCode };
    configureTestBed();
    spyOn(storeFinderServiceMock, 'viewAllStoresForCountry').and.stub();

    createComponent();

    expect(component).toBeTruthy();
    expect(storeFinderServiceMock.viewAllStoresForCountry).toHaveBeenCalledWith(
      countryIsoCode
    );
  });

  it('should create with country and region routing parameters', () => {
    mockActivatedRoute.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode
    };
    configureTestBed();
    spyOn(storeFinderServiceMock, 'viewAllStoresForRegion').and.callThrough();

    createComponent();

    expect(component).toBeTruthy();
    expect(storeFinderServiceMock.viewAllStoresForRegion).toHaveBeenCalledWith(
      countryIsoCode,
      regionIsoCode
    );
  });

  it('should route when viewStore is called', () => {
    mockActivatedRoute.snapshot.params = {
      country: countryIsoCode,
      region: regionIsoCode
    };
    configureTestBed();
    createComponent();

    component.viewStore(location);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      'store-finder',
      'country',
      countryIsoCode,
      'region',
      regionIsoCode,
      location.name
    ]);
  });

  function configureTestBed(): void {
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
        { provide: StoreFinderServiceMock },
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    });
    bed.compileComponents();

    storeFinderServiceMock = bed.get(StoreFinderService);
  }

  function createComponent() {
    fixture = TestBed.createComponent(StoreFinderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
